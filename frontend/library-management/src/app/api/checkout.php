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

$data = json_decode(file_get_contents("php://input"), true);

$userEmail = $data['userEmail'];
$cartItems = $data['cartItems'];
$checkoutDate = $data['checkoutDate'];
$returnDate = $data['returnDate'];

$conn->begin_transaction();

try {
    $stmt = $conn->prepare("
        INSERT INTO LIBRARY_TRANSACTION (PatronEmail, BorrowDate, DueByDate) 
        VALUES (?, ?, ?)
    ");
    $stmt->bind_param("sss", $userEmail, $checkoutDate, $returnDate);
    $stmt->execute();
    $transactionID = $stmt->insert_id; // get the inserted transaction's ID
    
    // insert into LIBRARY_TRANSACTION_ITEM table for each cart item
    foreach ($cartItems as $item) {
        $catalogID = $item['CatalogID'];
        $stmt = $conn->prepare("
            INSERT INTO LIBRARY_TRANSACTION_ITEM (TransactionID, CatalogID) 
            VALUES (?, ?)
        ");
        $stmt->bind_param("ii", $transactionID, $catalogID);
        $stmt->execute();
    }

    $conn->commit();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$conn->close();
?>