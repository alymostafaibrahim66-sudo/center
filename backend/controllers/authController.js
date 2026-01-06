const Student = require('../models/Student');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// Student registration
exports.registerStudent = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }
    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const student = await Student.create({ name, email, password });
    const token = generateToken({ id: student._id, role: student.role });

    res.status(201).json({
      token,
      user: { id: student._id, name: student.name, email: student.email, role: student.role }
    });
  } catch (err) {
    next(err);
  }
};

// Login for both students and admins
exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Provide email, password and role' });
    }

    if (role === 'student') {
      const student = await Student.findOne({ email });
      if (!student) return res.status(401).json({ message: 'Invalid credentials' });
      const isMatch = await student.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      const token = generateToken({ id: student._id, role: student.role });
      return res.json({ token, user: { id: student._id, name: student.name, email: student.email, role: student.role } });
    } else if (role === 'admin') {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      const token = generateToken({ id: admin._id, role: admin.role });
      return res.json({ token, user: { id: admin._id, email: admin.email, role: admin.role } });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
  } catch (err) {
    next(err);
  }
};
