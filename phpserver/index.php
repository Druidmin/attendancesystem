<?php
// backend/index.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection

$host = 'localhost';
$port = 3307;
$db = 'school_management';
$user = 'user';
$pass = 'password';

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Simple router using the REQUEST_URI
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];





// Routes

if ($request === '/api/attendance' && $method === 'GET') {
    getAttendance($conn);

} elseif ($request === '/api/users' && $method === 'GET') {
    getUsers($conn);

} elseif ($request === '/api/courses' && $method === 'GET') {
    getCourses($conn);

} elseif ($request === '/api/course_enrollment' && $method === 'GET') {
    getCourse_Enrollment($conn);

} else {
    http_response_code(404);
    echo json_encode(["error" => "Not Found"]);
}

$conn->close();






// --------- FUNCTION DEFINITIONS ---------

function getAttendance($conn) {
    $sql = "SELECT * FROM attendance";
    $result = $conn->query($sql);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed"]);
        return;
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
function getUsers($conn) {
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed"]);
        return;
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
function getCourses($conn) {
    $sql = "SELECT * FROM courses";
    $result = $conn->query($sql);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed"]);
        return;
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
function getCourse_Enrollment($conn) {
    $sql = "SELECT * FROM course_enrollment";
    $result = $conn->query($sql);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed"]);
        return;
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
?>
