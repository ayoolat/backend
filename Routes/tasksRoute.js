const express = require('express')

console.log('tasks')

// Export middleWare
const authenticateToken = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

// Export controller
const taskController = require('../controllers/taskControl')
const fileUpload = require('../middleware/fileUpload')

const router = express.Router();


/* Task schema */
/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Task:
 *        type: object
 *        required:
 *          - taskName
 *          - assignedID
 *          - documentsAttached
 *          - taskStatus
 *          - taskDescription
 *          - staffID
 *          - startDate
 *          - endDate
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          taskName:
 *            type: string
 *            description: Name of task.
 *          assignedID:
 *            type: integer
 *            description: Assigned ID
 *          documentsAttached:
 *            type: string
 *            description: Assigned ID
 *          taskStatus:
 *            taskStatus: integer
 *            description: Task status.
 *          taskDescription:
 *            type: string
 *            description: Task description.
 *          staffID:
 *            type: integer
 *            description: Staff ID.
 *          startDate:
 *            type: date
 *            description: Start date for task.
 *          endDate:
 *            type: date
 *            description: employee role.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           taskName:
 *           assignedID:
 *           documentsAttached:
 *           taskStatus:
 *           taskDescription:
 *           staffID:
 *           startDate:
 *           endDate:
 */


// Create new task//
/**
 * @swagger
 *
 *   /api/tasks/companyName/newTask/:id:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Adding a Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *          description: Task added successfully.
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 */
router.post('/companyName/newTask/:id', authenticateToken, authorization.authorize('Add and Edit tasks'), fileUpload.fileUpload.single('documentsAttached'), taskController.newTask);

// search Task
router.post('/companyName/search/:id', authenticateToken, taskController.searchTask);

// select Task
router.post('/companyName/select/:id', authenticateToken, taskController.searchTask);

// get all user tasks//
/**
 * @swagger
 *
 *   /api/tasks/companyName/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: View task by id
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/:id', authenticateToken, taskController.getTasks);

// get all assigned tasks
/**
 * @swagger
 *
 *   /api/tasks/companyName/assignedTasks/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: View assigned task
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/assignedTasks/:id', authenticateToken, taskController.getAssignedTasks);

// get all user tasks by status
/**
 * @swagger
 *
 *   /api/tasks/companyName/status/:id/:status:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Status
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/status/:id/:status', authenticateToken, taskController.getTasksByStatus);

// get all company tasks 
/**
 * @swagger
 *
 *   /api/tasks/companyName/allTasks/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: View all task by id
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/allTasks/:id', authenticateToken, authorization.authorize('Add and Edit tasks'), taskController.getCompanyTasks);

// get all company tasks by status
/**
 * @swagger
 *
 *   /api/tasks/companyName/allTasks/:status/:id:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: All task status
 *     responses:
 *       '200':
 *          description: successful
 */
router.get('/companyName/allTasks/:status/:id', authenticateToken, authorization.authorize('Add and Edit tasks'), taskController.getCompanyTasksByStatus);

// update company tasks //
/**
 * @swagger
 *
 *   /api/tasks/companyName/editTask/:id:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Updating a Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *          description: Successful
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 */
router.put('/companyName/editTask/:id', authenticateToken, authorization.authorize('Add and Edit tasks'), fileUpload.fileUpload.single('documentsAttached'), taskController.editTask);

// Update task status //
/**
 * @swagger
 *
 *   /api/tasks/companyName/editTaskStatus/:id:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Updating a Task status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *          description: Successful
 *       '400':
 *          description: There has been an error, please try again. 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 */
router.put('/companyName/editTaskStatus/:id', authenticateToken, taskController.editTaskStatus);

// Delete Tasks
/**
 * @swagger
 *
 *   /api/tasks/companyName/deleteTask/:id:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [COMPANY]
 *     produces:
 *      - application/json
 *     description: Deleting a Task
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '204':
 *          description: Task has being deleted
 *       '404':
 *          description: Task not found.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 */
router.delete('/companyName/deleteTask/:id', authenticateToken, authorization.authorize('Add and Edit tasks'), taskController.deleteTask);

module.exports = router;