
    let connection = require('../modules/db')

    console.log('notifications connected')

// create notification
exports.logNotification = (notification, res) => {
    connection.query(`INSERT INTO notification (staffID, heading, body) 
    VALUES ('${notification.staffID}', '${notification.heading}', '${notification.body}')`
    , (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}

    // get notifications
exports.getNotifications = (req, res, next) => {
    connection.query(`select * from notifications`, (err, resp) => {
        if(err) throw err
        res.send(resp)
    })
}
    

