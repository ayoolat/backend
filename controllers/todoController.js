let connection = require('../modules/db')
require('dotenv').config()
const jwt = require("jsonwebtoken")
    //Get todo list
exports.getTodolist = (req, res) => {
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
}

//Insert into TODO-LIST
exports.insertTodolist = (req, res) => {
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
    }
    //Insert into TODO-LIST-BREAK-DOWN
exports.insertBreakdown = (req, res) => {
        let mysql = `insert into todolistbreakdown(toDoID,  description, commentArea)
         values ('${req.body.toDoID}', '${req.body.description}', '${req.body.commentArea})`
        connection.query(mysql, (err, respond) => {
            if (err) throw err;
            res.send("Breakdown added!")
        })
    }
    // UPDATE TODO LIST
exports.updateTodolist = (req, res) => {
    let mysql = `UPDATE todolist SET
        listName = '${req.body.listName}', 
        where id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) throw err;
        res.send(`${req.body.listName }` + ' has being updated ' + respond.listName);
    });
};
// UPDATE TODO LIST BREAKDOWN
exports.updateBreakdown = (req, res) => {
    let mysql = `UPDATE todolist SET , 
        description = '${req.body.listName}',
        commentArea= '${req.body.staffID}' 
        where id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) throw err;
        res.send(`${req.body.title }` + ' has being updated ');
    });
};
//Delete TODO-LIST
exports.deleteTodolist = (req, res) => {
    let mysql = `DELETE FROM todolist WHERE id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) throw err;
        res.send("Todo List successfully deleted.");
    });
};

// DELETE TODO-LIST-BREAKDOWN
exports.deleteBreakdown = (req, res) => {
    let mysql = `DELETE FROM todolistbreakdown WHERE id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) throw err;
        res.send("Todo List successfully deleted.");
    });
};