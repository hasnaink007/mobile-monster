<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        $response = [
            'status' => 'success',
            'receivedData' => $data
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Invalid JSON input'
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method'
    ];
}

echo json_encode($response);
?>
