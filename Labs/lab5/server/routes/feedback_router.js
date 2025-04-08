const express = require('express');
const router = express.Router();
const feedbackController = require('../Controllers/feedback_controller');

// POST submit new feedback
router.post('/feedback', feedbackController.submitFeedback);

// GET all feedback (for admin - consider security)
router.get('/feedback', feedbackController.getAllFeedback);

// GET feedback by ID (optional)
router.get('/feedback/:id', feedbackController.getFeedbackById);

module.exports = router;