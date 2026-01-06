const express = require('express');
const router = express.Router();
const {
  createEnrollment,
  getMyEnrollments,
  getAllEnrollments,
  updateEnrollmentStatus
} = require('../controllers/enrollmentController');

const { protect, authorize } = require('../middleware/auth');

// Student enrollments
router.post('/', protect, authorize('student'), createEnrollment);
router.get('/me', protect, authorize('student'), getMyEnrollments);

// Admin: view and manage enrollments
router.get('/', protect, authorize('admin'), getAllEnrollments);
router.put('/:id/status', protect, authorize('admin'), updateEnrollmentStatus);

module.exports = router;
