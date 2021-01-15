const express = require('express')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

// Export controller
const calendarController = require('../controllers/calenderController')

const router = express.Router();


/* Calender Schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Calender:
 *        type: object
 *        required:
 *          - eventName
 *          - eventDateAndTime
 *          - staffID
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the Event.
 *          eventName:
 *            type: integer
 *            description: Event name.
 *          eventDateAndTime:
 *            type: dateTime
 *            description: Date and time for event.
 *          staffID:
 *            type: integer
 *            description: Staff ID.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 */


// Add to Calendar
/**
 * @swagger
 *
 *   /api/calendar/companyName/new:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Add calender
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calender'
 *     responses:
 *       '200':
 *          description: Calender added successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Calender'
 */
router.post('/companyName/new', authenticateToken, authorization.authorize('Add and edit Company calendar'), calendarController.NewEvent);

// get events
/**
 * @swagger
 *
 *   /api/calendar/companyName/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Views calender
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/:id', authenticateToken, calendarController.getEvents);

// Edit e-schedule
/**
 * @swagger
 *
 *   /api/calendar/companyName/edit/:id/:eventID:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Calender update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calender'
 *     responses:
 *       '201':
 *          description: Calender updated successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Calender'
 */
router.put('/companyName/edit/:id/:eventID', authenticateToken, authorization.authorize('Add and edit Company calendar'), calendarController.editEvent);

// Delete calender
/**
 * @swagger
 *
 *   /api/calendar/companyName/delete/:id/:eventID:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Deleting a calender
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description:  calender id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calender'
 *     responses:
 *       '204':
 *          description: Calender has being deleted
 *       '404':
 *          description: Calender not found.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Calender'
 */
router.delete('/companyName/delete/:id/:eventID', authenticateToken, authorization.authorize('Add and edit Company calendar'), calendarController.deleteEVent)

module.exports = router