const express = require('express')
    // Export controller
const contactController = require('../controllers/contact')

const router = express.Router();

/*  Contact SCHEMA */

/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Contact:
 *        type: object
 *        required:
 *          - contactName
 *          - contactEmail
 *          - message
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the contact.
 *          contactName:
 *            type: string
 *            description: Contact name.
 *          contactEmail:
 *            type: string
 *            description: Contact email address.
 *          message:
 *            type: string
 *            description: Message section.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           contactName: Johnson Peters
 *           contactEmail: jpeters@gmail.com
 *           message: I love your software, can we do business together
 */

// CONTACT-US 

/**
 * @swagger
 *
 *   /api/contact-us/contact:
 *   post:
 *     tags: [CONTACT]
 *     produces:
 *      - application/json
 *     description: Contact information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '200':
 *          description: Thank you! We will get back to you
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Contact'
 */
router.post('/contact', contactController.postContact)
module.exports = router