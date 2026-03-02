<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once "connection.php";

$input = json_decode(file_get_contents('php://input'), true);

$token        = $input['token'] ?? null;
$kinName      = $input['kinName'] ?? null;
$kinContact   = $input['kinContact'] ?? null;
$relationship = $input['relationship'] ?? null;

if (!$token || !$kinName || !$kinContact) {
    echo json_encode(['success' => false, 'message' => 'Please provide all contact details.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ? LIMIT 1");
    $stmt->execute([$token]);
    $profile = $stmt->fetch();

    if (!$profile) {
        echo json_encode(['success' => false, 'message' => 'Identity verification must be completed first.']);
        exit;
    }

    $fullNameWithRelation = $kinName . " (" . $relationship . ")";

    $sql = "UPDATE user_profiles SET 
            next_of_kin_name = ?, 
            next_of_kin_contact = ?, 
            ipaddress = ?,
            status = 'pending' 
            WHERE user_id = ?";

    $updateStmt = $pdo->prepare($sql);
    $updateStmt->execute([
        $fullNameWithRelation, 
        $kinContact, 
        $_SERVER['REMOTE_ADDR'], // Capture IP for security
        $token
    ]);

    echo json_encode([
        'success' => true, 
        'message' => 'Application submitted successfully for review.'
    ]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}