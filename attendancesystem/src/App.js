import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import AttendanceHistory from './components/attendance-history';
import StudentHome from './components/StudentHome';
import TeacherHome from './components/TeacherHome';
import ViewAttendanceHistory from './components/view-attendance-history';
import MarkAttendancePage from './components/MarkAttendancePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shome" element={<StudentHome />} />
        <Route path="/thome" element={<TeacherHome />} />
        <Route path="/attendance-history" element={<AttendanceHistory />} />
        <Route path="/view-attendance-history" element={<ViewAttendanceHistory />} />
        <Route path="/mark-attendance" element={<MarkAttendancePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
