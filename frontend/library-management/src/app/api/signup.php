<?php
/* signup.php */
include "../../db/db.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');
// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$response = [
    'success' => false,
    'error' => '',
    'data' => []
];

// get and validate input
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['email']) || !isset($input['password']) || !isset($input['fullname'])) {
    $response['error'] = 'ERROR - Missing inputs';
    echo json_encode($response);
    exit;
}

$fullname = $conn->real_escape_string($input['fullname']);
$email = $conn->real_escape_string($input['email']);
$password = $conn->real_escape_string($input['password']);
$today = date('Y-m-d');

// see if email is already being used
$checkEmail = "SELECT * FROM PATRON WHERE Email = '$email'";
$checkEmail = $conn->query($checkEmail);

if ($checkEmail && $checkEmail->num_rows > 0) {
    $response['error'] = 'Email is already in use. Login instead or use a different email.';
    echo json_encode($response);
    $checkEmail->close();
    $conn->close();
    exit;
}

// create new patron
$createPatron = "INSERT INTO PATRON (Email, FullName, MembershipDate, Password) 
               VALUES ('$email', '$fullname', '$today', '$password')";
               
$result = $conn->query($createPatron);

if ($result) {
    // login new patron (same query, just edited function)
    $loginNewUser = "SELECT * FROM PATRON
              WHERE Email = '$email'";
              
    $result = $conn->query($loginNewUser);
    $data = [];

    if ($result) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $result->close();

        if (count($data) > 0) {
            $response['success'] = true;
            $response['data'] = $data;
        } else {
            $response['error'] = 'ERROR - Invalid email or password.';
        }
    }
    else {
        $response['error'] = 'ERROR - Failed query' . $conn->error;
    }
}
else {
    $response['error'] = 'ERROR - Failed create patron' . $conn->error;
}
// Return the JSON response
echo json_encode($response);

$conn->close();
?>