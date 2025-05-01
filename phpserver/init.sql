USE attendance_system;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(10) CHECK (status IN ('present', 'absent')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course_enrollment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE KEY unique_enrollment (user_id, course_id)
);

DELIMITER //

CREATE PROCEDURE get_attendance(IN course_id INT)
BEGIN
  SELECT 
    u.first_name,
    u.last_name,
    a.date,
    a.status
  FROM attendance a
  JOIN users u ON a.user_id = u.id
  JOIN course_enrollment ce ON u.id = ce.user_id
  WHERE ce.course_id = course_id
  ORDER BY a.date DESC, u.last_name, u.first_name;
END //

CREATE PROCEDURE get_student_attendance(IN p_user_id INT, IN p_course_id INT)
BEGIN
  SELECT 
    a.date,
    a.status
  FROM attendance a
  WHERE a.user_id = p_user_id
  AND EXISTS (
    SELECT 1 FROM course_enrollment ce 
    WHERE ce.user_id = p_user_id 
    AND ce.course_id = p_course_id
  )
  ORDER BY a.date DESC;
END //

DELIMITER ;
