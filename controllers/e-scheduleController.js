let connection = require('../modules/db')

// Creat new e-schedule
exports.newE_schedule = (req, res, next) => {
    console.log(req.respData.response)
    connection.query(`INSERT INTO calendar (eventName, eventDateAndTime, staffID) VALUES ('${req.body.eventName}', '${req.body.eventDateAndTime}', '${req.respData.response.staffID}')`, (err, resp) => {
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
    connection.query(`select * from calendar`, (err, resp) => {
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
    connection.query(`UPDATE calendar SET eventName = '${eventName}', 
    eventDateAndTime = '${eventDateAndTime}', lastUpdated = NEW() WHERE staffID = ${req.params.id} AND eventID = ${req.params.eventID}`, (err, resp) => {
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
    connection.query(`DELETE from calendar where eventID = ${req.params.id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : req.body
            })
        }
    })
}



