import React from 'react';
import StudentNavbar from './StudentNavbar';
import './Homepage.css';

function StudentHome() {
  return (
    <div className="student-home">
      <StudentNavbar />
      <div className="content">
        <h1>Welcome to the Student Home Page</h1>
      </div>
    </div>
  );
}

export default StudentHome;
