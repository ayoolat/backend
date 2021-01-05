const express = require('express')

console.log('tasks')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const taskController = require('../controllers/taskControl')
const fileUpload = require('../middleware/fileUpload')

const router = express.Router();

// Create new task
router.post('/newTask', authenticateToken, fileUpload.fileUpload.single('documentsAttached'), taskController.newTask);

// get all user tasks
router.get('/:id', authenticateToken, taskController.getTasks);

// get all user tasks by status
router.get('/status/:id/:status', authenticateToken, taskController.getTasksByStatus);

// get all company tasks 
router.get('/allTasks/:id', authenticateToken, taskController.getCompanyTasks);

// get all company tasks by status
router.get('/allTasks/:status/:id', authenticateToken, taskController.getCompanyTasksByStatus);

// update company tasks 
router.put('/editTask/:id', authenticateToken, fileUpload.fileUpload.single('documentsAttached'), taskController.editTask);

// Update task status 
router.put('/editTaskStatus/:id', authenticateToken, taskController.editTaskStatus);

// Delete Tasks 
router.delete('/deleteTask/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
