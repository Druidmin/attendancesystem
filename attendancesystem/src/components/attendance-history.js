import React from 'react';
import TeacherNavbar from './TeacherNavbar';
import './attendance-history.css';

function AttendanceHistory() {
  return (
    <div className="attendance-history">
      <TeacherNavbar />
      <div className="content">
        <h1>Welcome to the Teacher Attendance History Page</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default AttendanceHistory;
