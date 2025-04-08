const Feedback = require('../models/feedback');

// POST new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      message,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET all feedback (for admin/review purposes - you might want to protect this route)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ submittedDate: -1 }); // Sort by most recent
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET feedback by ID (if needed)
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// You might add functionality to delete feedback if needed