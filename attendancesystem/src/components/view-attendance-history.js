import React from 'react';
import StudentNavbar from './StudentNavbar';
import './view-attendance-history.css';

function ViewAttendanceHistory() {
  return (
    <div className="view-attendance-history">
      <StudentNavbar />
      <div className="content">
        <h1>Welcome to the Student Attendance History Page</h1>
      </div>
    </div>
  );
}

export default ViewAttendanceHistory;
