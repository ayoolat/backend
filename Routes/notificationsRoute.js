const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const authorize = require('../middleware/authorization')
const imageUpload = require('../middleware/fileUpload')

// export controller
const notificationController = require('../controllers/notificationControl')

const router = express.Router();

// Get  notifications
router.post('/', notificationController.getNotifications);



module.exports = router;
