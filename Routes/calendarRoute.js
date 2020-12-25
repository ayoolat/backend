const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const calendarController = require('../controllers/calenderController')

const router = express.Router();

// Add to Calendar
router.post('/newE-schedule', authenticateToken, calendarController.NewEvent);

// get events
router.get('/', authenticateToken, e_ScheduleController.getEvents);

// Edit e-schedule
router.put('/edit', authenticateToken, e_ScheduleController.editEvent);

// Edit e-schedule
router.delete('/delete', authenticateToken, e_ScheduleController.deleteEVent);