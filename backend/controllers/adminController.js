const Student = require('../models/Student');
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');
const Enrollment = require('../models/Enrollment');

// Admin-only listing endpoints and some convenience operations

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().select('-password').sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('teachers');
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    next(err);
  }
};

exports.getEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId', '-password')
      .populate('courseId')
      .populate('teacherId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};
