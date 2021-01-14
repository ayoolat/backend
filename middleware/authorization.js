const connection = require("../modules/db")

exports.authorize = (permitItem) => {
    return (req, res, next) => {
        // console.log(req)
        connection.query(`SELECT permit, permitItem FROM permissions p  
        JOIN permitItem pi ON pi.permitItemID = p.permitItemID
        JOIN permit pe ON pe.permitID = p.permitID
        WHERE staffID = '${req.respData.response[0].staffID}'`, (err, resp) => {
            console.log(req.respData.response[0].staffID)
            if(resp == 0){
                return res.send('payload empty')
            }

            if(resp){
                const results = resp
                // console.log(results)
                permission = permitItem
                results.forEach(element => {
                    if(element.permitItem === permission || element.permit === 'allowed'){
                        console.log('yes')
                        next()
                    }
                });
                // console.log(resp.permitItem)
                // let index
                // index = resp.indexOf(resp.permission == permission)
                // console.log(index)
                // if(resp[index].permit === 'allowed'){
                //     next()
                // }
            }else{
                return res.status(500).json({
                    message : "User permission not granted"
                })
            }
        })
    }
}

// index = resp.findIndex(x => x.name == assignedMainList[id].name)