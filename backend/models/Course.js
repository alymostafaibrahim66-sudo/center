const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
