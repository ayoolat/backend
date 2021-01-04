const connection = require('../modules/db')
const notificationControl = require('./notificationControl')

// add to Calendar (internal and admin only)
exports.NewEvent = (req, res, next) => {
    const {eventName, eventDateAndTime} =  req.body

    const permitDetails = req.respData.response.find(x => x.permitItem == 'Add and edit Company calendar')
    if(permitDetails.permit === 'allowed'){
        connection.query(`INSERT INTO calendar (eventName, eventDateAndTime, staffID) VALUE('${eventName}', '${eventDateAndTime}', '${permitDetails.staffID}')`, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                connection.query(`SELECT staffID from staff WHERE companyID = ${permitDetails.companyID}`, (err, response) => {
                    let allStaff = response
                    allStaff.forEach(element => {
                        let notified = {
                            'staffID' : element.staffID,
                            'heading' : `${permitDetails.firstName} added and event on ${eventDateAndTime}`,
                            'body' :  eventName,
                            'status' : 'false'
                        }
                        notificationControl.logNotification(notified, res)
                    });
                    
                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                }) 
            }
        })
    }
}

exports.getEvents = (req, res, next) => {
    const {id} = req.params
    connection.query(`select * from calendar WHERE staffID = ${id}`, (err, resp) => {
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

exports.editEvent = (req, res, next) => {
    const {eventName, eventDateAndTime} = req.body
    const{eventID, id} = req.params
    const{firstName, lastName} = req.respData.data

    permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
    if(permitDetails.permit === 'allowed'){
        connection.query(`UPDATE calendar SET eventName = '${eventName}', 
        eventDateAndTime = '${eventDateAndTime}', lastUpdated = NOW() WHERE staffID = ${id} AND eventID = ${eventID}`, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                connection.query(`SELECT staffID from staff WHERE companyID = ${permitDetails.companyID}`, (err, response) => {
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
                    
                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                })
            }
        })
    }else {res.send('You do not have permission to edit calendar')}
}

exports.deleteEVent = (req, res, next) => {
    const{id} = req.params

    permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
    if(permitDetails.permit === 'allowed'){
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
}
