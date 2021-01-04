let connection = require('../modules/db')

// Creat new e-schedule
exports.newE_schedule = (req, res, next) => {
    connection.query(`INSERT INTO calendar (eventName, eventDateAndTime, staffID) VALUES ('${req.body.eventName}', '${req.body.eventDateAndTime}', '${req.respData.response[0].staffID}')`, (err, resp) => {
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        if(err)res.send(err)
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
    connection.query(`select * from calendar WHERE staffID = ${id}`, (err, resp) => {
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
    const {id, eventID} = req.params
    connection.query(`UPDATE calendar SET eventName = '${eventName}', 
    eventDateAndTime = '${eventDateAndTime}', lastUpdated = NEW() WHERE staffID = ${id} AND eventID = ${eventID}`, (err, resp) => {
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
    connection.query(`DELETE from calendar where eventID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}



