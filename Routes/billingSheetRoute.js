const express = require('express')
const authenticateToken = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const router = express.Router();

const billingSheetController = require('../controllers/billingSheetController')

// get user billingSheet
router.post('companyName/:id', authenticateToken, billingSheetController.userBillingSheet);

// get user company billingSheet
router.post('CompanyName/company/:id', authorization.authorize('View company timesheet and billing report'), authenticateToken, billingSheetController.companyBillingSheet);

// get user company billingSheet
router.post('CompanyName/department/:id', authorization.authorize('View company timesheet and billing report'), authenticateToken, billingSheetController.departmentBillingSheet);

module.exports = router