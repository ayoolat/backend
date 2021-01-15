const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

// Export controller
const managePermissionsController = require('../controllers/managePermissionsController')

const router = express.Router();

// Add employee permission
router.put('/companyName/addPermission/:id/:staffID', authenticateToken, authorization.authorize('Manage permissions'), managePermissionsController.addPermission);

// get user permission
router.get('/companyName/:id', authenticateToken, managePermissionsController.getUserPermissions);

// get all company permission
router.get('/companyName/all-users/:id', authenticateToken, authorization.authorize('Manage permissions'), managePermissionsController.getAllPermissions);

module.exports = router