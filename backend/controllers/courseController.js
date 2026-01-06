const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

// Create course (admin)
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const course = await Course.create({ title, description });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

// Update course (admin)
exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const course = await Course.findByIdAndUpdate(id, updates, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// Delete course (admin)
exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};

// Get all courses (public)
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('teachers');
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

// Get course details (public)
exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('teachers');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// Assign teacher(s) to a course (admin)
exports.assignTeachers = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { teacherIds } = req.body; // array of teacher ids
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Ensure provided teacherIds exist
    if (Array.isArray(teacherIds)) {
      const found = await Teacher.find({ _id: { $in: teacherIds } });
      const foundIds = found.map(t => t._id.toString());
      course.teachers = Array.from(new Set([...course.teachers.map(t => t.toString()), ...foundIds]));
      await course.save();
      await course.populate('teachers');
      return res.json(course);
    } else {
      return res.status(400).json({ message: 'teacherIds must be an array' });
    }
  } catch (err) {
    next(err);
  }
};
