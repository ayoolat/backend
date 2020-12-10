let connection = require('../modules/db')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const authenticateToken = require('../controllers/authentificate/authentification')
let todoController = (app) => {

    app.get('/todo-list', (req, res) => {
        let mysql = `select * from todolist`
        connection.query(mysql, (err, respond) => {
            res.send(respond)
        })
    });
    //Insert todo list
    app.post('/todo-list', (req, res) => {
            let mysql = `SELECT * FROM todolist 
            INNER JOIN todolistbreakdown 
            ON todolist.todoID=todolistbreakdown.toDoID
            WHERE staffID='${req.body.staffID}', 
            listName='${req.body.listName}',
            toDoID='${req.body.toDoID}',
            description='${req.body.description}',
            comment='${req.body.comment}`
            connection.query(mysql, (err, respond) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    res.send(respond)
                    console.log(respond)
                }
            })
        })
        // UPDATE TODO LIST
    app.put('/todo-list/:id', (req, res) => {
        let mysql = `update todolist set title = '${req.body.staffID}', 
        description = '${req.body.listName}', 
        where id = ${req.params.id}`
        connection.query(mysql, (err, resp) => {
            if (err) throw err;
            res.send(`${req.body.title }` + ' has being updated ');
        });
    });
    // DELETE TODO-LIST
    app.delete("/todo-list/:id", function(req, res) {
        let mysql = `delete from todolist where id = ${req.params.id}`
        connection.query(mysql, (err, respond) => {
            if (err) throw err;
            res.send("Todo List successfully deleted.");
        });
    });
}
module.exports = todoController