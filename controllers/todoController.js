let connection = require('../modules/db')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const authenticateToken = require('../middleware/authentication')
let todoController = (app) => {

    //Get todo list
    app.get('/todolist', authenticateToken, (req, res) => {
            let mysql = `SELECT  staffID,listName,todolist.lastUpdated, breakdownID, todolistbreakdown.toDoID, description, commentArea, todolistbreakdown.dateCreated 
        FROM todolistbreakdown INNER JOIN todolist ON todolistbreakdown.toDoID = todolist.todoID`
            connection.query(mysql, (err, respond) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    res.send(respond)
                    console.log(respond)
                }
            })
        })
        //Insert into TODO-LIST
    app.post('/todolist', (req, res) => {
            let mysql = `insert into todolist(staffID,listName,lastUpdated)
         values ('${req.body.staffID}','${req.body.listName}','${req.body.lastUpdated}')`
            connection.query(mysql, (err, respond) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    let tokenData = { "data": respond }

                    let token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });

                    let respondData = {
                        "data": respond,
                        "accessToken": token
                    }
                    res.send(respondData)
                    console.log(respondData)
                }
            })
        })
        //Insert into TODO-LIST-BREAK-DOWN
    app.post('/todolistbreakdown', (req, res) => {
            let mysql = `insert into todolistbreakdown(toDoID,  description, commentArea)
         values ('${req.body.toDoID}', '${req.body.description}', '${req.body.commentArea})`
            connection.query(mysql, (err, respond) => {
                if (err) throw err;
                res.send("Breakdown added!")
            })
        })
        // UPDATE TODO LIST
    app.put('/todolist/:id', authenticateToken, (req, res) => {
        let mysql = `UPDATE todolist SET
        listName = '${req.body.listName}', 
        where id = ${req.params.id}`
        connection.query(mysql, (err, respond) => {
            if (err) throw err;
            res.send(`${req.body.listName }` + ' has being updated ' + respond.listName);
        });
    });
    // UPDATE TODO LIST BREAKDOWN
    app.put('/todolistbreakdown/:id', authenticateToken, (req, res) => {
        let mysql = `UPDATE todolist SET , 
        description = '${req.body.listName}',
        commentArea= '${req.body.staffID}' 
        where id = ${req.params.id}`
        connection.query(mysql, (err, respond) => {
            if (err) throw err;
            res.send(`${req.body.title }` + ' has being updated ');
        });
    });
    // DELETE TODO-LIST
    app.delete('/todolistbreakdown/:id', authenticateToken, (req, res) => {
        let mysql = `delete from todolist where id = ${req.params.id}`
        connection.query(mysql, (err, respond) => {
            if (err) throw err;
            res.send("Todo List successfully deleted.");
        });
    });
    app.delete('/todolist', authenticateToken, (req, res) => {
        let mysql = `delete from todolist where id = ${req.params.id}`
        connection.query(mysql, (err, respond) => {
            if (err) throw err;
            res.send("Todo List successfully deleted.");
        });
    });
}
module.exports = todoController