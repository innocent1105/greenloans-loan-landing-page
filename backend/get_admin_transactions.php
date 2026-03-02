<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'connection.php';

try {
    $sql = "SELECT 
                t.*, 
                u.email, 
                u.fullname,
                w.balance as current_balance,
                up.status as kyc_status
            FROM transactions t
            LEFT JOIN users u ON t.user_id = u.public_id
            LEFT JOIN wallets w ON t.user_id = w.user_id
            LEFT JOIN user_profiles up ON t.user_id = up.user_id
            ORDER BY t.created_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $data]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>