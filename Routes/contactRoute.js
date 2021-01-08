const express = require('express')
    // Export controller
const contactController = require('../controllers/contact')

const router = express.Router();

// CONTACT-US 
router.post('/contact', contactController.postContact)
module.exports = router