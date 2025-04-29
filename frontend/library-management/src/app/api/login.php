<?php
include "../../db/db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$response = [
    'success' => false,
    'error' => '',
    'data' => []
];

$data = json_decode(file_get_contents("php://input"), true);

// get and validate input
if (!isset($data['email']) || !isset($data['password'])) {
    $response['error'] = 'ERROR - Missing email or password.';
    echo json_encode($response);
    exit;
}

$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']);

// login function
$loginUser = "SELECT * FROM PATRON
              WHERE Email = '$email' AND Password = '$password'";
              
$result = $conn->query($loginUser);

// Initialize the data array
$data = [];

if ($result) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $result->free();
    
    // Check if any records were found
    if (count($data) > 0) {
        $response['success'] = true;
        $response['data'] = $data;
    } else {
        $response['error'] = 'ERROR - Invalid email or password.';
    }
}
else {
    $response['error'] = 'ERROR - failed query' . $conn->error;
}

// Return the JSON response
echo json_encode($response);

$conn->close();
?>