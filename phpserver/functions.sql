CREATE PROCEDURE get_attendance(IN course_name VARCHAR(100))
BEGIN
    SELECT student, GROUP_CONCAT(CONCAT(date, ': ', status) SEPARATOR ', ') AS attendance 
    FROM attendance 
    WHERE course = course_name 
    GROUP BY student
    ORDER BY student;
END;

CREATE PROCEDURE get_student_attendance(IN course_name VARCHAR(100), IN p_student_name VARCHAR(100))
BEGIN
    SELECT GROUP_CONCAT(CONCAT(date, ': ', status) SEPARATOR ', ') AS attendance 
    FROM attendance 
    WHERE course = course_name AND student = p_student_name 
    ORDER BY date;
END;

CREATE PROCEDURE get_students(IN course_name VARCHAR(100))
BEGIN
    SELECT student 
    FROM course_enrollment 
    WHERE course = course_name;
END;

CREATE PROCEDURE get_studentcnt(IN course_name VARCHAR(100))
BEGIN
    SELECT COUNT(*) 
    FROM course_enrollment 
    WHERE course = course_name;
END;

CREATE PROCEDURE get_attendancecnt(IN course_name VARCHAR(100))
BEGIN
    SELECT COUNT(*) 
    FROM attendance 
    WHERE course = course_name AND status = 'present';
END;

CREATE PROCEDURE create_user(IN p_name VARCHAR(100), IN p_username VARCHAR(100), IN p_password VARCHAR(100), IN p_role VARCHAR(50), IN p_course_name VARCHAR(100))
BEGIN
    INSERT INTO users (name, username, password, role) VALUES (p_name, p_username, p_password, p_role);
    INSERT INTO course_enrollment (student, course) VALUES (p_name, p_course_name);
END;