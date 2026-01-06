import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    api.get('/enrollments/me')
      .then(res => setEnrollments(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <h2>My Enrollments</h2>
      {enrollments.map(e => (
        <div key={e._id} className="card">
          <h3>{e.courseId?.title}</h3>
          <p>Teacher: {e.teacherId?.name}</p>
          <p>Status: <strong>{e.status}</strong></p>
          <p>Enrolled at: {new Date(e.createdAt).toLocaleString()}</p>
        </div>
      ))}
      {enrollments.length === 0 && <div>No enrollments yet.</div>}
    </div>
  );
};

export default MyCourses;
