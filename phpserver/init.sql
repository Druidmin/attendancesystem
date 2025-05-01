<<<<<<< HEAD
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
=======
CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(50) CHECK (role IN ('admin', 'user'))
);

CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  student VARCHAR(100) REFERENCES users(name),
  date DATE NOT NULL,
  status VARCHAR(10) CHECK (status IN ('present', 'absent'))
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS course_enrollment (
  id SERIAL PRIMARY KEY,
  student VARCHAR(100) REFERENCES users(name),
  course VARCHAR(100) REFERENCES courses(name)
);

CREATE PROCEDURE IF NOT EXISTS get_attendance(IN course_name VARCHAR(100))
BEGIN
SELECT student, group_concat(date, ': ', status) AS attendance FROM attendance order by student;
END;

CREATE PROCEDURE IF NOT EXISTS get_student_attendance(IN course_name VARCHAR(100), IN student_name VARCHAR(100))
BEGIN
SELECT group_concat(date, ': ', status) AS attendance FROM attendance WHERE student = student_name order by date;
END;

CREATE PROCEDURE IF NOT EXISTS get_students(IN course_name VARCHAR(100))
BEGIN
SELECT student FROM course_enrollment WHERE course = course_name;
END;

CREATE PROCEDURE IF NOT EXISTS get_studentcnt(IN course_name VARCHAR(100))
BEGIN
SELECT Count(*) FROM course_enrollment WHERE course = course_name;
END;

CREATE PROCEDURE IF NOT EXISTS get_attendancecnt(IN course_name VARCHAR(100))
BEGIN
SELECT Count(*) FROM attendance WHERE course = course_name and status = 'present';
END;

CREATE PROCEDURE IF NOT EXISTS create_user(IN name VARCHAR(100), IN username VARCHAR(100), IN password VARCHAR(100), IN role VARCHAR(50), IN course_name VARCHAR(100))
BEGIN
INSERT INTO users (name, username, password, role) VALUES (name, username, password, role);
INSERT INTO course_enrollment (student, course) VALUES (name, course_name);
END;

INSERT INTO users (name, username, password, role) VALUES ('Sammi', 'sah9j', 'password123', 'admin');
>>>>>>> 49da8b91eb942a5f3d511687146983bc1ec4825f
