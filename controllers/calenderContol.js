let calendarController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../controllers/authentificate/authentification')

    // add to Calendar (internal and admin only)
    app.post("/pace-time-sheet/calendar", authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`INSERT INTO calendar (eventName, eventDateAndTime) VALUE(${req.body.eventName}, ${eventDateAndTime})`, (req, resp) => {
                    if(err){
                        res.statusCode(401).end()
                    }
                    if(resp){
                        connection.query(`SELECT staffID from staff WHERE companyID = ${req.respData.data.companyID}`, (req, response) => {
                            let allStaff = response
                            allStaff.forEach(element => {
                                let notified = {
                                    'staffID' : element.staffID,
                                    'heading' : `${req.respData.data.firstName} added and event on ${eventDateAndTime}`,
                                    'body' :  req.body.eventName,
                                    'status' : 'false'
                                }
                                logNotification(notified, res)
                            });
                            
                            res.send('event created')
                        })
                       
                    }
                })
            }
        }
    })

    // read calendar
    app.get('/pace-time-sheet/calendar/events', authenticateToken, (req, res) => {
        connection.query(`select * from calendar`, (err, resp) => {
            if(err){
                res.statusCode(401).end()
            }
            if(resp){
                res.send('read calendar')
            }
        })
    })

    // update
    app.put('/pace-time-sheet/calendar/update', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`UPDATE calendar SET eventName = '${eventName}', 
                eventDateAndTime = '${eventDateAndTime}', lastUpdated = ${Date.now()}`, (err, resp) => {
                    if(err){
                        res.statusCode(401).end()
                    }
                    if(resp){
                        connection.query(`SELECT staffID from staff WHERE companyID = ${req.respData.data.companyID}`, (req, response) => {
                            let allStaff = response
                            allStaff.forEach(element => {
                                let notified = {
                                    'staffID' : element.staffID,
                                    'heading' : `${req.respData.data.firstName} added and event on ${eventDateAndTime}`,
                                    'body' :  req.body.eventName,
                                    'status' : 'false'
                                }
                                logNotification(notified, res)
                            });
                            
                            res.send('event created')
                        })
                    }
                })
            }
        }
    })

    // delete
    app.delete('/pace-time-sheet/calendar/delete/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`DELETE from calendar where eventID = ${req.params.id}`, (err, resp) => {
                    if(err){
                        res.statusCode(401).end()
                    }
                    if(resp){
                        res.send('calendar deleted')
                    }
                })
            }
        }
    })
}


module.exports = calendarController