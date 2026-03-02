<?php
header('Content-Type: application/json');
require_once 'connection.php';

// 1. INPUT HANDLING
$input = json_decode(file_get_contents("php://input"), true);
$loan_app_id =  $input['loan_id']; // Replace with $input['loan_id'] for production
$user_token  = $input['user_token']; // Replace with $input['user_token'] for production

if (!$loan_app_id || !$user_token) {
    echo json_encode(['status' => 'error', 'message' => 'Missing identifiers']);
    exit;
}

try {
    // QUERY 1: VERIFY USER
    $stmtUser = $pdo->prepare("SELECT * FROM users WHERE public_id = ? LIMIT 1");
    $stmtUser->execute([$user_token]);
    $userRow = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if (!$userRow) {
        throw new Exception("Security Error: User session invalid.");
    }

    // QUERY 2: FETCH LOAN RECORD
    $stmtLoan = $pdo->prepare("SELECT * FROM loans WHERE loan_application_id = ? AND user_id = ? LIMIT 1");
    $stmtLoan->execute([$loan_app_id, $user_token]);
    $loanRow = $stmtLoan->fetch(PDO::FETCH_ASSOC);

    if (!$loanRow) {
        throw new Exception("Record Error: Loan ID not found for this user.");
    }

    // QUERY 3: FETCH LOAN TYPE (Rules & Rates)
    $stmtType = $pdo->prepare("SELECT name, late_fee_rate FROM loan_types WHERE loan_type_id = ? LIMIT 1");
    $stmtType->execute([$loanRow['loan_type_id']]);
    $typeRow = $stmtType->fetch(PDO::FETCH_ASSOC);

    // QUERY 4: FETCH WALLET BALANCE
    $stmtWallet = $pdo->prepare("SELECT balance, currency FROM wallets WHERE user_id = ? LIMIT 1");
    $stmtWallet->execute([$user_token]);
    $walletRow = $stmtWallet->fetch(PDO::FETCH_ASSOC);

    // ---------------------------------------------------------
    // POST-FETCH CALCULATIONS (Logic based on your payment script)
    // ---------------------------------------------------------
    $now = time();
    $dueTimestamp = strtotime($loanRow['due_date']);
    $daysOverdue = 0;
    $penaltyAmount = 0.00;

    if ($dueTimestamp < $now && $loanRow['status'] === 'active') {
        $daysOverdue = (int) ceil(($now - $dueTimestamp) / 86400);
        
        // Apply penalty after 5-day grace period (as per your rules)
        if ($daysOverdue > 5) {
            $penaltyAmount = $daysOverdue * (float)($typeRow['late_fee_rate'] ?? 0);
        }
    }

    $outstanding = (float)$loanRow['outstanding_balance'];
    $totalPayable = $outstanding + $penaltyAmount;

    // ---------------------------------------------------------
    // FINAL DATA AGGREGATION
    // ---------------------------------------------------------
    echo json_encode([
        'status' => 'success',
        'data' => [
            'user' => [
                'name' => $userRow['full_name'] ?? 'User',
                'token' => $userRow['public_id']
            ],
            'loan' => [
                'id' => '' . $loanRow['loan_id'],
                'type_name' => $typeRow['name'] ?? 'Loan',
                'status' => $loanRow['status'],
                'principal' => (float)$loanRow['principal_amount'],
                'outstanding' => $outstanding,
                'penalty' => $penaltyAmount,
                'total_due' => $totalPayable,
                'due_date' => date("d M, Y", $dueTimestamp),
                'days_late' => $daysOverdue
            ],
            'wallet' => [
                'balance' => (float)($walletRow['balance'] ?? 0),
                'currency' => $walletRow['currency'] ?? 'ZMW'
            ],
            'meta' => [
                'can_extend' => ($daysOverdue > 7), // Eligibility for extension
                'is_overdue' => ($daysOverdue > 0)
            ]
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}