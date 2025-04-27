import React, { useEffect, useState } from 'react';

function ReportPage() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/your-api-endpoint/getReport.php')
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.error('Error fetching report:', error));
  }, []);

  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Attendance Report'),
      React.createElement('table', { border: 1 },
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Student Name'),
            React.createElement('th', null, 'Course'),
            React.createElement('th', null, 'Date'),
            React.createElement('th', null, 'Status')
          )
        ),
        React.createElement('tbody', null,
          reportData.map((entry, index) => (
            React.createElement('tr', { key: index },
              React.createElement('td', null, entry.name),
              React.createElement('td', null, entry.course),
              React.createElement('td', null, entry.date),
              React.createElement('td', null, entry.status)
            )
          ))
        )
      )
    )
  );
}

export default ReportPage;
