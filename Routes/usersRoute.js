const express = require('express')

console.log('users')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const fileUpload = require('../middleware/fileUpload')
const schema = require('../modules/schema')
const validator = require('../middleware/validator')

// Export controller
const userController = require('../controllers/userControl')

const router = express.Router();

/* Register company schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Users:
 *        type: object
 *        required:
 *          - companyName
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          companyName:
 *            type: string
 *            description: Company name.
 *          email:
 *            type: string
 *            description: Company email address.
 *          password:
 *            type: string
 *            description: Company password.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           companyName: Google
 *           email: mail@gmail.com
 *           password: password
 */

/* Time and Billing rate  schema*/
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Billing:
 *        type: object
 *        required:
 *          - expectedWorkHours
 *          - billRateCharge
 *          - departmentID
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          expectedWorkHours:
 *            type: integer
 *            description: employee working hours.
 *          billRateCharge:
 *            type: integer
 *            description: employee billing rate.
 *          departmentID:
 *            type: integer
 *            description: employee role.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           expectedWorkHours: 6
 *           billRateCharge: 500,000
 *           departmentID: 2
 */


/* Register employee Schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      UsersEmployee:
 *        type: object
 *        required:
 *          - email
 *          - roleID
 *          - expectedWorkHours
 *          - billRateCharge
 *          - StaffRole
 *          - departmentID
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          email:
 *            type: string
 *            description: Employee email.
 *          roleID:
 *            type: integer
 *            description: Employee role.
 *          expectedWorkHours:
 *            type: integer
 *            description: employee working hours.
 *          billRateCharge:
 *            type: integer
 *            description: employee billing rate.
 *          staffRole:
 *            type: string
 *            description: employee role.
 *          departmentID:
 *            type: integer
 *            description: employee role.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           email: grace@gmail.com
 *           roleID: 5
 *           expectedWorkHours: 6
 *           billRateCharge: 500,000
 *           StaffRole: Staff
 *           departmentID: 2
 */

/* Login schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      UsersLogin:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          email:
 *            type: string
 *            description: Company email address.
 *          password:
 *            type: string
 *            description: Company password.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           email: mail@gmail.com
 *           password: password
 */

/* Change Password schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      UsersLogin:
 *        type: object
 *        required:
 *          - newPassword
 *          - confirmedPassword
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          newPassword:
 *            type: string
 *            description: New password.
 *          confirmPassword:
 *            type: string
 *            description: Confirm password.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           newPassword: mypassword
 *           confirmdPassword: mypassword
 */

/*  Department Schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Department:
 *        type: object
 *        required:
 *          - departmentName
 *          - companyID
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          departmentName:
 *            type: string
 *            description: Department Name.
 *          companyID:
 *            type: integer
 *            description: Company ID.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           departmentName: Financial
 *           companyID: 12
 */

// Sign up users company
/**
 * @swagger
 *
 *   /api/users/signUp:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [USERS]
 *     produces:
 *      - application/json
 *     description: Register a company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       '200':
 *          description: You have successfully registered, please login in.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Users'
 */
router.post('/signUp', validator(schema.signUp), userController.signUp);

// Login users 
/**
 * @swagger
 *
 *   /api/users/login:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [USERS]
 *     produces:
 *      - application/json
 *     description: Register a company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersLogin'
 *     responses:
 *       '200':
 *          description: You have successfully registered, please login in.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsersLogin'
 */
router.post('/login', userController.userLogin);

// sign up employees
/**
 * @swagger
 *
 *   /api/users/signUp/companyName/addUser:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [USERS]
 *     produces:
 *      - application/json
 *     description: Register an Employee(permission is restricted to only Admin, co-admin and internal)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersEmployee'
 *     responses:
 *       '200':
 *          description: You have successfully registered, an employee.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsersEmployee'
 */
router.post('/signUp/companyName/addUser', authenticateToken, validator(schema.employeeSignUp), userController.employeeSignUp);

// Employees second stage signup
/**
 * @swagger
 *
 *   /api/users/companyName/confirmation/:token/:id:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [USERS]
 *     produces:
 *      - application/json
 *     description: Register an Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersEmployee'
 *     responses:
 *       '200':
 *          description: Employee has being confirm successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsersEmployee'
 */
router.put('/companyName/confirmation/:token/:id', authenticateToken, validator(schema.changePassword), userController.confirmSignUp);

// Get all users
/**
 * @swagger
 *
 *   /api/users/companyName/employee/:companyID:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Get TODO LIST
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/employee/:companyID', authenticateToken, userController.getAllCompanyStaff)

// Update company details
/**
 * @swagger
 *
 *   /api/users/companyName/companyProfile/updateProfile/:id:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Updating company record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       '201':
 *          description: Company updated successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Company'
 */
router.put('/companyName/companyProfile/updateProfile/:id', authenticateToken, userController.updateCompanyRecord)

// Add a department
/**
 * @swagger
 *
 *   /api/users/signUp/companyName/addUser:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [DEPARTMENT]
 *     produces:
 *      - application/json
 *     description: Add department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       '200':
 *          description: Department Added successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Department'
 */
router.post('/companyName/companyProfile/addDepartment/:id', authenticateToken, userController.addDepartment)

// view department
/**
 * @swagger
 *
 *   /api/users/companyName/companyProfile/department/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [DEPARTMENT]
 *     produces:
 *      - application/json
 *     description: Get department by ID
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/companyProfile/department/:id', authenticateToken, userController.getDepartment)

// // Update user details
// router.put('/companyName/userProfile/updateProfile/:id', authenticateToken, fileUpload.uploadImage.single('image'), userController.updateUserRecord)

// view company profile
/**
 * @swagger
 *
 *   /api/users/companyName/companyProfile/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: View company profile
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/companyProfile/:id', authenticateToken, userController.viewCompanyProfile)

// view personal profile
/**
 * @swagger
 *
 *   /api/users/companyName/userProfile/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [USERS]
 *     produces:
 *      - application/json
 *     description: Views user profile
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/userProfile/:id', authenticateToken, userController.viewProfile)


router.put('/companyName/userProfile/changePassword/:id', authenticateToken, validator(schema.changePassword), userController.changePassword)

// Manage employee time and billing details
/**
 * @swagger
 *
 *   /api/users/companyName/employee/timeAndBilling/:id:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Updating company record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Billing'
 *     responses:
 *       '201':
 *          description: Successful
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Billing'
 */
router.put('/companyName/employee/timeAndBilling/:id', authenticateToken, userController.timeAndBilling)

// reset password
router.post('/companyName/userProfile/forgot-password', userController.resetPassword)
router.put('/companyName/userProfile/passwordReset/:token/:id', authenticateToken, validator(schema.changePassword), userController.setNewPassword)



module.exports = router;