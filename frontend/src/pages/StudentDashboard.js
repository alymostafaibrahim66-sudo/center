import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="container">
      <h2>Student Dashboard</h2>
      <div className="card">
        <h3>Actions</h3>
        <ul>
          <li><Link to="/">Browse Courses</Link></li>
          <li><Link to="/my-courses">My Enrollments</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
