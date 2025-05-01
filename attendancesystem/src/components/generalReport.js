import React, { useEffect, useState } from 'react';
import TeacherNavbar from './TeacherNavbar';
import './generalReport.css';

function ReportPage() {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/attendance-system/api/getReport.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setReportData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div classname="generate-report" style={{ padding: '20px' }}>
      <TeacherNavbar />
      <h2>Attendance Report</h2>
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
                <td>{entry.name}</td>
                <td>{entry.course}</td>
                <td>{entry.date}</td>
                <td>{entry.status}</td>
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
