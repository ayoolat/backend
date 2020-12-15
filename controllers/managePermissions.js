managePermissionsController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')

    app.put('/pace-time-sheet/managePermissions/:staffID/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'manage permissions')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`UPDATE permissions SET permit = '${req.body.permit}' WHERE staffID = ${req.params.staffID} 
                AND permitItemID = ${req.params.id}`, (err, resp) => {
                    if(err){
                        res.send(err)
                    }
                    if(resp){
                        res.send(resp)
                    }
                })
            }else{
                res.send('You do not have permission to manage permissions')
            }
        } 
    })
}