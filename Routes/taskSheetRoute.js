const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const taskSheetController = require('../controllers/taskSheetController')

const router = express.Router();

// Add company task-sheet
router.get('/', authenticateToken,taskSheetController.taskSheetCompany);

// Add department task-sheet
router.get('/departments', authenticateToken,taskSheetController.taskSheetDepartment);

// filter by month
router.get('/departments', authenticateToken,taskSheetController.taskSheetFilter);

module.exports = router

