import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import './view-attendance-history.css';
import getAttendance from '../utilities/api.js'; 

function ViewAttendanceHistory() {
  
  // Example of fetch attendance information
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await getAttendance(); 
        setStudents(res); 
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div className="view-attendance-history">
      <StudentNavbar />
      <div className="content">
        <h1>Welcome to the Student Attendance History Page</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="students-list">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student.id} className="student-card">
                <h3>{student.student}</h3>
                <p>ID: {student.id}</p>
                <p>Status: {student.status}</p>
                <p>Date: {student.date}</p>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAttendanceHistory;
