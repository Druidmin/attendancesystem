import React, { useEffect, useState } from 'react';
import TeacherNavbar from './TeacherNavbar';
import './generalReport.css';

function ReportPage() {
  const [reportData, setReportData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all courses to populate dropdown
  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => setError("Failed to load courses"));
  }, []);

  // Fetch report when selectedCourse changes
  useEffect(() => {
    if (!selectedCourse) return;

    async function fetchReport() {
      try {
        const response = await fetch('/api/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ course_name: selectedCourse }),
        });
        const result = await response.json();
        setReportData(result.data);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to fetch report");
      }
    }

    fetchReport();
  }, [selectedCourse]);

  return (
    <div className="generate-report">
      <TeacherNavbar />
      <h1>Attendance Report</h1>

      <label>Select Course: </label>
      <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
        <option value="">-- Select a course --</option>
        {courses.map((course, index) => (
          <option key={index} value={course.course_name}>
            {course.course_name}
          </option>
        ))}
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
