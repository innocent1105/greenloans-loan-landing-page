<?php
header('Content-Type: application/json');
require_once 'connection.php';

// $input = json_decode(file_get_contents("php://input"), true);

// $user_token = stripslashes($input['user_token']);
$user_token = "innocent6987222d3fb20";
$loan_reference_id = "GL_69a165adacb25";
$system_id = "greenloans.co6987933973fef";
$system_balance = 1000.00;
// CREATE TRANSACTION RECORD
$sender = "GreenLoans.co";
$senderWallet = "Greenloans";







$check_user = $pdo->prepare("SELECT user_id FROM users WHERE public_id = ?");
$check_user->execute([$user_token]);

if($check_user->rowCount() == 0){
    echo json_encode(['status' => 'error-23', 'message' => 'Invalid user token.']);
    exit;
}


$pdo->beginTransaction();

$check_loan = $pdo->prepare("SELECT * FROM loan_applications WHERE user_id = ? AND reference_id = ?");
$check_loan->execute([$user_token, $loan_reference_id]);

if($check_loan->rowCount() == 0){
    echo json_encode(['status' => 'error-24', 'message' => 'Invalid loan.']);
    exit;
}

$check_loan = $check_loan->fetch(PDO::FETCH_ASSOC);

if($check_loan['status'] != 'pending'){
    echo json_encode(['status' => 'error-27', 'message' => 'This loan application has already been processed.']);
    exit;
}




$loan_type = $check_loan['loan_type_id'];
$check_loan_type = $pdo->prepare("SELECT * FROM loan_types WHERE loan_type_id = ?");
$check_loan_type->execute([$loan_type]);

if($check_loan_type->rowCount() == 0){
    echo json_encode(['status' => 'error-24', 'message' => 'Invalid loan type selected.']);
    exit;
}
$check_loan_type = $check_loan_type->fetch(PDO::FETCH_ASSOC);

$check_user_profile = $pdo->prepare("SELECT * FROM user_profiles WHERE user_id = ? LIMIT 1");
$check_user_profile->execute([$user_token]);

$profile = $check_user_profile->fetch(PDO::FETCH_ASSOC);

if ($profile['status'] !== 'approved') {
    echo json_encode([
        'status' => 'error-30', 
        'message' => 'Your profile details are still ' . $profile['status'] . '. Please wait for approval before applying.'
    ]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT * FROM wallets 
    WHERE user_id = ? AND status = 'active'
    LIMIT 1
    FOR UPDATE
");
$stmt->execute([$user_token]);
$userWallet = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$userWallet) {
    echo json_encode(['status' => 'error-25', 'message' => 'User wallet not found.']);
    exit;
}

$account_balance = $userWallet['balance'];




$amount =  $check_loan['requested_amount'];
$reference = 'GLTX_' . uniqid();




$stmt = $pdo->prepare("
    SELECT * FROM transactions 
    WHERE user_id = ?
");
$stmt->execute([$user_token]);
$transactions = $stmt->fetch(PDO::FETCH_ASSOC);


$stmt = $pdo->prepare("
    SELECT * FROM loans 
    WHERE loan_application_id = ?
");
$stmt->execute([$loan_reference_id]);
$user_loans = $stmt->fetch(PDO::FETCH_ASSOC);

if(is_array($user_loans)){
    if(count($user_loans) !== 0){
        echo json_encode(['status' => 'error-32', 'message' => 'Loan already exists.']);
        exit;
    }
}

$tenure_days = 1 * $check_loan_type['tenure_days'];
$end_date = date('Y-m-d H:i:s', strtotime("+$tenure_days days"));
$total_to_pay = round($check_loan['requested_amount'] * (1 + $check_loan_type['interest_rate'] / 100), 2);

$stmt = $pdo->prepare("
    INSERT INTO loans (
        loan_application_id, user_id, loan_type_id, 
        principal_amount, interest_rate, total_payable, 
        status, outstanding_balance, start_date, due_date
    )
    VALUES (?, ?, ?, ?, ?, ?, 'active', ?, NOW(), ?)
");




$stmt->execute([
    $loan_reference_id,
    $user_token,
    $loan_type,
    $check_loan['requested_amount'],
    $check_loan_type['interest_rate'],
    $total_to_pay,        
    $total_to_pay,   
    $end_date         
]);


$stmt = $pdo->prepare("
    INSERT INTO transactions 
    (user_id, wallet_id, t_type, sender_id, receiver_id, amount, status, reference)
    VALUES (?, ?, 'transfer', ?, ?, ?, 'pending', ?)
");
$stmt->execute([
    $user_token,
    $system_id,
    $system_id,
    $user_token,
    $amount,
    $reference
]);

$transactionId = $pdo->lastInsertId();





// 7️⃣ LEDGER — SENDER DEBIT
$stmt = $pdo->prepare("
    INSERT INTO ledger_entries
    (transaction_id, wallet_id, entry_type, amount, balance_before, balance_after, description)
    VALUES (?, ?, 'debit', ?, ?, ?, ?)
");
$stmt->execute([
    $transactionId,
    $system_id,
    $amount,
    $system_balance,
    $system_balance - $amount,
    'Loan disbursement debit'
]);

// 8️⃣ LEDGER — RECEIVER CREDIT
$stmt->execute([
    $transactionId,
    $user_token,
    $amount,
    $account_balance,
    $account_balance + $amount,
    'Loan disbursement debit'
]);



$stmt = $pdo->prepare("UPDATE wallets SET balance = ? WHERE user_id = ?");
$stmt->execute([
    $account_balance + $amount,
    $user_token
]);

$stmt = $pdo->prepare("UPDATE transactions SET status = 'successful' WHERE t_id = ?");
$stmt->execute([$transactionId]);

$stmt = $pdo->prepare("UPDATE loan_applications SET status = 'approved' WHERE reference_id = ?");
$stmt->execute([$check_loan['reference_id']]);





























$pdo->commit();





























