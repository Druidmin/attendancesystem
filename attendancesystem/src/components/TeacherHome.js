import React from 'react';
import TeacherNavbar from './TeacherNavbar';
import './Homepage.css';

function TeacherHome() {
  return (
    <div className="teacher-home">
      <TeacherNavbar />
      <div className="content">
        <h1>Welcome to the Teacher Home Page</h1>
      </div>
    </div>
  );
}

export default TeacherHome;
