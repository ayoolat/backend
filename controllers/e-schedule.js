let eScheduleController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')

    // add to Calendar (internal and admin only)
    app.post("/pace-time-sheet/eSchedule", authenticateToken, (req, res) => {
        connection.query(`INSERT INTO calendar (eventName, eventDateAndTime, staffID) VALUES (${req.body.eventName}, ${req.body.eventDateAndTime}, '${permitDetails.staffID}')`, (req, resp) => {
            if(err){
                res.statusCode(401).end()
            }
            if(resp){
                    res.send('event created')
            }
        })
    })

    // read calendar
    app.get('/pace-time-sheet/eSchedule/events', authenticateToken, (req, res) => {
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
    app.put('/pace-time-sheet/eSchedule/update', authenticateToken, (req, res) => {       
        connection.query(`UPDATE calendar SET eventName = '${eventName}', 
        eventDateAndTime = '${eventDateAndTime}', lastUpdated = ${Date.now()} WHERE staffID = ${req.params.id} AND eventID = ${req.params.eventID}`, (err, resp) => {
            if(err){
                res.statusCode(401).end()
            }
            if(resp){
                res.send('read calendar')
            }
        })
    })

    // delete
    app.delete('/pace-time-sheet/eSchedule/delete/:id', authenticateToken, (req, res) => {
        connection.query(`DELETE from calendar where eventID = ${req.params.id}`, (err, resp) => {
            if(err){
                res.statusCode(401).end()
            }
            if(resp){
                res.send('read calendar')
            }
        })
    })      

}


module.exports = eScheduleController