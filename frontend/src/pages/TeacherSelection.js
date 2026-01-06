import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const TeacherSelection = () => {
  const { id } = useParams(); // course id
  const [course, setCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => setCourse(res.data)).catch(() => {});
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!selectedTeacher) {
      setError('Select a teacher');
      return;
    }
    try {
      await api.post('/enrollments', { courseId: id, teacherId: selectedTeacher });
      navigate('/my-courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll');
    }
  };

  if (!course) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h3>Enroll in: {course.title}</h3>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Select Teacher</label>
            <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
              <option value="">-- Select --</option>
              {course.teachers.map(t => <option value={t._id} key={t._id}>{t.name} - {t.specialization}</option>)}
            </select>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button className="btn" type="submit">Submit Enrollment</button>
        </form>
      </div>
    </div>
  );
};

export default TeacherSelection;
