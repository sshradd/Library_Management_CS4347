<?php
session_start();

$response = ['error' => '', 'success' => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include "../db.php";

    // Unsanitized User Input
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!$email || !$password) {
        $response['error'] = "Please enter both email and password.";
    } else {

        // Prepare Statement
        $stmt = $conn->prepare("SELECT * FROM PATRON WHERE Email = ? AND Password = ?");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();

         if ($result && $result->num_rows > 0) {
            $_SESSION['user'] = $result->fetch_assoc();
            header("Location: profile.php");
            exit;
        } else {
            $response['error'] = "Invalid email or password.";
        }

        // Vulnerable to SQL Injection
        // $query = "SELECT * FROM PATRON WHERE Email = '$email' AND Password = '$password'";
        // $result = $conn->query($query);
        //// $result = $conn->multi_query($query);
       
        // if ($result && $result->num_rows > 0) {
        //     $_SESSION['user'] = $result->fetch_assoc();
        //     header("Location: profile.php");
        //     exit;
        // } else {
        //     $response['error'] = "Invalid email or password.";
        // }
        
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body { font-family: Arial; text-align: center; margin-top: 100px; }
        input { padding: 10px; margin: 5px; border-radius: 5px; width: 250px; }
        button { padding: 10px 20px; background-color: blue; color: white; border: none; border-radius: 5px; }
        .error { color: red; }
    </style>
</head>
<body>
    <h2>Login</h2>
    <?php if ($response['error']): ?>
        <p class="error"><?php echo $response['error']; ?></p>
    <?php endif; ?>
    <form method="POST" action="">
        <input type="text" name="email" placeholder="Email"><br>
        <input type="password" name="password" placeholder="Password"><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>
