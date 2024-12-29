const mongoose = require('mongoose');

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  comments: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  courseDuration: { type: String, required: true },
});

// Feedback Model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
