import React, { useEffect, useState } from 'react';
import TeacherNavbar from './TeacherNavbar';
import './generalReport.css';

function ReportPage() {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
/*
  useEffect(() => {
    fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_name: 'Math 101' }), // Replace with actual course name from prop
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setReportData(data))
      .catch((err) => setError(err.message));
  }, []);
*/

useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch('/api/report',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ course_name: 'Math 101' })
        });
          const result = await response.json();
          console.log(result.data);
          setReportData(result.data);
          //alert(result.message);
      } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
    fetchReport();
  }, []);



  return (
    <div className="generate-report">
      <TeacherNavbar />
      <h1>Attendance Report</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.student}</td>
                <td>Math 101</td>
                <td>{entry.date}</td>
                <td>{entry.attendance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportPage;
