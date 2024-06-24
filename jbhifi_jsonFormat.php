<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $postData = file_get_contents('php://input');

    // Decode the JSON data
    $data = json_decode($postData, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        // If the JSON is invalid, return an error message
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    // Process the data as needed
    // For example, you can access the data like this:
    // $value = $data['key'];

    // Return the received data in JSON format
    echo json_encode(['received_data' => $data]);
} else {
    // If not a POST request, return an error message
    echo json_encode(['error' => 'Invalid request method. Only POST requests are allowed.']);
}

?>
