const express = require('express');
const router = express.Router();
const { registerStudent, login } = require('../controllers/authController');

// Register a student
router.post('/register', registerStudent);

// Login (student or admin). Body must include role: 'student' or 'admin'
router.post('/login', login);

module.exports = router;
