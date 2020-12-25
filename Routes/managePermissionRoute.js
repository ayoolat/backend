const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const managePermissionsController = require('../controllers/managePermissionsController')

const router = express.Router();

// Add employee permission
router.post('/addPermission', authenticateToken, managePermissionsController.addPermission);

// get user permission
router.get('/addPermission', authenticateToken, managePermissionsController.getUserPermissions);

// get all company permission
router.get('/addPermission', authenticateToken, managePermissionsController.getAllPermissions);