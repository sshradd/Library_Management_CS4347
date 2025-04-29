<?php
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
    'data' => [
        'profile' => null,
        'transactions' => []
    ]
];
// get and validate input
if (!isset($_GET['email'])) {
    $response['error'] = 'ERROR - Missing email.';
    echo json_encode($response);
    exit;
}
$patronemail = $conn->real_escape_string($_GET['email']);

// get profile info
$getProfile = "SELECT FullName, MembershipDate 
   FROM PATRON 
   WHERE Email = '$patronemail'";
$profileResult = $conn->query($getProfile);

if ($profileResult) {
    if ($profileResult->num_rows > 0) {
        $response['data']['profile'] = $profileResult->fetch_assoc();
        $response['success'] = true;
    } else {
        $response['error'] = 'ERROR - User not found.';
        echo json_encode($response);
        $profileResult->close();
        $conn->close();
        exit;
    }
    $profileResult->close();
} else {
    $response['error'] = 'ERROR - Failed getting profile: ' . $conn->error;
    echo json_encode($response);
    $conn->close();
    exit;
}

// get transaction info
$getTransactions = "
    SELECT t.TransactionID, t.BorrowDate, t.DueByDate, t.ReturnedDate, c.Title, c.ImageUrl
    FROM LIBRARY_TRANSACTION t
    JOIN LIBRARY_TRANSACTION_ITEM ti ON t.TransactionID = ti.TransactionID
    JOIN CATALOG_ITEM c ON ti.CatalogID = c.CatalogID
    WHERE t.PatronEmail = '$patronemail'";

$transResult = $conn->query($getTransactions);

if ($transResult) {
    while ($row = $transResult->fetch_assoc()) {
        $response['data']['transactions'][] = $row;
    }
    $transResult->close();
} else {
    $response['error'] = 'ERROR - Failed transactions query: ' . $conn->error;
}

// Return the JSON response
echo json_encode($response);
$conn->close();
?>