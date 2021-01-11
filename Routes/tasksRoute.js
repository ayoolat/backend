const express = require('express')

console.log('tasks')

// Export middleWare
const authenticateToken = require('../middleware/authentication')

// Export controller
const taskController = require('../controllers/taskControl')
const fileUpload = require('../middleware/fileUpload')

const router = express.Router();

// Create new task//
router.post('/companyName/newTask/:id', authenticateToken, fileUpload.fileUpload.single('documentsAttached'), taskController.newTask);

// search Task
router.post('/companyName/search/:id', authenticateToken, taskController.searchTask);

// select Task
router.post('/companyName/select/:id', authenticateToken, taskController.searchTask);

// get all user tasks//
router.get('/companyName/:id', authenticateToken, taskController.getTasks);

// get all assigned tasks
router.get('/companyName/assignedTasks/:id', authenticateToken, taskController.getAssignedTasks);

// get all user tasks by status
router.get('/companyName/status/:id/:status', authenticateToken, taskController.getTasksByStatus);

// get all company tasks 
router.get('/companyName/allTasks/:id', authenticateToken, taskController.getCompanyTasks);

// get all company tasks by status
router.get('/companyName/allTasks/:status/:id', authenticateToken, taskController.getCompanyTasksByStatus);

// update company tasks //
router.put('/companyName/editTask/:id/', authenticateToken, fileUpload.fileUpload.single('documentsAttached'), taskController.editTask);

// Update task status //
router.put('/companyName/editTaskStatus/:id', authenticateToken, taskController.editTaskStatus);

// Delete Tasks 
router.delete('/companyName/deleteTask/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
