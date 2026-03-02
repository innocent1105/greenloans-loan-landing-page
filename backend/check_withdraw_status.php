<?php
header('Content-Type: application/json');

require_once 'connection.php';
require_once __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

$reference = $_GET['ref'] ?? '';

if (!$reference) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing reference'
    ]);
    exit;
}

$ACCESS_TOKEN = 'd17d75a7437f62d4ce3e80b31a0e575eb34745288f699b7ebe9dee98d22305e5';

$client = new Client([
    'timeout' => 10,
]);

try {
    $response = $client->request(
        'GET',
        "https://api.lenco.co/access/v2/transfers/status/{$reference}",
        [
            'headers' => [
                'Authorization' => "Bearer {$ACCESS_TOKEN}",
                'Accept'        => 'application/json',
            ]
        ]
    );

    $payload = json_decode($response->getBody()->getContents(), true);

    if (!isset($payload['status']) || $payload['status'] !== true) {
        throw new Exception($payload['message'] ?? 'Failed to retrieve transfer status');
    }

    $status = $payload['data']['status'] ?? 'pending';

    // ---- TRANSACTION SAFETY ----
    $pdo->beginTransaction();

    $stmt = $pdo->prepare(
        "SELECT t_id 
         FROM transactions 
         WHERE reference = ? 
         FOR UPDATE"
    );
    $stmt->execute([$reference]);
    $tx = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$tx) {
        throw new Exception('Transaction not found in database');
    }

    $stmt = $pdo->prepare(
        "UPDATE transactions 
         SET status = ? 
         WHERE reference = ?"
    );
    $stmt->execute([$status, $reference]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'status'  => $status
    ]);

} catch (RequestException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        'success' => false,
        'message' => $e->hasResponse()
            ? $e->getResponse()->getBody()->getContents()
            : $e->getMessage()
    ]);

} catch (\Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}