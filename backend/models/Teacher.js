const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  experience: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
