useEffect(() => {
  fetch('http://localhost/attendance-system/api/getReport.php')
    .then(response => response.json())
    .then(data => setReportData(data))
    .catch(error => console.error('Error fetching report:', error));
}, []);