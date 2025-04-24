CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(50) CHECK (role IN ('admin', 'user')),
);

CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  student VARCHAR(100) REFERENCES users(name),
  date DATE NOT NULL,
  status VARCHAR(10) CHECK (status IN ('present', 'absent')),
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
);

CREATE TABLE IF NOT EXISTS course_enrollment (
  id SERIAL PRIMARY KEY,
  student VARCHAR(100) REFERENCES users(name),
  course VARCHAR(100) REFERENCES courses(name),
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
