const express = require('express')

console.log('tasks')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const schema = require('../modules/schema')
const validator = require('../middleware/validator')

// Export controller
const e_ScheduleController = require('../controllers/e-scheduleController')
const schemas = require('../modules/schema')

const router = express.Router();

// Add to e-schedule
router.post('/newE-schedule', authenticateToken, validator(schema.addE_schedule), e_ScheduleController.newE_schedule);

// get e-schedule
router.get('/:id', authenticateToken, e_ScheduleController.getE_schedule);

// Edit e-schedule
router.put('/edit/:id/:eventID', authenticateToken, e_ScheduleController.editE_schedule);

// Edit e-schedule
router.delete('/delete/:id/:eventID', authenticateToken, e_ScheduleController.delete);

module.exports = router
