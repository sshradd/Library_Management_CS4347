<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}

$user = $_SESSION['user'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Library Catalog</title>
</head>
<body>
<h2>Welcome, <?php echo htmlspecialchars($user['FullName']); ?>!</h2>
<p>Your email: <?php echo htmlspecialchars($user['Email']); ?></p>
<p>MembershipDate: <?php echo htmlspecialchars($user['MembershipDate']); ?></p>
<p>Your Password: <?php echo htmlspecialchars($user['Password']); ?></p>
<a href="logout.php">Logout</a>
</body>
</html>
