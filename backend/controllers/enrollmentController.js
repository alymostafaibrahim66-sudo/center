const Enrollment = require('../models/Enrollment');

// Submit enrollment (student)
exports.createEnrollment = async (req, res, next) => {
  try {
    const { courseId, teacherId } = req.body;
    const studentId = req.user.id;

    // Ensure a student selects one teacher per course. Prevent duplicates:
    const existing = await Enrollment.findOne({ studentId, courseId });
    if (existing) {
      return res.status(400).json({ message: 'You already enrolled for this course' });
    }

    const enrollment = await Enrollment.create({ studentId, courseId, teacherId });
    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

// Get enrollments for logged-in student
exports.getMyEnrollments = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const enrollments = await Enrollment.find({ studentId })
      .populate('courseId')
      .populate('teacherId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

// Get all enrollments (admin)
exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('courseId')
      .populate('teacherId')
      .populate('studentId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

// Approve or reject (admin)
exports.updateEnrollmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const enrollment = await Enrollment.findByIdAndUpdate(id, { status }, { new: true })
      .populate('courseId')
      .populate('teacherId')
      .populate('studentId');
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};
