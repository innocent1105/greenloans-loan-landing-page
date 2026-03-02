<?php
header('Content-Type: application/json');
require_once 'connection.php';

$user_token = $_GET['user_token'] ?? null;

if (!$user_token) {
    echo json_encode(['success' => false, 'message' => 'Missing user token']);
    exit;
}

try {
    /* ================= USER VALIDATION ================= */
    $stmt = $pdo->prepare("SELECT public_id FROM users WHERE public_id = ? LIMIT 1");
    $stmt->execute([$user_token]);
    if (!$stmt->fetch()) {
        throw new Exception('Invalid user');
    }

    $result = [];

    /* ================= FETCH LOAN APPLICATIONS ================= */
    $stmtApps = $pdo->prepare("
        SELECT *
        FROM loan_applications
        WHERE user_id = ?
        ORDER BY applied_at DESC
    ");
    $stmtApps->execute([$user_token]);
    $applications = $stmtApps->fetchAll(PDO::FETCH_ASSOC);

    foreach ($applications as $app) {

        /* ---------- loan type (NO JOIN) ---------- */
        $stmtType = $pdo->prepare("
            SELECT name
            FROM loan_types
            WHERE loan_type_id = ?
            LIMIT 1
        ");
        $stmtType->execute([$app['loan_type_id']]);
        $loanType = $stmtType->fetch(PDO::FETCH_ASSOC);

        /* ---------- loan record (NO JOIN) ---------- */
        $stmtLoan = $pdo->prepare("
            SELECT *
            FROM loans
            WHERE loan_application_id = ?
            LIMIT 1
        ");
        $stmtLoan->execute([$app['loan_application_id']]);
        $loan = $stmtLoan->fetch(PDO::FETCH_ASSOC);

        /* ---------- normalize response ---------- */
        $result[] = [
            'loan_application_id' => $app['loan_application_id'],
            'loan_id'             => $loan['loan_id'] ?? null,
            'loan_name'           => $loanType['name'] ?? 'Personal Loan',
            'status'              => $loan['status'] ?? $app['status'],
            'created_at'          => $loan['created_at'] ?? $app['applied_at'],
            'amount'              => $loan['principal_amount'] ?? $app['requested_amount'],
            'outstanding_balance' => $loan['outstanding_balance'] ?? null,
        ];
    }

    echo json_encode([
        'success' => true,
        'data'    => $result
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}