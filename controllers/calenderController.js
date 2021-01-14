const connection = require('../modules/db')
const notificationControl = require('./notificationControl')

// add to Calendar (internal and admin only)
exports.NewEvent = (req, res, next) => {
    const {eventName, eventDateAndTime} =  req.body

    connection.query(`INSERT INTO calendar (eventName, eventDateAndTime, staffID) VALUE('${eventName}', '${eventDateAndTime}', '${req.respData.response[0].staffID}')`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        
        if(resp){
            let newFormat = {
                'title' : eventName,
                'start' : Date.now(),
                'end' : eventDateAndTime
            }
            connection.query(`SELECT staffID from staff WHERE companyID = ${req.respData.response[0].staffID}`, (err, response) => {
                let allStaff = response
                allStaff.forEach(element => {
                    let notified = {
                        'staffID' : element.staffID,
                        'heading' : `${req.respData.response[0].firstName}, ${req.respData.response[0].lastName} added and event on ${eventDateAndTime}`,
                        'body' :  eventName,
                        'status' : 'false'
                    }
                    notificationControl.logNotification(notified, res)
                });
               
                return res.json({
                    status : 'success',
                    data : newFormat
                })
            }) 
        }
    })
}

exports.getEvents = (req, res, next) => {
    const {id} = req.params
    connection.query(`select c.eventName, c.eventDateAndTime, c.dateCreated, c.eventID, c.staffID from calendar c JOIN staff s ON s.staffID = C.staffID WHERE companyID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            let newFormat = {
                'title' : resp[0].eventName,
                'start' : resp[0].dateCreated,
                'end' : resp[0].eventDateAndTime
            }
            return res.json({
                status : 'success',
                data : newFormat
            })
        }
    })
}

exports.editEvent = (req, res, next) => {
    const {eventName, eventDateAndTime} = req.body
    const{eventID, id} = req.params
    const{firstName, lastName} = req.respData.response[0]

    connection.query(`UPDATE calendar SET eventName = '${eventName}', 
    eventDateAndTime = '${eventDateAndTime}', lastUpdated = NOW() WHERE staffID = ${id} AND eventID = ${eventID}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            connection.query(`SELECT staffID from staff WHERE companyID = ${req.respData.response[0].companyID}`, (err, response) => {
                const allStaff = response
                allStaff.forEach(element => {
                    const notified = {
                        'staffID' : element.staffID,
                        'heading' : `${firstName}, ${lastName} has scheduled an event`,
                        'body' :  `${eventDateAndTime} on ${eventName}`,
                        'status' : 'false'
                    }
                    notificationControl.logNotification(notified, res)
                });
                let newFormat = {
                    'title' : resp[0].eventName,
                    'start' : resp[0].dateCreated,
                    'end' : resp[0].eventDateAndTime
                }
                return res.json({
                    status : 'success',
                    data : newFormat
                })
            })
        }
    })
}

exports.deleteEVent = (req, res, next) => {
    const{id} = req.params

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
