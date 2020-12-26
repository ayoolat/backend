const express = require('express')
    // Export controller
const feedbackController = require('../controllers/feedback')

const router = express.Router();


// SENDING FEEDBACK
router.post('/feedback', feedbackController.postFeedback)

// CONTACT-US 
router.post('/contact', feedbackController.postContact)