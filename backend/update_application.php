<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

require_once 'connection.php'; // Using your $pdo connection

// Handle pre-flight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

// Extract values from React axios call
$loan_id_from_react = $input['loan_application_id'] ?? null;
$new_status = $input['status'] ?? null;
$reason = $input['reason'] ?? "Admin action";

if (!$loan_id_from_react || !$new_status) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required data.']);
    exit;
}


// 1. Change 'WHERE id = ?' to 'WHERE reference_id = ?' (or your actual PK column)
$stmt = $pdo->prepare("SELECT user_id, reference_id, status, requested_amount, loan_type_id 
                       FROM loan_applications 
                       WHERE loan_application_id = ?"); // Use the correct column name here
$stmt->execute([$loan_id_from_react]);
$application = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$application) {
    echo json_encode(['status' => 'error', 'message' => 'Loan application not found.']);
    exit;
}

$user_token = $application['user_id'];
$loan_reference_id = $application['reference_id'];
$amount = $application['requested_amount'];
$loan_type = $application['loan_type_id'];

$system_id = "greenloans.co6987933973fef";

$system_qry = $pdo->prepare("SELECT balance FROM wallets WHERE user_id = ? LIMIT 1");
$system_qry->execute([$system_id]);
if($system_qry->rowCount() == 0){
    echo json_encode(['status' => 'error', 'message' => 'System wallet not found.']);
    exit;
}

$system_balance = $system_qry->fetch(PDO::FETCH_ASSOC)['balance'];






if ($new_status === 'approved') {

    try {
        $pdo->beginTransaction();

        $check_user_profile = $pdo->prepare("SELECT status FROM user_profiles WHERE user_id = ? LIMIT 1");
        $check_user_profile->execute([$user_token]);
        $profile = $check_user_profile->fetch(PDO::FETCH_ASSOC);

        if (!$profile || $profile['status'] !== 'approved') {
            throw new Exception("User profile is not approved. Current KYC status: " . ($profile['status'] ?? 'None'));
        }

        if ($application['status'] !== 'pending') {
            throw new Exception("This loan application has already been processed (Status: {$application['status']})");
        }

        $check_loan_type = $pdo->prepare("SELECT tenure_days, interest_rate FROM loan_types WHERE loan_type_id = ?");
        $check_loan_type->execute([$loan_type]);
        $type_details = $check_loan_type->fetch(PDO::FETCH_ASSOC);

        if (!$type_details) {
            throw new Exception("Invalid loan type configuration.");
        }

        $check_dup = $pdo->prepare("SELECT loan_id FROM loans WHERE loan_application_id = ?");
        $check_dup->execute([$loan_reference_id]);
        if ($check_dup->fetch()) {
            throw new Exception("A live loan for this reference already exists.");
        }

        $stmt = $pdo->prepare("SELECT wallet_id, balance FROM wallets WHERE user_id = ? AND status = 'active' LIMIT 1 FOR UPDATE");
        $stmt->execute([$user_token]);
        $userWallet = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$userWallet) {
            throw new Exception("Active user wallet not found.");
        }

        $account_balance = $userWallet['balance'];
        $reference = 'GLTX_' . strtoupper(uniqid());

        $tenure_days = (int)$type_details['tenure_days'];
        $end_date = date('Y-m-d H:i:s', strtotime("+$tenure_days days"));
        $total_to_pay = round($amount * (1 + $type_details['interest_rate'] / 100), 2);

        $stmt = $pdo->prepare("INSERT INTO loans (loan_application_id, user_id, loan_type_id, principal_amount, interest_rate, total_payable, status, outstanding_balance, start_date, due_date) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, NOW(), ?)");
        $stmt->execute([$loan_reference_id, $user_token, $loan_type, $amount, $type_details['interest_rate'], $total_to_pay, $total_to_pay, $end_date]);

        $stmt = $pdo->prepare("INSERT INTO transactions (user_id, wallet_id, t_type, sender_id, receiver_id, amount, status, reference) VALUES (?, ?, 'transfer', ?, ?, ?, 'pending', ?)");
        $stmt->execute([$user_token, $userWallet['wallet_id'], $system_id, $user_token, $amount, $reference]);
        $transactionId = $pdo->lastInsertId();

            $ledgerStmt = $pdo->prepare("INSERT INTO ledger_entries (transaction_id, wallet_id, entry_type, amount, balance_before, balance_after, description) VALUES (?, ?, ?, ?, ?, ?, ?)");

            $ledgerStmt->execute([
                $transactionId, 
                $system_id, 
                'debit', 
                $amount, 
                $system_balance, 
                $system_balance - $amount, 
                'Loan disbursement debit from system'
            ]);

            $ledgerStmt->execute([
                $transactionId, 
                $userWallet['wallet_id'], 
                'credit', 
                $amount, 
                $account_balance, 
                $account_balance + $amount, 
                'Loan disbursement credit to user'
            ]);
        $stmt = $pdo->prepare("UPDATE wallets SET balance = balance + ? WHERE user_id = ?");
        $stmt->execute([$amount, $user_token]);

        $stmt = $pdo->prepare("UPDATE transactions SET status = 'successful' WHERE t_id = ?");
        $stmt->execute([$transactionId]);

        $stmt = $pdo->prepare("UPDATE loan_applications SET status = 'approved', reason = ? WHERE loan_application_id = ?");
        $stmt->execute([$reason, $loan_id_from_react]);

        $pdo->commit();
        echo json_encode(['status' => 'success', 'message' => 'Loan approved and funds disbursed.']);

    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

} else {
    $stmt = $pdo->prepare("UPDATE loan_applications SET status = ?, reason = ? WHERE reference_id = ?");
    if ($stmt->execute([$new_status, $reason, $loan_id_from_react])) {
        echo json_encode(['status' => 'success', 'message' => 'Application status set to ' . $new_status]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update application.']);
    }
}
?>