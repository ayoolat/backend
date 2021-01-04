const express = require('express')

console.log('tasks')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const e_ScheduleController = require('../controllers/e-scheduleController')

const router = express.Router();

// Add to e-schedule
router.post('/newE-schedule', authenticateToken, e_ScheduleController.newE_schedule);

// get e-schedule
router.get('/:id', authenticateToken, e_ScheduleController.getE_schedule);

// Edit e-schedule
router.put('/edit/:id', authenticateToken, e_ScheduleController.editE_schedule);

// Edit e-schedule
router.delete('/delete/:id', authenticateToken, e_ScheduleController.delete);

module.exports = router
