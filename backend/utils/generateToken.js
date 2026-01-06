const jwt = require('jsonwebtoken');

// Generate JWT token for a user payload (id and role)
const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = generateToken;
