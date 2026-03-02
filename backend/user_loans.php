<?php
header('Content-Type: application/json');
require_once 'connection.php';

$input = json_decode(file_get_contents("php://input"), true);
$user_token = $input['user_token'] ?? null;

if (!$user_token) {
    echo json_encode(['status' => 'error', 'message' => 'User token is required']);
    exit;
}

try {
    $sql = "SELECT l.*, lt.name as loan_type_name, lt.late_fee_rate 
            FROM loans l 
            LEFT JOIN loan_types lt ON l.loan_type_id = lt.loan_type_id 
            WHERE l.user_id = ? 
            ORDER BY l.created_at DESC";
            
    $stmtLoans = $pdo->prepare($sql);
    $stmtLoans->execute([$user_token]);
    $loans = $stmtLoans->fetchAll(PDO::FETCH_ASSOC);

    $formattedLoans = [];
    $now = time();

    foreach ($loans as $row) {
        $due_timestamp = strtotime($row['due_date']);
        $outstanding = (float)$row['outstanding_balance'];
        $daily_rate = (float)($row['late_fee_rate'] ?? 0);
        
        $penalty = 0.00;
        $days_late = 0;
        $is_overdue = false;

        // 1. STATUS CHECK: If completed, bypass penalty logic
        if ($row['status'] === 'completed') {
            $ui_status = 'settled';
            $is_overdue = false;
            $days_late = 0;
            $penalty = 0.00;
            $outstanding = 0.00; // Force outstanding to zero for completed loans
        } else {
            // 2. ACTIVE LOAN LOGIC: Calculate penalties only if active
            $ui_status = $row['status'];
            
            if ($due_timestamp < $now) {
                $seconds_diff = $now - $due_timestamp;
                $days_late = (int) ceil($seconds_diff / 86400);
                
                // Only mark as overdue and apply penalty if strictly active
                $is_overdue = true;
                
                // Apply penalty after 7-day grace period
                if ($days_late > 7) {
                    $penalty = $days_late * $daily_rate;
                }
            }
        }

        $formattedLoans[] = [
            'loan_id' => $row['loan_application_id'],
            'title' => $row['loan_type_name'] ?? 'General Loan', 
            'principal' => (float)$row['principal_amount'],
            'outstanding_balance' => $outstanding + $penalty,
            'penalty_accumulated' => $penalty,
            'total_due_now' => $outstanding + $penalty,
            'total_payable' => (float)$row['total_payable'],
            'due_date' => date("d M Y", $due_timestamp),
            'status' => $ui_status,
            'is_overdue' => $is_overdue,
            'days_late' => $days_late
        ];
    }

    echo json_encode([
        'status' => 'success',
        'loans' => $formattedLoans
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}