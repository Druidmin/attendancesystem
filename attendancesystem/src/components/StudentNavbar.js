import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function StudentNavbar() {
  return (
    <nav className="navbar">
      <Link to="/shome" className="logo">StudentPortal</Link>
      <ul className="nav-links">
        <li>
          <Link to="/view-attendance-history">View Attendance History</Link>
        </li>
        <li>
          <Link to="/view-attendance-percentage">View Attendance Percentage</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
