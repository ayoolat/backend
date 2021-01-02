const express = require('express')
    // Export middleWare
    // const authenticateToken = require('../middleware/authentication')

// Export controller
const todoController = require('../controllers/todoController')

const router = express.Router();


//Get todo list
router.get('/todolist', todoController.getTodolist)

//Insert into TODO-LIST
router.post('/todolist', todoController.insertTodolist)

//Insert into TODO-LIST-BREAK-DOWN
router.post('/todolistbreakdown', todoController.insertBreakdown)

// UPDATE TODO LIST
router.put('/todolist/:id', todoController.updateTodolist)

// UPDATE TODO LIST BREAKDOWN
router.put('/todolistbreakdown/:id', todoController.updateBreakdown)

//Delete TODO-LIST
router.delete('/todolist', todoController.deleteTodolist)

// DELETE TODO-LIST
router.delete('/todolistbreakdown/:id', todoController.deleteBreakdown)

module.exports = router
