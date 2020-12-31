const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const taskSheetController = require('../controllers/taskSheetController')

const router = express.Router();

// Add employee permission
router.post('/', taskSheetController.taskSheetCompany);


module.exports = router;
