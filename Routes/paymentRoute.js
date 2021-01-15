const express = require('express')

// Export middleWare
// const authenticateToken = require('../middleware/authentication')
// const authorize = require('../middleware/authorization')
// const imageUpload = require('../middleware/fileUpload')

// export controller
const paymentController = require('../controllers/paymentController')

const router = express.Router();

// Get  notifications
router.post('/payment/', paymentController.initiatePayment);
router.get('/verify-payment/', paymentController.verifyPayment);



module.exports = router;
