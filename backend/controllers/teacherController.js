const Teacher = require('../models/Teacher');

// Create teacher (admin)
exports.createTeacher = async (req, res, next) => {
  try {
    const { name, specialization, experience } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const teacher = await Teacher.create({ name, specialization, experience });
    res.status(201).json(teacher);
  } catch (err) {
    next(err);
  }
};

// Get all teachers (public)
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    next(err);
  }
};
