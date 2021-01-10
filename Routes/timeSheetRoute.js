const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const timeSheetSheetController = require('../controllers/timesheetController')

const router = express.Router();

// add new date
router.post('/companyName/newDay',timeSheetSheetController.IncludeDateAndTime);

// start time
router.put('/companyName/start-time/:id', authenticateToken,timeSheetSheetController.startTime);

// stop time
router.put('/companyName/stop-time/:id', authenticateToken,timeSheetSheetController.stopTime);

// user time-sheet
router.get('/companyName/:id', authenticateToken,timeSheetSheetController.getUserTimeSheet);

// user company  time-sheet
router.get('/companyName/company/:id', authenticateToken,timeSheetSheetController.getAllStaffTimeSheet);

// user time-sheet
router.get('companyName/:id', authenticateToken,timeSheetSheetController.getAllDepartmentTimeSheet);

module.exports = router