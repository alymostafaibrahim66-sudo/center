const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

// Authenticate any user (student or admin)
const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded contains { id, role }
    req.user = { id: decoded.id, role: decoded.role };
    // Optionally attach full user doc (not strictly necessary)
    if (decoded.role === 'student') {
      req.userDoc = await Student.findById(decoded.id).select('-password');
    } else if (decoded.role === 'admin') {
      req.userDoc = await Admin.findById(decoded.id).select('-password');
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

// Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
};

module.exports = { protect, authorize };
