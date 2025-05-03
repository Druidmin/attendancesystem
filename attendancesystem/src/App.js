import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import AttendanceHistory from './components/attendance-history';
import StudentHome from './components/StudentHome';
import TeacherHome from './components/TeacherHome';
import ViewAttendanceHistory from './components/view-attendance-history';
import ReportPage from './components/generalReport';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [username, setUserName] = React.useState('');
  const [role, setRole] = React.useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUsername={setUserName} role={role} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shome" element={<StudentHome />} />
        <Route path="/thome" element={<TeacherHome />} /> 
        <Route path="/attendance-history" element={<AttendanceHistory />} />
        <Route path="/view-attendance-history" element={<ViewAttendanceHistory username={username} />} />
        <Route path="/generate-report" element={<ReportPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;