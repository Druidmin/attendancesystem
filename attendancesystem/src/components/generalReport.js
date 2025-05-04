import React, { useEffect, useState } from 'react';
import TeacherNavbar from './TeacherNavbar';
import './generalReport.css';

function ReportPage() {
  const [reportData, setReportData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('Math 101');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch('/api/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ course_name: selectedCourse }),
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        setReportData(result.data);
        console.log('Report Data:', result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setReportData([]); // Clear old data if error
      }
    }

    fetchReport();
  }, [selectedCourse]);

  return (
    <div className="generate-report">
      <TeacherNavbar />
      <h1>Attendance Report</h1>

      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', fontSize: '16px' }}
      >
        <option value="Class 1">Math 101</option>
        <option value="Class 2">Science 202</option>
        <option value="Class 3">History 303</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.student}</td>
                <td>{entry.date}</td>
                <td>{entry.attendance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportPage;

