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

$data = [];

// Get every field that is a catalog item
$sqlSelect = "
    SELECT 
        C.CatalogID,
        C.Title,
        C.PublicationDate,
        C.Language,
        C.ImageUrl,
        B.Book_ID AS BookID,
        B.ISBN,
        A.AuthorName,
        D.Dvd_ID AS DvdID,
        D.Publisher AS DvdPublisher,
        D.Duration,
        D.Format,
        M.Magazine_ID AS MagazineID,
        M.Publisher AS MagazinePublisher,
        M.Issue,
        M.Nameplate
    FROM CATALOG_ITEM C
    LEFT JOIN BOOK B ON C.CatalogID = B.Book_ID
    LEFT JOIN DVD D ON C.CatalogID = D.Dvd_ID
    LEFT JOIN MAGAZINE M ON C.CatalogID = M.Magazine_ID
    LEFT JOIN AUTHOR A ON B.Book_ID = A.Book_ID
";
$result = $conn->query($sqlSelect);

while($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>