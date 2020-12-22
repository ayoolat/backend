const express = require('express')

console.log('users')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const fileUpload = require('../middleware/fileUpload')

// Export controller
const userController = require('../controllers/userControl')

const router = express.Router();

// Sign up users company
router.post('/signUp', userController.signUp);

// Login users 
router.post('/login', userController.userLogin);

// sign up employees
router.post('/signUp/companyName/addUser', authenticateToken, userController.employeeSignUp);

// Get all users
router.get('/companyName/employee/:companyID',authenticateToken, userController.getAllCompanyStaff)

// Update user details
router.put('/companyName/userProfile/updateProfile/:id', authenticateToken, fileUpload.uploadImage.single('image'), userController.updateUserRecord)

// view personal profile
router.get('/companyName/userProfile/:id',authenticateToken, userController.viewProfile)

// change password
router.put('/companyName/userProfile/changePassword/:id', authenticateToken, userController.changePassword)

// Manage employee time and billing details
router.put('/companyName/employee/timeAndBilling/:id', authenticateToken, userController.timeAndBilling)

// reset password
router.post('/companyName/userProfile/forgot-password', userController.resetPassword)
router.put('/companyName/userProfile/passwordReset/:token/:id', authenticateToken, userController.setNewPassword)

// // Employees second stage signup
// router.put('/companyName/signUp');

// //Change company settings
// router.put('/companyName/settings',authenticateToken, authorize, userController.updateCompanySettings)

module.exports = router;





