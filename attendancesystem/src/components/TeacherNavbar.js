import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function TeacherNavbar() {
  return (
    <nav className="navbar">
      <Link to="/TeacherHome" className="logo">TeacherPortal</Link>
      <ul className="nav-links">
        <li>
          <Link to="/generate-report">Generate Report</Link>
        </li>
        <li>
          <Link to="/mark-attendance">Mark Attendance</Link>
        </li>
        <li>
          <Link to="/attendance-history">Attendance History</Link>
        </li>
        <li>
          <Link to="/Login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default TeacherNavbar; 