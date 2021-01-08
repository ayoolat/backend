const express = require('express')
    // Export controller
const feedbackController = require('../controllers/contact')

const router = express.Router();

// CONTACT-US 
router.post('/contact', feedbackController.postContact)

module.exports = router;
