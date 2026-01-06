import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');

  const toggle = () => {
    setIsRegister(!isRegister);
    setError('');
    setForm({ name: '', email: '', password: '', role: 'student' });
  };

  const handleChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // register student only
        const res = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password });
        login(res.data.token, res.data.user);
        navigate('/student/dashboard');
      } else {
        // login: include role
        const res = await api.post('/auth/login', { email: form.email, password: form.password, role: form.role });
        login(res.data.token, res.data.user);
        if (res.data.user.role === 'admin') navigate('/admin');
        else navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{isRegister ? 'Student Register' : 'Login'}</h2>
        <form onSubmit={submit}>
          {isRegister && (
            <div className="form-group">
              <label>Name</label>
              <input name="name" className="input" value={form.name} onChange={handleChange} required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input name="email" className="input" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="input" value={form.password} onChange={handleChange} required />
          </div>

          {!isRegister && (
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          {error && <div style={{ color: 'red' }}>{error}</div>}

          <button className="btn" type="submit">{isRegister ? 'Register' : 'Login'}</button>
          <button type="button" className="btn secondary" style={{ marginLeft: '0.5rem' }} onClick={toggle}>
            {isRegister ? 'Switch to Login' : 'Register as Student'}
          </button>
        </form>
      </div>

      <div className="card">
        <h4>Admin test account</h4>
        <p>To use admin dashboard create an admin directly in the database, or use this endpoint to create one through MongoDB tools.</p>
        <p>Admin only: login with role=admin</p>
      </div>
    </div>
  );
};

export default LoginRegister;
