import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import './view-attendance-history.css';

function ViewAttendanceHistory() {
  
  // Example of fetch attendance information
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('Alice Smith');
  const [course, setCourse] = useState('Math 101');
  const [history, setHistory] = useState([]);
  /*
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
*/


  const handleClick = async () => {
    try {
    const response = await fetch('/api/studenthist',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ course_name: course, student_name: name })
    });
      const result = await response.json();
      console.log(result.data);
      setHistory(result.data);
      alert(result.message);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  

  return (
    <div className="view-attendance-history">
      <StudentNavbar />
      <div className="content">
        <h1>Welcome to the Student Attendance History Page</h1>

        <button onClick={handleClick}>Test API</button>
          {/*Example Attendance List
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
        </div>*/}
      </div>
    </div>
  );
}

export default ViewAttendanceHistory;

