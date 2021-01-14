const connection = require("../modules/db")

exports.authorize = (req, res, next) => {
    console.log(req)
    connection.query(`SELECT permit, permitItem FROM permissions p  
    JOIN permitItem pi ON pi.permitItemID = p.permitItemID
    JOIN permit pe ON pe.permitID = p.permitID
    WHERE staffID = '${req.respData.response.staffID}'`, (err, resp) => {
        if(resp){
            permission = permitItem 
            let index 
            index = resp.indexOf(resp.permission)
            if(resp[index].permit === 'allowed'){
                next()
            }
        }else{
            res.status(500).json({
                message : "User permission not granted"
            })
        }
    })
}

// index = resp.findIndex(x => x.name == assignedMainList[id].name)