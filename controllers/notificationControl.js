
let connection = require('../modules/db')
const util = require('util');


    console.log('notifications connected')
    connection.query = util.promisify(connection.query);

// create notification
exports.logNotification = (notification, res) => {
    async function queryDB() {
        try{
            await connection.query(`INSERT INTO notification (staffID, heading, body, status) 
            VALUES ('${notification.staffID}', '${notification.heading}', '${notification.body}', '${notification.status}')`)

            return res.json({
                status : 'success',
                data : req.body
            })
        }catch(err){
            // if(err) {return res.status(500).json({message: 'There has been an error, try again'})}
            if(err)return send(err)
        }       
    }
}

    // get notifications
exports.getNotifications = (req, res, next) => {
    connection.query(`select * from notifications`, (err, resp) => {
        if(err) throw err
        res.send(resp)
    })
}
    

