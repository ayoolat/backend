let connection = require('../modules/db')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const auditManager = require("../middleware/auditTrail")

//Get todo list
exports.getTodolist = (req, res) => {
        const authenticationHeader = req.headers['authorization']
        const Token = authenticationHeader && authenticationHeader.split(' ')[1]

        if (Token == null) return res.status(401).send('invalid request')

        jwt.verify(Token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
            if (err) return res.send('invalid token or token expired')

            staffID = data.response[0].staffID;
            if (staffID == undefined) { staffID = req.params.staffID }
            if (staffID == undefined) { return res.status(404).send('No staff ID') }
            let mysql = `SELECT * FROM todolist WHERE staffID = ${staffID}`
            connection.query(mysql, (err, respond) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    res.json({
                        status: 'success',
                        data: req.body
                    })
                }
            })
        })
    }
    //Insert into TODO-LIST
exports.insertTodolist = (req, res) => {
    const authenticationHeader = req.headers['authorization']
    const Token = authenticationHeader && authenticationHeader.split(' ')[1]

    if (Token == null) return res.status(401).send('invalid request')

    jwt.verify(Token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
        if (err) return res.send('invalid token or token expired')

        staffID = data.response[0].staffID;
        if (staffID == undefined) { return res.status(404).send('No staff ID') }
        let mysql = `insert into todolist(staffID,listName,dueDate,status)
         values ('${staffID}','${req.body.listName}','${req.body.lastUpdated}','${req.body.status}')`
        connection.query(mysql, (err, respond) => {
            if (err) {
                trail = {
                    actor: "anonymous",
                    action: `anonymous user ${req.body.email} attempt to add a todo but failed`,
                    type: "danger"
                }
                auditManager.logTrail(trail)
                res.status(400).send(err)
            } else {
                res.json({
                    status: 'success',
                    data: req.body
                })
                trail = {
                    actor: `Staff ID ${staffID}`,
                    action: `Staff ID ${staffID} successfully added a todolist `,
                    type: "success"
                }
                auditManager.logTrail(trail)
            }
        })
    })

}

//Insert into TODO-LIST-BREAK-DOWN
/* exports.insertBreakdown = (req, res) => {
        let mysql = `insert into todolistbreakdown(toDoID,  description, commentArea)
         values ('${req.body.toDoID}', '${req.body.description}', '${req.body.commentArea}')`
        connection.query(mysql, (err, respond) => {
            if (err) {
                trail = {
                    actor: "anonymous",
                    action: `anonymous user ${req.body.email} attempt to add a todo-breakdown but failed`,
                    type: "danger"
                }
                auditManager.logTrail(trail)
                res.status(400).send(err)
            } else {
                res.send("Breakdown added!")
                trail = {
                    actor: `${req.body.email}`,
                    action: `${req.body.email} successfully added a todolist-breakdown `,
                    type: "success"
                }
                auditManager.logTrail(trail)
            }
        })
    } */
// UPDATE TODO LIST
exports.updateTodolist = (req, res) => {
    let mysql = `UPDATE todolist SET
        listName = '${req.body.listName}', 
        where id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) {
            trail = {
                actor: "anonymous",
                action: `anonymous user ${req.body.email} attempt to update a todo but failed`,
                type: "danger"
            }
            auditManager.logTrail(trail)
            res.status(400).send(err)
        } else {
            res.send(`${req.body.listName}` + ' has being updated ' + respond.listName)
            trail = {
                actor: `${req.body.email}`,
                action: `${req.body.email} successfully updated a todolist `,
                type: "success"
            }
            auditManager.logTrail(trail)
        }
    });
};
// UPDATE TODO LIST BREAKDOWN
/* exports.updateBreakdown = (req, res) => {
    let mysql = `UPDATE todolist SET , 
        description = '${req.body.listName}',
        commentArea= '${req.body.staffID}' 
        where id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) {
            trail = {
                actor: "anonymous",
                action: `anonymous user ${req.body.email} attempt to update a todolist-breakdown but failed`,
                type: "danger"
            }
            auditManager.logTrail(trail)
            res.status(400).send(err)
        } else {
            res.send(`${req.body.title}` + ' has being updated ')
            trail = {
                actor: `${req.body.email}`,
                action: `${req.body.email} successfully updated a todolist-breakdown `,
                type: "success"
            }
            auditManager.logTrail(trail)
        }
    });
}; */
//Delete TODO-LIST
exports.deleteTodolist = (req, res) => {
    let mysql = `DELETE FROM todolist WHERE id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) {
            trail = {
                actor: "anonymous",
                action: `anonymous user ${req.body.email} attempt to delete a todolist but failed`,
                type: "danger"
            }
            auditManager.logTrail(trail)
            res.status(400).send(err)
        } else {
            res.send("Todo List successfully deleted.");
            trail = {
                actor: `${req.body.email}`,
                action: `${req.body.email} successfully delete a todolist `,
                type: "success"
            }
            auditManager.logTrail(trail)
        }
    });
};


// DELETE TODO-LIST-BREAKDOWN
/* exports.deleteBreakdown = (req, res) => {
    let mysql = `DELETE FROM todolistbreakdown WHERE id = ${req.params.id}`
    connection.query(mysql, (err, respond) => {
        if (err) {
            trail = {
                actor: "anonymous",
                action: `anonymous user ${req.body.email} attempt to delete a todolist-breakdown but failed`,
                type: "danger"
            }
            auditManager.logTrail(trail)
            res.status(400).send(err)
        } else {
            res.send("Todo List successfully deleted.");
            trail = {
                actor: `${req.body.email}`,
                action: `${req.body.email} successfully delete a todolist-list `,
                type: "success"
            }
            auditManager.logTrail(trail)
        }
    });
}; */