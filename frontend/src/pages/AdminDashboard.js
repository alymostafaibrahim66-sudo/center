import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', specialization: '', experience: 0 });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [sRes, cRes, tRes, eRes] = await Promise.all([
        api.get('/admin/students'),
        api.get('/admin/courses'),
        api.get('/admin/teachers'),
        api.get('/admin/enrollments')
      ]);
      setStudents(sRes.data);
      setCourses(cRes.data);
      setTeachers(tRes.data);
      setEnrollments(eRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', newCourse);
      setNewCourse({ title: '', description: '' });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create course');
    }
  };

  const createTeacher = async (e) => {
    e.preventDefault();
    try {
      await api.post('/teachers', newTeacher);
      setNewTeacher({ name: '', specialization: '', experience: 0 });
      fetchAll();
    } catch (err) {
      alert('Failed to create teacher');
    }
  };

  const assignTeacher = async (courseId, teacherId) => {
    try {
      await api.post(`/courses/${courseId}/assign-teachers`, { teacherIds: [teacherId] });
      fetchAll();
    } catch (err) {
      alert('Failed to assign teacher');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enrollments/${id}/status`, { status });
      fetchAll();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="card">
        <h3>Create Course</h3>
        <form onSubmit={createCourse}>
          <div className="form-group">
            <label>Title</label>
            <input value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} />
          </div>
          <button className="btn" type="submit">Create Course</button>
        </form>
      </div>

      <div className="card">
        <h3>Create Teacher</h3>
        <form onSubmit={createTeacher}>
          <div className="form-group">
            <label>Name</label>
            <input value={newTeacher.name} onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input value={newTeacher.specialization} onChange={e => setNewTeacher({ ...newTeacher, specialization: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Experience (years)</label>
            <input type="number" value={newTeacher.experience} onChange={e => setNewTeacher({ ...newTeacher, experience: Number(e.target.value) })} />
          </div>
          <button className="btn" type="submit">Create Teacher</button>
        </form>
      </div>

      <div className="card">
        <h3>Courses</h3>
        {courses.map(c => (
          <div key={c._id} style={{ marginBottom: '0.75rem' }}>
            <strong>{c.title}</strong>
            <div>
              Assigned teachers: {c.teachers && c.teachers.length ? c.teachers.map(t => t.name).join(', ') : 'None'}
            </div>
            <div>
              <label>Assign:</label>
              <select onChange={e => assignTeacher(c._id, e.target.value)}>
                <option value="">-- select teacher --</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Enrollments</h3>
        {enrollments.map(en => (
          <div key={en._id} style={{ marginBottom: '0.5rem' }}>
            <div><strong>{en.courseId?.title}</strong> by <em>{en.studentId?.name || en.studentId?.email}</em></div>
            <div>Teacher: {en.teacherId?.name}</div>
            <div>Status: {en.status}</div>
            <div>
              <button className="btn" onClick={() => updateStatus(en._id, 'approved')}>Approve</button>
              <button className="btn secondary" onClick={() => updateStatus(en._id, 'rejected')} style={{ marginLeft: '0.5rem' }}>Reject</button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Students</h3>
        {students.map(s => (
          <div key={s._id}>{s.name} - {s.email}</div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
