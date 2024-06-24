<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Content-Type: application/json');
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $postData = file_get_contents('php://input');
    
        $data = json_decode($postData, true);
    
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['error' => 'Invalid JSON data']);
            exit;
        }
        echo json_encode(['received_data' => $data]);
    } else {
        echo json_encode(['error' => 'Invalid request method. Only POST requests are allowed.']);
    }

?>
