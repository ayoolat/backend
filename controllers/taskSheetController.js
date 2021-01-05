const connection = require('../modules/db')

// get taskSheet for all users in company
exports.taskSheetCompany = (req, res, next) => {
    const {id} = req.params

    permitDetails = req.respData.data.find(x => x.permitItem == 'View company timesheet and billing report')
    if(permitDetails.permit === 'allowed'){
        connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
        JOIN staff S ON T.staffID = S.staffID JOIN status ST ON T.taskStatus = ST.statusID WHERE companyID = ${id}`, (err, resp) => {

            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }else{
        return res.json({
            status : 'You do not have permission to view taskSheet',
        })
    }
}

exports.taskSheetDepartment = (req, res, next) => {
    const {id, dept} = req.params

    permitDetails = req.respData.data.find(x => x.permitItem == 'View department timesheet and billing report')
    if(permitDetails.permit === 'allowed'){
        connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
        JOIN staff S ON T.staffID = S.staffID JOIN status ST ON T.taskStatus = ST.statusID WHERE companyID = ${id} AND departmentID = ${dept}`, (err, resp) => {

            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }else{
        return res.json({
            status : 'You do not have permission to view taskSheet',
        })
    }
}

exports.taskSheetFilter = (req, res, next) => {
    const {id, dept} = req.params

    permitDetails = req.respData.data.find(x => x.permitItem == 'View department timesheet and billing report')
    if(permitDetails.permit === 'allowed'){
        connection.query(`SELECT t.taskName, S.firstName, S.lastName, T.startDate, T.endDate, ST.taskStatus, t.lastUpdated FROM task T 
        JOIN staff S ON T.staffID = S.staffID JOIN status ST ON T.taskStatus = ST.statusID WHERE companyID = ${id} AND departmentID = ${dept} AND `, (err, resp) => {

            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }else{
        return res.json({
            status : 'You do not have permission to view taskSheet',
        })
    }
}