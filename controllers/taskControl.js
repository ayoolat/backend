let connection = require('../modules/db')
console.log('tasks')

const notificationControl = require('./notificationControl')

exports.newTask = (req, res, next) => {
    const {taskName, assignedID, taskDescription, startDate, endDate} = req.body
    const {id} = req.params
    if(!req.file){
        connection.query(`INSERT INTO task
        (taskName, assignedID, taskStatus, taskDescription, staffID, startDate, endDate)
        VALUES ('${taskName}', '${assignedID}','1', '${taskDescription}', '${id}', '${startDate}', '${endDate}')
        `, (err, resp) => {
            // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            if(err) return res.send(err)
            if(resp){
                let notified = {
                    'staffID' : assignedID,
                    'heading' : 'New Task',
                    'body' : taskName,
                    'status' : 'false'
                }
                notificationControl.logNotification(notified, res)
            }
        })
    }else{
        const documentsAttached = req.file.path.replace("/\\/g", "//")
        connection.query(`INSERT INTO task
        (taskName, assignedID, taskStatus, taskDescription, documentsAttached, staffID, startDate, endDate)
        VALUES ('${taskName}', '${assignedID}','1', '${taskDescription}', '${documentsAttached}', '${id}', '${startDate}', '${endDate}')
        `, (err, resp) => {
            // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            if(err) return res.send(err)
            if(resp){
                let notified = {
                    'staffID' : assignedID,
                    'heading' : 'New Task',
                    'body' : taskName,
                    'status' : 'false'
                }
                notificationControl.logNotification(notified, res)
            }
        })
        
    }
    
    
}

// search company staff
exports.searchTask = (req, res, next) => {
    const {id} = req.params
    const {search} = req.body
    connection.query(`select taskName from staff s
    JOIN company c ON c.companyID = c.companyID
    JOIN task t ON s.staffID = t.staffID WHERE taskName LIKE '%${search}%' AND `, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

exports.selectTask = (req, res, next) => {
    const {staffID, assignedID} = req.respData.response[0]
    const {id} = req.params

    if(staffID == id || assignedID == id){
        connection.query(`select * from task where taskID = ${id}`, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }
}

// read user task by ID
exports.getAssignedTasks =(req, res, next) => {
    const {id} = req.params
    connection.query(`select * from task where staffID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
    
}

// read user task by ID
exports.getTasks =(req, res, next) => {
    const {id} = req.params
    connection.query(`select * from task where assignedID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

// read user task by status
exports.getTasksByStatus = (req, res, next) => {
    const {id, status} = req.params
    connection.query(`select * FROM task t LEFT JOIN status s
    ON s.statusID = t.taskStatus WHERE t.assignedID = ${id} AND t.taskStatus = ${status}`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err){res.send(err)}
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

exports.getCompanyTasks = (req, res, next) => {
    const {id} = req.params

    connection.query(`select t.taskName, t.assignedID, t.documentsAttached, t.taskStatus, t.taskDescription, t.startDate, t.endDate, t.dateCreated 
    from task t JOIN staff s ON t.staffID = s.staffID 
    WHERE companyID = ${id} `, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })  
}

// read all company tasks by status
exports.getCompanyTasksByStatus = (req, res, next) => {
    const {id, status} = req.params

    connection.query(`select t.taskName, t.assignedID, t.documentsAttached, t.taskStatus, t.taskDescription, t.startDate, t.endDate, t.dateCreated 
    from task t JOIN status s ON s.statusID = t.taskStatus LEFT JOIN staff st ON st.staffID = t.staffID
    where st.companyID = ${id} AND t.taskStatus = ${status}`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err){res.send(err)}
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

// Update tasks
exports.editTask = (req, res, next) => {
    const {id} = req.params
    const {taskName, assignedID, taskDescription, startDate, endDate, taskID} = req.body

    const documentsAttached = req.file.path.replace("/\\/g", "//")

    if(!req.file){
        connection.query(`UPDATE task SET taskName = '${taskName}', assignedID = '${assignedID}', taskDescription = '${taskDescription}', 
        startDate = '${startDate}', endDate = '${endDate}', lastUpdated = NOW() WHERE taskId = ${taskID} AND staffID = ${id}`, 
        (err, resp) => {
            // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            if(err){res.send(err)}
            if(resp){
                let notified = {
                    'staffID' : assignedID,
                    'heading' : 'Your task has been edited',
                    'body' : taskName,
                    'status' : 'false'
                }
                notificationControl.logNotification(notified, res)
            }
        })
    }else{
        connection.query(`UPDATE task SET taskName = '${taskName}', assignedID = '${assignedID}', taskDescription = '${taskDescription}', 
        startDate = '${startDate}', endDate = '${endDate}', documentsAttached = "${documentsAttached}" lastUpdated = NOW() WHERE taskId = ${taskID} AND staffID = ${id}`, 
        (err, resp) => {
            // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            if(err){res.send(err)}
            if(resp){
                let notified = {
                    'staffID' : assignedID,
                    'heading' : 'Your task has been edited',
                    'body' : taskName,
                    'status' : 'false'
                }
                notificationControl.logNotification(notified, res)
            }
        })
    }  
}

// update task status
exports.editTaskStatus = (req, res, next) => {
    const {id} = req.params
    const {taskStatus, taskID} = req.body

    connection.query(`UPDATE task SET taskStatus = ${taskStatus}, lastUpdated = NOW() WHERE assignedID = ${id} and taskId = ${taskID}`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err) return res.send(err)
        if(resp){
            connection.query(`SELECT firstName, lastName FROM staff WHERE staffID = ${id}`, (err, respQuery) => {
                // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                if(err)res.send(err)
                if(respQuery){
                    connection.query(`SELECT assignedID, taskName FROM task WHERE taskId = ${taskID}`, (err, respQuery1) =>{
                        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                        if(err) res.send(err)
                        if(respQuery1){
                            let status = ""
                            
                            if(taskStatus === "2"){
                                status = "Accepted"
                            }else if(taskStatus === "3"){
                                status = "Completed"
                            }else{
                                status = "Overdue"
                            }
                            let notified = {
                                'staffID' : respQuery1[0].assignedID,
                                'heading' : `${respQuery1[0].taskName} status ${status}` ,
                                'body' : `${respQuery[0].firstName}, ${respQuery[0].lastName}s task is now ${status}`,
                                'status' : "false"
                            }
                            notificationControl.logNotification(notified, res)
                        }
                    })
                    
                }
            })  
        }
    })
    
}

exports.deleteTask = (req, res, next) => {
    const {id} = req.params
    const {taskID} = req.body
    
    connection.query(`DELETE FROM task WHERE taskID = ${taskID} AND staffID = ${id}`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err){
            res.send(err)
        }
        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}