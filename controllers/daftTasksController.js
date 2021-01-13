exports.draftTask = (req, res, next) => {
    const {taskName, assignedID, taskDescription, startDate, endDate} = req.body
    const {id} = req.params
    if(!req.file){
        permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')
        if(permitDetails.permit === 'allowed'){
            connection.query(`INSERT INTO draftedTasks
            (taskName, assignedID, taskStatus, taskDescription, documentsAttached, staffID, startDate, endDate)
            VALUES ('${taskName}', '${assignedID}','1', '${taskDescription}', '${documentsAttached}', '${id}', '${startDate}', '${endDate}')
            `, (err, resp) => {
                // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                if(err) return res.send(err)
                if(resp){
                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                }
            })
        }else{
            res.send('You do not have permission to add a task')
        }
    }else{
        const documentsAttached = req.file.path.replace("/\\/g", "//")
        permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')
        if(permitDetails.permit === 'allowed'){
            connection.query(`INSERT INTO draftedTasks
            (taskName, assignedID, taskStatus, taskDescription, documentsAttached, staffID, startDate, endDate)
            VALUES ('${taskName}', '${assignedID}','1', '${taskDescription}', '${documentsAttached}', '${id}', '${startDate}', '${endDate}')
            `, (err, resp) => {
                // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                if(err) return res.send(err)
                if(resp){
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

}

// read user task by ID
exports.getAssignedTasks =(req, res, next) => {
    const {id} = req.params
    connection.query(`select * from draftedTasks where staffID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

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

    permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')
    if(permitDetails.permit === 'allowed'){
        if(!req.file){
            connection.query(`UPDATE draftedTasks SET taskName = '${taskName}', assignedID = '${assignedID}', taskDescription = '${taskDescription}', 
            startDate = '${startDate}', endDate = '${endDate}', lastUpdated = NOW() WHERE taskId = ${taskID} AND staffID = ${id}`, 
            (err, resp) => {
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
            connection.query(`UPDATE draftedTasks SET taskName = '${taskName}', assignedID = '${assignedID}', taskDescription = '${taskDescription}', 
            startDate = '${startDate}', endDate = '${endDate}', documentsAttached = "${documentsAttached}" lastUpdated = NOW() WHERE taskId = ${taskID} AND staffID = ${id}`, 
            (err, resp) => {
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
    }else{res.send('You do not have permission to edit this task')}
}

exports.deleteTask = (req, res, next) => {
    const {id} = req.params
    const {taskID} = req.body
    
    permitDetails = req.respData.response.find(x => x.permitItem == 'Add and Edit tasks')

    if(permitDetails.permit === 'allowed'){
        connection.query(`DELETE FROM draftedTasks WHERE taskID = ${taskID} AND staffID = ${id}`, (err, resp) => {
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