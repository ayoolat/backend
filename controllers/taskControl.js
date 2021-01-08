let connection = require('../modules/db')
console.log('tasks')

const notificationControl = require('./notificationControl')

exports.newTask = (req, res, next) => {
    const {taskName, assignedID, taskDescription, staffID, startDate, endDate} = req.body
    const {id} = req.params
    const documentsAttached = req.file.path.replace("/\\/g", "//")

    if(!req.file){
        noFile = "no file attached"
        res.send("no file")
    }
    
    permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')
    if(permitDetails.permit === 'allowed'){
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
                return res.json({
                    status : 'success',
                    data : req.body
                })
            }
        })
    }else{
        res.send('You do not have permission to edit details')
    }
}

// read user task by ID
exports.getAssignedTasks =(req, res, next) => {
    const {id} = req.params

    if(req.respData.response[0].staffID == id){
        connection.query(`select * from task where staffID = ${id}`, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }else{res.send("invalid request")}
}

// read user task by ID
exports.getTasks =(req, res, next) => {
    const {id} = req.params

    if(req.respData.response[0].staffID == id){
        connection.query(`select * from task where assignedID = ${id}`, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }else{res.send("invalid request")}
}

// read user task by status
exports.getTasksByStatus = (req, res, next) => {
    const {id, status} = req.params

    if(req.respData.response[0].staffID == id){
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
    }else{
        return res.json({
            status : 'You do not have permission to view this task',
        })
    }
}

exports.getCompanyTasks = (req, res, next) => {
    const {id} = req.params

    permitDetails = req.respData.response.find(x => x.permitItem == 'read all company tasks')

    if(permitDetails.permit === 'allowed' && permitDetails.companyID == id){
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
    }else{
        res.send('You do not have permission to view all company employees')
    }
}

// read all company tasks by status
exports.getCompanyTasksByStatus = (req, res, next) => {
    const {id, status} = req.params

    permitDetails = req.respData.response.find(x => x.permitItem == 'read all company tasks')
    if(permitDetails.permit === 'allowed' && permitDetails.companyID == id){
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
    }else{
        res.send('You do not have permission to view company Tasks')
    }
}

// Update tasks
exports.editTask = (req, res, next) => {
    const {id} = req.params
    const {taskName, assignedID, taskDescription, startDate, endDate, taskID} = req.body

    const documentsAttached = req.file.path.replace("/\\/g", "//")

    permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')
    if(permitDetails.permit === 'allowed' && permitDetails.staffID == id){
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
    }else{res.send('You do not have permission to edit this task')}
}

// update task status
exports.editTaskStatus = (req, res, next) => {
    const {id} = req.params
    const {taskStatus, taskID} = req.body
    const {response} = req.respData
    let status

    if(response[0].staffID == id){
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
}

exports.deleteTask = (req, res, next) => {
    const {id} = req.params
    const {taskID} = req.body
    
    permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')

    if(permitDetails.permit === 'allowed' && permitDetails.staffID == id){
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
}
