
    let connection = require('../modules/db')

    console.log('notifications connected')

// create notification
exports.logNotification = (notification, res) => {
    connection.query(`INSERT INTO notification (staffID, heading, body, status) 
    VALUES ('${notification.staffID}', '${notification.heading}', '${notification.body}', false)`
    , (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, try again'})}
        if(err)return send(err)

    })
}

    // get notifications
exports.getNotifications = (req, res, next) => {
    connection.query(`select * from notifications`, (err, resp) => {
        if(err) throw err
        res.send(resp)
    })
}
    

