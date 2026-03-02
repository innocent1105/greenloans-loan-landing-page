<?php
header('Content-Type: application/json');
require_once 'connection.php';

$app_id = $_GET['id'] ?? null;

if (!$app_id) {
    echo json_encode(['success' => false, 'message' => 'ID required']);
    exit;
}

try {
    $result = [];

    // 1. Get Application + User + Business + Loan Type
    $stmt = $pdo->prepare("
        SELECT a.*, u.fullname, u.phone_number, u.email, u.avatar, u.public_id as user_public_id,
               up.nrc_number, up.nrc_image_front, up.nrc_image_back, up.next_of_kin_name, up.next_of_kin_contact,
               bp.business_name, bp.business_location, bp.business_description,
               lt.name as loan_product, lt.interest_rate as annual_rate
        FROM loan_applications a
        JOIN users u ON a.user_id = u.public_id
        LEFT JOIN user_profiles up ON u.public_id = up.user_id
        LEFT JOIN business_profiles bp ON u.public_id = bp.user_id
        LEFT JOIN loan_types lt ON a.loan_type_id = lt.loan_type_id
        WHERE a.loan_application_id = ?
    ");
    $stmt->execute([$app_id]);
    $result['details'] = $stmt->fetch(PDO::FETCH_ASSOC);

    $user_id = $result['details']['user_id'];

    // 2. Get User Wallet Balances
    $stmtW = $pdo->prepare("SELECT wallet_type, balance, currency FROM wallets WHERE user_id = ?");
    $stmtW->execute([$user_id]);
    $result['wallets'] = $stmtW->fetchAll(PDO::FETCH_ASSOC);

    // 3. Get Loan History (Previous Loans)
    $stmtH = $pdo->prepare("SELECT * FROM loans WHERE user_id = ? AND loan_application_id != ?");
    $stmtH->execute([$user_id, $app_id]);
    $result['history'] = $stmtH->fetchAll(PDO::FETCH_ASSOC);

    // 4. Get Recent Transactions
    $stmtT = $pdo->prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5");
    $stmtT->execute([$user_id]);
    $result['transactions'] = $stmtT->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $result]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}