const express = require('express');
const router = express.Router();
const { createTeacher, getTeachers } = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/auth');

// Public: get teachers
router.get('/', getTeachers);

// Admin-only
router.post('/', protect, authorize('admin'), createTeacher);

module.exports = router;
