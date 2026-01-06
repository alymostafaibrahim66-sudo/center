import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then(res => setCourses(res.data)).catch(() => {});
  }, []);

  return (
    <div className="container">
      <h2>Courses</h2>
      {courses.map(c => (
        <div key={c._id} className="card">
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <Link to={`/courses/${c._id}`} className="btn">Details</Link>
        </div>
      ))}
      {courses.length === 0 && <div>No courses yet.</div>}
    </div>
  );
};

export default CoursesList;
