const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const taskSheetController = require('../controllers/taskSheetController')

const router = express.Router();

// Add company task-sheet
router.get('/companyName/:id', authenticateToken, taskSheetController.taskSheetCompany);

// Add department task-sheet
router.get('/companyName/departments/:id/:departmentID', authenticateToken, taskSheetController.taskSheetDepartment);

// filter by month Company
router.get('/companyName/filter-Month/', authenticateToken, taskSheetController.taskSheetFilterCompany);

// filter by month Company
router.get('/companyName/filter-Month/', authenticateToken, taskSheetController.taskSheetFilterDepartment);

module.exports = router