<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);
    $jsonResponse = json_encode($data);
    echo $jsonResponse;
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>
