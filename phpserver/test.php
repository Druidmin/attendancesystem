<?php
$host = 'localhost';
$port = 3307;
$db = 'mydb';
$user = 'user';
$pass = 'password';

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "✅ Connected successfully";
