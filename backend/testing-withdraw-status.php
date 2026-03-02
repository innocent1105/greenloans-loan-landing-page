<?php
require_once __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

header('Content-Type: application/json');

$ACCESS_TOKEN = 'd17d75a7437f62d4ce3e80b31a0e575eb34745288f699b7ebe9dee98d22305e5';
$reference    = 'GL_6989156891a6f'; // MUST be exact

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

    echo $response->getBody()->getContents();

} catch (RequestException $e) {
    echo json_encode([
        'success' => false,
        'error'   => $e->hasResponse()
            ? $e->getResponse()->getBody()->getContents()
            : $e->getMessage()
    ]);
}