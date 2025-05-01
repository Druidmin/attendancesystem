<?php
// backend/index.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection

$host = 'localhost';
$port = 3306;
// $db = 'school_management';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, null, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

initDatabase($conn);

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

} elseif ($request === '/api/register' && $method === 'POST') {
    // Handle POST request for attendance
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['course_name'])) {
        $course_name = $data['course_name'];
        $sql = "CALL get_attendance('$course_name')";
        $result = $conn->query($sql);
        if ($result) {
            $data = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($data);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Query failed"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
    }

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

function initDatabase($conn) {
    $sql = file_get_contents('init.sql');
    if ($conn->multi_query($sql)) {
        do {
            if ($result = $conn->store_result()) {
                $result->free();
            }
        } while ($conn->more_results() && $conn->next_result());
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error initializing database: " . $conn->error]);
    }

    $sql = file_get_contents('functions.sql');
    if ($conn->multi_query($sql)) {
        do {
            if ($result = $conn->store_result()) {
                $result->free();
            }
        } while ($conn->more_results() && $conn->next_result());
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error initializing procedures: " . $conn->error]);
    }
    echo json_encode(["message" => "Database initialized successfully"]);
}
?>
