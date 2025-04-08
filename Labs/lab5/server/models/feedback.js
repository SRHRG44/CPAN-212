const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  submittedDate: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema, 'feedback'); // Collection name 'feedback'

module.exports = Feedback;