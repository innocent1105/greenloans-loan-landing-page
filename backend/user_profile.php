<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once "connection.php";

$token = $_POST['token'] ?? null;
$nrc_number = $_POST['nrc_number'] ?? null;

if (!$token || !$nrc_number) {
    echo json_encode(['success' => false, 'message' => 'Missing token or NRC number']);
    exit;
}

$stmt = $pdo->prepare("SELECT user_id FROM users WHERE public_id = ? LIMIT 1");
$stmt->execute([$token]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User session invalid']);
    exit;
}

$realId = $user['user_id']; 
$uploadDir = 'uploads/nrc_docs/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileKeys = ['nrc_front', 'nrc_back'];
$uploadedPaths = [];

foreach ($fileKeys as $key) {
    if (!isset($_FILES[$key]) || $_FILES[$key]['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => "Identification image ($key) is required"]);
        exit;
    }

    $fileTmpPath = $_FILES[$key]['tmp_name'];
    $fileExtension = strtolower(pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION));
      
    $newFileName = "u_" . $realId . "_" . $key . "_" . time() . "." . $fileExtension;
    $destPath = $uploadDir . $newFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        $uploadedPaths[$key] = $destPath;
    } else {
        echo json_encode(['success' => false, 'message' => "Storage error for $key"]);
        exit;
    }
}

$public_id = uniqid('profile_', true);

try {
    $sql = "INSERT INTO user_profiles (public_id, user_id, nrc_number, nrc_image_front, nrc_image_back, status) 
            VALUES (?, ?, ?, ?, ?, 'pending')";
            
    $updateStmt = $pdo->prepare($sql);
    $updateStmt->execute([
        $public_id,
        $token,
        $nrc_number,
        $uploadedPaths['nrc_front'],
        $uploadedPaths['nrc_back']
    ]);

    echo json_encode([
        'success' => true, 
        'message' => 'Identity details submitted for review',
        'paths' => $uploadedPaths
    ]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

























