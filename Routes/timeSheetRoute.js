const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const timeSheetSheetController = require('../controllers/timesheetController')

const router = express.Router();

// add new date
router.post('/newDay',timeSheetSheetController.IncludeDateAndTime);

// start time
router.put('/start-time/:id', authenticateToken,timeSheetSheetController.startTime);

// stop time
router.put('/stop-time/:id', authenticateToken,timeSheetSheetController.stopTime);

// user time-sheet
router.get('/time-sheet/:id', authenticateToken,timeSheetSheetController.getUserTimeSheet);

// user company  time-sheet
router.get('/time-sheet/company/:id', authenticateToken,timeSheetSheetController.getAllStaffTimeSheet);

// user time-sheet
router.get('/time-sheet/:id', authenticateToken,timeSheetSheetController.getAllDepartmentTimeSheet);

module.exports = router