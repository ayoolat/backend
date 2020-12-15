let calendarController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')

    // add to Calendar (internal and admin only)
    app.post("/pace-time-sheet/calendar", authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`INSERT INTO calendar (eventName, eventDateAndTime, staffID) VALUE('${req.body.eventName}', '${req.body.eventDateAndTime}', '${permitDetails.staffID}')`, (err, resp) => {
                    if(err){
                        res.send(err)
                    }
                    if(resp){
                        connection.query(`SELECT staffID from staff WHERE companyID = ${permitDetails.companyID}`, (err, response) => {
                            console.log(response)
                            let allStaff = response
                            allStaff.forEach(element => {
                                let notified = {
                                    'staffID' : element.staffID,
                                    'heading' : `${permitDetails.firstName} added and event on ${req.body.eventDateAndTime}`,
                                    'body' :  req.body.eventName,
                                    'status' : 'false'
                                }
                                logNotification(notified, res)
                            });
                            
                            res.send('Calendar added')
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
                res.send(resp)
            }
        })
    })

    // update
    app.put('/pace-time-sheet/calendar/update/:id/:eventID', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add and edit Company calendar')
        if(!!permitDetails){
            if(permitDetails.permit === 'allowed'){
                connection.query(`UPDATE calendar SET eventName = '${req.body.eventName}', 
                eventDateAndTime = '${req.body.eventDateAndTime}', lastUpdated = '${Date.now()}' WHERE staffID = ${req.params.id} AND eventID = ${req.params.eventID}`, (err, resp) => {
                    if(err){
                        return res.statusCode(401).end()
                    }
                    if(resp){
                        connection.query(`SELECT staffID from staff WHERE companyID = ${permitDetails.companyID}`, (err, response) => {
                            let allStaff = response
                            allStaff.forEach(element => {
                                let notified = {
                                    'staffID' : element.staffID,
                                    'heading' : `${req.respData.data.firstName} added and event on ${req.body.eventDateAndTime}`,
                                    'body' :  req.body.eventName,
                                    'status' : 'false'
                                }
                                logNotification(notified, res)
                            });
                            
                            return res.send("Updated")
                        })
                    }
                })
            }
        }else {res.send('You do not have permission to edit calendar')}
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