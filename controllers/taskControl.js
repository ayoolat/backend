let taskControl = (app) => {
    let connection = require('../modules/db')
    let notification = require('./notificationControl')
    const authenticateToken = require('../controllers/authentificate/authentification')

    notification(app)

    console.log('Task connected')

    // create task
    app.post('/pace-time-sheet/companyName/createNewTask', authenticateToken, (req, res) => {
        console.log(req.respData)
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and Edit tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`INSERT INTO task
                (taskName, assignedID, documentsAttached, taskStatus, taskDescription, staffID, startDate, endDate)
                VALUES
                ('${req.body.taskName}', '${req.body.assignedID}','${req.body.documentsAttached}',
                '1', '${req.body.taskDescription}', '${req.body.staffID}', 
                '${req.body.startDate}', '${req.body.endDate}')
                `, (err, resp) => {
                    if(err){
                        res.statusCode = 401
                        res.send(err)
                    }
        
                    if(resp){
                        let notified = {
                            'staffID' : req.body.staffID,
                            'heading' : 'New Task',
                            'body' :  req.body.taskName,
                            'status' : 'false'
                        }
                        logNotification(notified, res)
                        if(taskErr){
                            res.statusCode = 401
                            res.send(taskErr)
                        }
        
                        if(resp){
                            res.send('task created')
                        }
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
        if(permit.staffID == req.params.id){
            connection.query(`select* 
            from task where staffID = ${req.params.id}`, (err, resp) => {
                if(err){
                    res.send(err)
                }
                res.send(resp)
            })
        }else{"invalid request"}
    })

    // read user task by status
    app.get('/pace-time-sheet/companyName/:id', authenticateToken, (req, res) => {
        console.log(req)
        connection.query(`select* 
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
    app.get('/pace-time-sheet/companyName/allCompanyTasks', (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'read all company tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`select * from task `, (err, resp) => {
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
    app.get('/pace-time-sheet/companyName/:status/', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'read all company tasks')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`select* from task JOIN status 
                ON status.statusID = task.statusID where taskStatus = ${status}`, (err, resp) => {
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

    // update task
    app.put('/pace-time-sheet/companyName/task/:id', (req, res) => {
        connection.query(`UPDATE task SET taskName = '${req.body.taskName}', assignedID = '${req.body.assignedID}',
        documentsAttached = '${req.body.documentsAttached}', taskDescription = '${req.body.taskDescription}', 
        staffID = '${req.body.staffID}', startDate = '${req.body.startDate}', endDate = '${req.body.endDate}`, 
        (err, resp) => {
            if(err){
                res.status(401).end()
            }
            if(resp){
                res.send("Task updated")
            }
        })
    })

    // update status
    app.put('/pace-time-sheet/companyName/task/:id', (req, res) => {
        connection.query(`UPDATE task SET taskStatus = ${req.body.taskStatus} 
        WHERE staffID = ${req.params.id}`, (err, resp) => {
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