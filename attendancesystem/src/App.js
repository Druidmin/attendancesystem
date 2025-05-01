import React from 'react';
import './App.css';
import Login from './components/Login';
<<<<<<< HEAD
import Register from './components/Register';
=======
>>>>>>> 49da8b91eb942a5f3d511687146983bc1ec4825f
import AttendanceHistory from './components/attendance-history';
import StudentHome from './components/StudentHome';
import TeacherHome from './components/TeacherHome';
import ViewAttendanceHistory from './components/view-attendance-history';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
<<<<<<< HEAD
        <Route path="/register" element={<Register />} />
=======
>>>>>>> 49da8b91eb942a5f3d511687146983bc1ec4825f
        <Route path="/shome" element={<StudentHome />} />
        <Route path="/thome" element={<TeacherHome />} />
        <Route path="/attendance-history" element={<AttendanceHistory />} />
        <Route path="/view-attendance-history" element={<ViewAttendanceHistory />} />
      </Routes>
    </Router>
  );
}

export default App;