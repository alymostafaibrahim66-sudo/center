const express = require('express');
const router = express.Router();
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourseById,
  assignTeachers
} = require('../controllers/courseController');

const { protect, authorize } = require('../middleware/auth');

// Public: list & details
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Admin-only course management
router.post('/', protect, authorize('admin'), createCourse);
router.put('/:id', protect, authorize('admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

// Assign teachers to course
router.post('/:courseId/assign-teachers', protect, authorize('admin'), assignTeachers);

module.exports = router;
