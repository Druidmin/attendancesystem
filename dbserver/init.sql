CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS Users (
  name VARCHAR(100) PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(50) CHECK (role IN ('admin', 'user')),
);

CREATE TABLE IF NOT EXISTS Attendance (
  id SERIAL PRIMARY KEY,
  student VARCHAR(100) REFERENCES Users(name),
  date DATE NOT NULL,
  status VARCHAR(10) CHECK (status IN ('present', 'absent')),
);

CREATE TABLE IF NOT EXISTS Courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
);

INSERT INTO Users (name, username, password, role) VALUES ('Sammi', 'sah9j', 'password123', 'admin');