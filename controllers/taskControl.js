let taskControl = (app) => {
    let connection = require('../modules/db')
    let notification = require('./notificationControl')
    const authenticateToken = require('../middleware/authentication')

    notification(app)

    console.log('Task connected')

    // create task
    app.post('/pace-time-sheet/companyName/createNewTask', authenticateToken, (req, res) => {
        // console.log(req.respData.data)
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and Edit tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`INSERT INTO task
                (taskName, assignedID, documentsAttached, taskStatus, taskDescription, staffID, startDate, endDate)
                VALUES ('${req.body.taskName}', '${req.body.assignedID}','${req.body.documentsAttached}',
                '1', '${req.body.taskDescription}', '${permitDetails.staffID}', 
                '${req.body.startDate}', '${req.body.endDate}')
                `, (err, resp) => {
                    if(err){
                        res.statusCode = 401
                        res.send(err)
                    }
        
                    if(resp){
                        let notified = {
                            'staffID' : permitDetails.assignedID,
                            'heading' : 'New Task',
                            'body' :  req.body.taskName,
                            'status' : 'false'
                        }
                        logNotification(notified, res)
                        res.send('task created')
                    }
                })
            }else{
                res.send('You do not have permission to edit details')
            }
        }else{
            return res.send('You do not have permission to edit details')
        }
    })

    // read task by ID
    app.get('/pace-time-sheet/companyName/allTask/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and Edit tasks')
        console.log(permitDetails.staffID)
        if(permitDetails.staffID == req.params.id){
            connection.query(`select* 
            from task where assignedID = ${req.params.id}`, (err, resp) => {
                if(err){
                    res.send(err)
                }
                if(resp){
                    res.send(resp)
                }
            })
        }else{res.send("invalid request")}
    })

    // read user task by status
    app.get('/pace-time-sheet/companyName/:id', authenticateToken, (req, res) => {
        console.log(req)
        connection.query(`select s.taskStatus 
        from task t
        JOIN status s
        ON s.statusID = t.taskStatus WHERE t.assignedID = ${req.params.id}`, (err, resp) => {
            if(err){
                res.send(err)
            }
            res.send(resp)
        })
    })

    // read all company tasks
    app.get('/pace-time-sheet/companyName/allCompanyTasks/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'read all company tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`select t.taskName, t.assignedID, t.documentsAttached, t.taskStatus, t.taskDescription, t.startDate, t.endDate, t.dateCreated 
                from task t JOIN staff s ON t.staffID = s.staffID 
                WHERE companyID = ${req.params.id} `, (err, resp) => {
                if(err){
                    res.send(err)
                }
                res.send(resp)
            })
            }else{
                res.send('You do not have permission to view all company employees')
            }
        } 
    })

    // read all company tasks by status
    app.get('/pace-time-sheet/companyName/:status/:companyID', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'read all company tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`select * from task t JOIN status s
                ON s.statusID = t.taskStatus 
                JOIN staff st ON st.staffID = t.staffID
                where st.companyID = ${req.params.companyID} AND s.taskStatus = ${req.params.status}`, (err, resp) => {
                if(err){
                    res.send(err)
                }
            })
            }else{
                res.send('You do not have permission to view all company employees')
            }
        } 
    })

    // update task
    app.put('/pace-time-sheet/companyName/task/:id/:taskID', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and Edit tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
               if(permitDetails.staffID == req.params.id){
                    connection.query(`UPDATE task SET taskName = '${req.body.taskName}', assignedID = '${req.body.assignedID}',
                    documentsAttached = '${req.body.documentsAttached}', taskDescription = '${req.body.taskDescription}', 
                    startDate = '${req.body.startDate}', endDate = '${req.body.endDate}' WHERE taskID = ${req.params.taskID}`, 
                    (err, resp) => {
                        if(err){
                            return res.send(err)
                        }
                        if(resp){
                           return res.send("Task updated")
                        }
                    })
                }else{res.send('There has been an error')}
            }else{
                res.send('You do not have permission to view all company employees')
            }
        }  
    })

    // update status
    app.put('/pace-time-sheet/companyName/taskStatus/:id/:taskID', (req, res) => {
        connection.query(`UPDATE task SET taskStatus = ${req.body.taskStatus} 
        WHERE assignedID = ${req.params.id} and taskId = ${req.params.taskID}`, (err, resp) => {
            if(err){
                res.status(401).end()
            }
            if(resp){
                res.send("status updated")
            }
        })
    })
    // Delete task
}

module.exports = taskControl