const express = require('express')

console.log('tasks')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const schema = require('../modules/schema')
const validator = require('../middleware/validator')

// Export controller
const e_ScheduleController = require('../controllers/e-scheduleController')
const schemas = require('../modules/schema')

const router = express.Router();


/* Event Schedule Schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Schedule:
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


// Add to e-schedule
/**
 * @swagger
 *
 *   /api/E-schedule/newE-schedule:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Add a Schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       '200':
 *          description: Schedule added successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Schedule'
 */
router.post('/newE-schedule', authenticateToken, validator(schema.addE_schedule), e_ScheduleController.newE_schedule);

// get e-schedule
/**
 * @swagger
 *
 *   /api/E-schedule/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Views schedule
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/:id', authenticateToken, e_ScheduleController.getE_schedule);

// Edit e-schedule
/**
 * @swagger
 *
 *   /api/E-schedule/edit/:id/:eventID:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Event schedule update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       '201':
 *          description: Event schedule updated successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Schedule'
 */
router.put('/edit/:id/:eventID', authenticateToken, e_ScheduleController.editE_schedule);

// Delete e-schedule
/**
 * @swagger
 *
 *   /api/E-schedule/companyName/delete/:id/:eventID:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Deleting an Event schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description:  Event id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       '204':
 *          description: Event has being deleted
 *       '404':
 *          description: Schedule not found.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Schedule'
 */
router.delete('/companyName/delete/:id/:eventID', authenticateToken, e_ScheduleController.delete);

module.exports = router