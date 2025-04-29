<?php
include "../../db/db.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$response = [
    'success' => false,
    'error' => ''
];

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email'])) {
    $response['error'] = 'Missing email';
    echo json_encode($response);
    exit;
}

$email = $conn->real_escape_string($input['email']);

// check if that user exists
$check = $conn->query("SELECT * FROM PATRON WHERE Email = '$email'");
if (!$check || $check->num_rows === 0) {
    $response['error'] = 'User not found';
    echo json_encode($response);
    exit;
}

// delete that user
$delete = $conn->query("DELETE FROM PATRON WHERE Email = '$email'");

if ($delete) {
    $response['success'] = true;
} else {
    $response['error'] = 'Failed to delete user: ' . $conn->error;
}

echo json_encode($response);
$conn->close();