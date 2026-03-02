<?php
header('Content-Type: application/json');
require_once 'connection.php';
require_once __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;

$input = json_decode(file_get_contents("php://input"), true);

$API_KEY = 'd17d75a7437f62d4ce3e80b31a0e575eb34745288f699b7ebe9dee98d22305e5';
$ACCOUNT_ID = '0e9fb03a-637d-4e61-beeb-253ae5c9b366'; 
$AMOUNT     = (float)($input['amount'] ?? 0);
$PHONE      = $input['mobile_number'] ?? '';
$p_id   = $input['user_token'] ?? ''; 
$password   = $input['password'] ?? ''; 
$REFERENCE  = 'TXN_' . uniqid();

if ($AMOUNT <= 0 || empty($PHONE)) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit;
}

$client = new Client();

$stmt = $pdo->prepare("SELECT * FROM users WHERE public_id = ? LIMIT 1");
$stmt->execute([$p_id]);
$user_ = $stmt->fetch(PDO::FETCH_ASSOC);


if(!password_verify($password, $user_['password'])) {
    echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    exit;
}


function detectTelco(string $phone): string{
    $phone = preg_replace('/\D/', '', $phone);

    if (strlen($phone) !== 10) {
        return 'UNKNOWN';
    }

    $prefix = substr($phone, 0, 3);

    return match ($prefix) {
        '096', '076' => 'MTN',
        '097', '077' => 'AIRTEL',
        '095', '075' => 'ZAMTEL',
        default => 'UNKNOWN',
    };
}


$stmt = $pdo->prepare(
    "SELECT wallet_id, balance 
        FROM wallets 
        WHERE user_id = ? 
        AND wallet_type = 'main' 
        AND status = 'active'
        FOR UPDATE"
);
$stmt->execute([$p_id]);
$wallet = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$wallet) {
    throw new Exception("Wallet not found");
}

$newBalance = $wallet['balance'] - $AMOUNT;

if($AMOUNT > $wallet['balance']){
    echo json_encode(['success' => false, 'message' => 'insufficient funds']);
    exit;
}

if($AMOUNT <= 1){
    echo json_encode(['success' => false, 'message' => 'Minimum withdrawal amount is ZMW 100.']);
    exit;
}

if($wallet['balance'] == 0.00 || $newBalance < 0){
    echo json_encode(['success' => false, 'message' => 'insufficient funds']);
    exit;
}


$telco = detectTelco($PHONE);

try {
    // $response = $client->request('POST', 'https://api.lenco.co/access/v2/transfers/mobile-money', [
    //     'headers' => [
    //         'Authorization' => 'Bearer ' . $API_KEY,
    //         'Accept' => 'application/json',
    //         'Content-Type' => 'application/json',
    //     ],
    //     'json' => [
    //         'accountId' => $ACCOUNT_ID,
    //         'amount' => $AMOUNT,
    //         'reference' => $REFERENCE,
    //         'phone' => $PHONE,
    //         'operator' => $telco,
    //         'country' => "zm",
    //         'narration' => 'GreenLoans'
    //     ],
    // ]);

    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE public_id = ? LIMIT 1");
    $stmt->execute([$p_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'User not found.']);
        exit;
    }

    $user_id = $p_id;

    $stmt = $pdo->prepare("INSERT INTO transactions (user_id, wallet_id,sender_id, receiver_id, amount, reference, t_type, status) 
    VALUES (?, ?,?,?,?,?, 'withdraw', 'successful')");
    $stmt->execute([$user_id, $user_id, $PHONE, $user_id, $AMOUNT, $REFERENCE]);



    
    $stmt = $pdo->prepare(
        "SELECT wallet_id, balance 
            FROM wallets 
            WHERE user_id = ? 
            AND wallet_type = 'main' 
            AND status = 'active'
            FOR UPDATE"
    );
    $stmt->execute([$p_id]);
    $wallet = $stmt->fetch(PDO::FETCH_ASSOC);

    $balance = $wallet['balance'] - $AMOUNT;

    $stmt = $pdo->prepare(
        "UPDATE wallets SET balance = ? WHERE wallet_id = ?"
    );
    $stmt->execute([$balance, $wallet['wallet_id']]);


    $system_wallet = "greenloans.co6987933973fef";

    $stmt = $pdo->prepare(
        "SELECT balance 
            FROM wallets 
            WHERE user_id = ? 
            FOR UPDATE"
    );
    $stmt->execute([$system_wallet]);
    $wallet = $stmt->fetch(PDO::FETCH_ASSOC);
    $system_balance = $wallet['balance'] + $AMOUNT;

    $stmt = $pdo->prepare(
        "UPDATE wallets SET balance = ? WHERE user_id = ?"
    );
    $stmt->execute([$system_balance, $system_wallet]);


    echo json_encode([
        'success' => true,
        'status' => 'pending', 
        'message' => 'Please check your phone for the PIN prompt',
        'reference' => $REFERENCE
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Could not initiate collection'
    ]);
}