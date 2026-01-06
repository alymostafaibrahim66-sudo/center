const express = require('express');
const router = express.Router();
const { getStudents, getCourses, getTeachers, getEnrollments } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All admin-only endpoints for viewing lists
router.get('/students', protect, authorize('admin'), getStudents);
router.get('/courses', protect, authorize('admin'), getCourses);
router.get('/teachers', protect, authorize('admin'), getTeachers);
router.get('/enrollments', protect, authorize('admin'), getEnrollments);

module.exports = router;
