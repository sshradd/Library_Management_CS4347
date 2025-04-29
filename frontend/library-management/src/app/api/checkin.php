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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['transactionID'])) {
    echo json_encode(['success' => false, 'message' => 'Missing transactionID']);
    exit;
}

$transactionID = $data['transactionID'];

try {
    $stmt = $conn->prepare("
        UPDATE LIBRARY_TRANSACTION
        SET ReturnedDate = NOW()
        WHERE TransactionID = ?
    ");
    $stmt->bind_param("i", $transactionID);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update transaction']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$conn->close();
?>
