import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => setCourse(res.data)).catch(() => {});
  }, [id]);

  if (!course) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{course.title}</h2>
        <p>{course.description}</p>

        <h4>Teachers</h4>
        {course.teachers && course.teachers.length > 0 ? (
          <ul>
            {course.teachers.map(t => (
              <li key={t._id}>{t.name} - {t.specialization} ({t.experience} yrs)</li>
            ))}
          </ul>
        ) : <div>No teachers assigned yet.</div>}

        {user?.role === 'student' ? (
          <Link to={`/courses/${id}/select`} className="btn">Select Teacher & Enroll</Link>
        ) : (
          <div style={{ marginTop: '0.5rem' }}>Login as a student to enroll.</div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
