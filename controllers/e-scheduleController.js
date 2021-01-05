let connection = require('../modules/db')

// Creat new e-schedule
exports.newE_schedule = (req, res, next) => {
    const {eventName, eventDateAndTime} = req.body
    connection.query(`INSERT INTO e_schedule (eventName, eventDateAndTime, staffID) VALUES ('${eventName}', '${eventDateAndTime}', '${req.respData.response[0].staffID}')`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}

exports.getE_schedule = (req, res, next) => {
    const {id} = req.params
    connection.query(`select * from e_schedule WHERE staffID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}

exports.editE_schedule = (req, res, next) => {
    const {eventName, eventDateAndTime} = req.body
    const {id, eventID} = req.params
    connection.query(`UPDATE e_schedule SET eventName = '${eventName}', 
    eventDateAndTime = '${eventDateAndTime}', lastUpdated = NOW() WHERE staffID = ${id} AND eventID = ${eventID}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}

exports.delete = (req, res, next) => {
    const {id} = req.params
    connection.query(`DELETE from e_schedule where eventID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}



