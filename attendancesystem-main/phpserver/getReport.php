<?php
// getReport.php
header('Content-Type: application/json');

// Database connection
$conn = new mysqli('localhost', 'root', '', 'attendance_db'); // adjust DB name

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$sql = "
SELECT 
  students.name AS name,
  classes.subject AS course,
  classes.date AS date,
  attendance.status AS status
FROM attendance
JOIN students ON attendance.student_id = students.id
JOIN classes ON attendance.class_id = classes.id
ORDER BY classes.date DESC
";

$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
