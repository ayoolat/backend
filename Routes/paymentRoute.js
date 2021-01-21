const express = require('express')

// Export middleWare
// const authenticateToken = require('../middleware/authentication')
// const authorize = require('../middleware/authorization')
// const imageUpload = require('../middleware/fileUpload')

// export controller
const paymentController = require('../controllers/paymentController')

const router = express.Router();

/* Payment Schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Payment:
 *        type: object
 *        required:
 *          - name
 *          - phone
 *          - email
 *          - companyID
 *          - planID
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the todolist.
 *          phone:
 *            type: string
 *            description: Phone number
 *          email:
 *            type: string
 *            description: The company email.
 *          companyID:
 *            type: integer
 *            description: id for company
 *          planID:
 *            type: integer
 *            description: id for company
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           name: Company
 *           email: company@gmail.com
 *           companyID: 3
 *           planID: 111
 */

// Get  notifications

/**
 * @swagger
 *
 *   /api/payment/payment/:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [PAYMENT]
 *     produces:
 *      - application/json
 *     description: Inserting Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       '200':
 *          description: Payment successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Payment'
 */
router.post('/payment/', paymentController.initiatePayment);

/**
 * @swagger
 *
 *   /api/payment/verify-payment/:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [PAYMENT]
 *     produces:
 *      - application/json
 *     description: Payment
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/verify-payment/', paymentController.verifyPayment);



module.exports = router;