<?php

error_reporting(E_ALL);
ini_set("error_reporting", E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');


    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
    } catch (Exception $e) {
        echo '{"error": "Invalid input"}';
        die();
    }

    if (!is_array($data)) {
        echo '{"error": "Invalid data format"}';
        die();
    }

    $options = [];
    $count = count($data);
    $startIndex = $count - 2;

    for ($i = $startIndex; $i < $count; $i++) {
        $attribute = $data[$i];

        if (!isset($attribute['id'], $attribute['product_id'], $attribute['name'], $attribute['position'], $attribute['values']) || !is_array($attribute['values'])) {
            echo '{"error": "Invalid attribute format"}';
            die();
        }

        $option = [
            'id' => $attribute['id'],
            'product_id' => $attribute['product_id'],
            'name' => $attribute['name'],
            'position' => $attribute['position'],
            'values' => $attribute['values']
        ];
        $options[] = $option;
    }

    print_r(json_encode(array_values($options)));
?>