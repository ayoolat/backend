const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


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
router.get('/companyName/company/:id', authenticateToken, authorization.authorize('View company timesheet and billing report'), timeSheetSheetController.getAllStaffTimeSheet);

// user time-sheet
router.get('companyName/:id', authenticateToken, authorization.authorize('View company timesheet and billing report'), timeSheetSheetController.getAllDepartmentTimeSheet);

module.exports = router