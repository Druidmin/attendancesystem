<?php
// backend/index.php

// Add proper CORS headers to handle preflight requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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


//$scriptName = dirname($_SERVER['SCRIPT_NAME']); // Get the directory of the script
//$request = str_replace($scriptName, '', $request); // Remove the script directory from the request path

$method = $_SERVER['REQUEST_METHOD'];


// Routes

if ($request === '/api/ping' && $method === 'GET') {
    echo json_encode(["message" => "React successfully called the PHP API!"]);
} elseif ($request === '/api/login' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "CALL get_user(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $data['username'], $data['password']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    if (empty($data)) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid username or password"]);
    }
    else {
        echo json_encode(["message" => "Login successful!", "data" => $data]);
    }
} elseif ($request === '/api/register' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "CALL create_user(?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $data['student_name'], 
    $data['username'], $data['password'], $data['role']);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registration Successful"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Registration failed"]);
    }
    $stmt->close();

} elseif ($request === '/api/attendance' && $method === 'GET') {
    getAttendance($conn);

} elseif ($request === '/api/users' && $method === 'GET') {
    getUsers($conn);

} elseif ($request === '/api/courses' && $method === 'GET') {
    getCourses($conn);

} elseif ($request === '/api/course_enrollment' && $method === 'GET') {
    getCourse_Enrollment($conn);

} elseif ($request === '/api/studenthist' && $method === 'POST') {
    // Get name associated with the username
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "SELECT name from users where username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $data['username']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    // Get attendance history for the student
    $sql = "CALL get_student_attendance(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $data[0]['name']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    echo json_encode(["message" => "Query successful!", "data" => $data]);

} elseif ($request === '/api/login' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "CALL get_user(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $data['username'], $data['password']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    echo json_encode(["message" => "Query successful!", "data" => $data]);


} elseif ($request === '/api/studentpercentage' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "CALL get_studentpercentage(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $data['course'], $data['name']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    echo json_encode(["message" => "Query successful!", "data" => $data]);

} elseif ($request === '/api/markattendance' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "CALL mark_attendance(?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $data['student_name'],
    $data['course'], $data['date'], $data['status']);
    $stmt->execute();
    $result = $stmt->get_result();

    $stmt->close();
    echo json_encode(["message" => "Attendance successful!"]);


} elseif ($request === '/api/register' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $sql = "CALL create_user(?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $data['student_name'], 
    $data['username'], $data['password'], $data['role'],
    $data['course_name']);

    $stmt->execute();
    $result = $stmt->get_result();

    $stmt->close();
    echo json_encode(["message" => "Registration Successful"]);


} elseif ($request === '/api/report' && $method === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "CALL get_attendance(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $data['course_name']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    echo json_encode(["message" => "Query successful!", "data" => $data]);
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
    $sql = "SELECT name FROM courses";
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
        exit;
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
}
?>
