import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/" style={{ fontWeight: 'bold' }}>Private Courses Center</Link>
      </div>
      <div>
        <Link to="/">Courses</Link>
        {isAuthenticated && user.role === 'student' && <Link to="/my-courses">My Courses</Link>}
        {isAuthenticated && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {!isAuthenticated ? (
          <Link to="/auth">Login / Register</Link>
        ) : (
          <>
            <span style={{ marginLeft: '0.75rem', marginRight: '0.75rem' }}>{user.name || user.email}</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
