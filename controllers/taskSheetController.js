const connection = require('../modules/db')

// get taskSheet for all users in company
exports.taskSheetCompany = (req, res, next) => {
    const {id} = req.params
    
    connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
    JOIN staff S ON T.assignedID = S.staffID 
    JOIN status ST ON T.taskStatus = ST.statusID 
    WHERE companyID = ${id}`, (err, resp) => {

        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
    
}

exports.taskSheetDepartment = (req, res, next) => {
    const {id, departmentID} = req.params

    connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
    LEFT JOIN staff S ON T.assignedID = S.staffID 
    JOIN status ST ON T.taskStatus = ST.statusID 
    WHERE companyID = ${id} AND departmentID = ${departmentID}`, (err, resp) => {

        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err) res.send(err)
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
    
}

exports.taskSheetFilterCompany = (req, res, next) => {
    const {id, dateStart, dateEnd} = req.params

    connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
    JOIN staff S ON T.assignedID = S.staffID 
    JOIN status ST ON T.taskStatus = ST.statusID 
    WHERE companyID = ${id} AND dateCreated BETWEEN ${dateStart} AND ${dateEnd} `, (err, resp) => {

        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    }) 
}

exports.taskSheetFilterDepartment = (req, res, next) => {
    const {id, dateStart, dateEnd} = req.params

    connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
    JOIN staff S ON T.assignedID = S.staffID 
    JOIN status ST ON T.taskStatus = ST.statusID 
    WHERE departmentID = ${id} AND dateCreated BETWEEN ${dateStart} AND ${dateEnd} `, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    }) 
}