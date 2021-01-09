const connection = require('../modules/db')
// add permission to staff/employee
exports.addPermission = (req, res, next) => {
    const {permit} = req.body
    const {id, staffID} = req.params
    let permitHeading =""
    let permitBody = ""
    permitDetails = req.respData.response.find(x => x.permitItem == 'manage permissions')
    console.log(req.respData.response.permitDetails)
    if(permitDetails.permit === 'allowed'){
        connection.query(`UPDATE permissions SET permit = '${permit}' WHERE staffID = ${staffID} 
        AND permitItemID = ${id}`, (err, resp) => {
            // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            if(err)res.send(err)

            if(resp){
                connection.query(`SELECT PI.permitItem FROM permit P JOIN permitItem PI ON PI.permitItemID = P.permitItemId`, (err, respQuery) => {
                    if(err){
                        return res.send(err)
                    }
                    if(respQuery){
                        
                        if(permit === 1){
                            permitHeading = `You have been given a new permission`
                            permitBody = `You have now have the permission to ${respQuery[0].permitItem} by an Admin`
                        }else if(permit === 2){
                            permitHeading = `You have a removed permission`
                            permitBody = `Your permission to ${respQuery[0].permitItem} has been removed by an Admin`
                        }
                        let notified = {
                            'staffID' : staffID,
                            'heading' : permitNotification,
                            'body' : taskName,
                            'status' : 'false'
                        }
                        notificationControl.logNotification(notified, res)
                    }
                })
            }
        })
    }else{
        return res.json({
            status : 'You do not have permission to manage permissions',
            data : req.body
        })
    }
}

// read user permission
exports.getUserPermissions = (req, res, next) => {
    const {id} = req.params
    connection.query(`select PI.permitItem, P.permitID FROM permissions P 
    JOIN staff S ON P.staffID = S.staffID 
    JOIN permitItem PI ON PI.permitItemID = p.permitItemID 
    WHERE permitID = 1 AND s.staffID = ${id}`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err)res.send(err)
        
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

// read all company permissions
exports.getAllPermissions = (req, res, next) => {
    const {id} = req.params
    connection.query(`select PI.permitItem, P.permitID, S.firstName, S.lastName FROM permissions P JOIN staff S ON P.staffID = S.staffID JOIN permitItem PI ON PI.permitItemID = p.permitItemID WHERE s.companyID = ${id}`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err)res.send(err)
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}