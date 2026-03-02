<?php
header('Content-Type: application/json');
require_once 'connection.php';

$input = json_decode(file_get_contents("php://input"), true);

$loan_id     = $input['loan_id'] ?? null;
$user_token  = $input['user_token'] ?? null;
$password    = $input['password'] ?? null;
$amount_paid = round((float)($input['amount_paid'] ?? 0), 2);

if (!$loan_id || !$user_token || !$password || $amount_paid <= 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

try {
    $pdo->beginTransaction();

    /* ================= USER AUTH ================= */
    $stmt = $pdo->prepare("SELECT * FROM users WHERE public_id = ? LIMIT 1");
    $stmt->execute([$user_token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        throw new Exception('Authentication failed');
    }

    /* ================= WALLET (LOCKED) ================= */
    $stmt = $pdo->prepare("
        SELECT * FROM wallets
        WHERE user_id = ? AND wallet_type = 'main' AND status = 'active'
        FOR UPDATE
    ");
    $stmt->execute([$user_token]);
    $wallet = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$wallet) throw new Exception('Wallet not found');
    if ((float)$wallet['balance'] < $amount_paid) throw new Exception('Insufficient balance');

    /* ================= LOAN + TYPE ================= */
    $stmt = $pdo->prepare("
        SELECT l.*, lt.grace_period_days, lt.late_fee_rate
        FROM loans l
        JOIN loan_types lt ON lt.loan_type_id = l.loan_type_id
        WHERE l.loan_id = ? AND l.user_id = ? AND l.status = 'active'
        LIMIT 1
    ");
    $stmt->execute([$loan_id, $user_token]);
    $loan = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$loan) throw new Exception('Loan not found or not active');

    /* ================= PENALTY CALCULATION ================= */
    $now        = time();
    $dueTs      = strtotime($loan['due_date']);
    $daysLate   = max(0, ceil(($now - $dueTs) / 86400));
    $graceDays  = (int)$loan['grace_period_days'];
    $penalty    = 0.00;

    if ($daysLate > $graceDays) {
        $penaltyDays = $daysLate - $graceDays;
        $rate = (float)$loan['late_fee_rate'];
        $penalty = round($penaltyDays * $rate, 2);

        if ($penalty > 0) {
            $pdo->prepare("
                INSERT INTO loan_penalties (loan_id, amount)
                VALUES (?, ?)
            ")->execute([$loan_id, $penalty]);
        }
    }

    /* ================= BALANCE CALC ================= */
    $currentOutstanding = (float)$loan['outstanding_balance'];
    $totalDueNow        = round($currentOutstanding + $penalty, 2);

    if ($amount_paid > $totalDueNow + 0.01) {
        throw new Exception('Overpayment not allowed');
    }

    $newOutstanding = round($totalDueNow - $amount_paid, 2);
    $newStatus      = ($newOutstanding <= 0.01) ? 'completed' : 'active';

    /* ================= DUE DATE EXTENSION ================= */
    $newDueDate = $loan['due_date'];

    if ($daysLate > 0 && $newOutstanding > 0) {
        $extensionDays = 7; // business rule
        $baseTs = max($dueTs, $now);
        $newDueDate = date('Y-m-d', strtotime("+{$extensionDays} days", $baseTs));
    }

    /* ================= WALLET UPDATE ================= */
    $beforeBal = (float)$wallet['balance'];
    $afterBal  = round($beforeBal - $amount_paid, 2);

    $pdo->prepare("
        UPDATE wallets SET balance = ?
        WHERE wallet_id = ?
    ")->execute([$afterBal, $wallet['wallet_id']]);

    /* ================= TRANSACTION ================= */
    $reference = 'PAY-' . bin2hex(random_bytes(8));

    $system_id = "greenloans.co6987933973fef"; // Example system ID for internal transactions
    $pdo->prepare("
        INSERT INTO transactions (user_id, wallet_id,sender_id, receiver_id, t_type, amount, status, reference)
        VALUES (?, ?, ?, ?, 'transfer', ?, 'successful', ?)
    ")->execute([$user_token, $wallet['wallet_id'], $user_token, $system_id , $amount_paid, $reference]);


    if($newOutstanding < 100){
        $pdo->prepare("UPDATE loans SET status = 'completed' WHERE loan_id = ?")->execute([$loan_id]);
        $pdo->prepare("UPDATE loan_applications SET status = 'completed' WHERE reference_id = ?")->execute([$loan['loan_application_id']]);
    }


    $transactionId = $pdo->lastInsertId();

    /* ================= LEDGER ================= */
    $pdo->prepare("
        INSERT INTO ledger_entries
        (transaction_id, wallet_id, entry_type, amount, balance_before, balance_after, description)
        VALUES (?, ?, 'debit', ?, ?, ?, 'Loan repayment')
    ")->execute([
        $transactionId,
        $wallet['wallet_id'],
        $amount_paid,
        $beforeBal,
        $afterBal
    ]);

    /* ================= LOAN UPDATE ================= */
    $pdo->prepare("
        UPDATE loans
        SET outstanding_balance = ?, status = ?, due_date = ?
        WHERE loan_id = ?
    ")->execute([
        $newOutstanding,
        $newStatus,
        $newDueDate,
        $loan_id
    ]);

    /* ================= REPAYMENT RECORD ================= */
    $pdo->prepare("
        INSERT INTO loan_repayments
        (loan_id, user_id, amount, payment_method, transaction_id, status)
        VALUES (?, ?, ?, 'wallet', ?, 'successful')
    ")->execute([
        $loan_id,
        $user_token,
        $amount_paid,
        $transactionId
    ]);

    $pdo->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Repayment successful',
        'remaining_balance' => $newOutstanding,
        'new_due_date' => $newDueDate
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}