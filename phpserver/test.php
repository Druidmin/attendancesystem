<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$host = 'localhost';
$port = 3306;
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, null, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "✅ Connected successfully";

$sql = file_get_contents('init.sql');
if ($conn->multi_query($sql)) {
    echo "Database initialized successfully\n";
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
}
else {
    echo "Error initializing database: " . $conn->error . "\n";
}

$sql = file_get_contents('functions.sql');
if ($conn->multi_query($sql)) {
    echo "Stored Procedures initialized successfully\n";
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
}
else {
    echo "Error initializing procedures: " . $conn->error . "\n";
}

$student_name = 'Alice Smith';
$course_name = 'Math 101';
$name = 'Jacob Smith';
$username = 'bsmith';
$password = 'password1253';
$role = 'user';
$course_name = 'Math 101';

$sql = "CALL get_attendance('$course_name')";
$result = $conn->query($sql);
if ($result) {
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo "Attendance data:\n";
    print_r($data);
} else {
    echo "Error: " . $conn->error . "\n";
}

?>