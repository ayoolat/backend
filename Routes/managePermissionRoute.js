const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const managePermissionsController = require('../controllers/managePermissionsController')

const router = express.Router();

// Add employee permission
router.post('/addPermission/:id/:permitID', authenticateToken, managePermissionsController.addPermission);

// get user permission
router.get('/:id', authenticateToken, managePermissionsController.getUserPermissions);

// get all company permission
router.get('/:companyID', authenticateToken, managePermissionsController.getAllPermissions);

module.exports = router
