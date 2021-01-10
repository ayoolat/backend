const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const calendarController = require('../controllers/calenderController')

const router = express.Router();

// Add to Calendar
router.post('/companyName/new', authenticateToken, calendarController.NewEvent);

// get events
router.get('/companyName/:id', authenticateToken, calendarController.getEvents);

// Edit e-schedule
router.put('/companyName/edit/:id/:eventID', authenticateToken, calendarController.editEvent);

// Edit e-schedule
router.delete('/companyName/delete/:id/:eventID', authenticateToken, calendarController.deleteEVent)

module.exports = router

