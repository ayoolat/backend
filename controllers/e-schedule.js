let eScheduleController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../controllers/authentificate/authentification')

    // add to Calendar (internal and admin only)
    app.post("/pace-time-sheet/calendar", authenticateToken, (req, res) => {
        connection.query(`INSERT INTO calendar (eventName, eventDateAndTime) VALUE(${req.body.eventName}, ${eventDateAndTime})`, (req, resp) => {
            if(err){
                res.statusCode(401).end()
            }
            if(resp){
               
                res.send('event created')
              
            }
        })
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
        connection.query(`UPDATE calendar SET eventName = '${eventName}', 
        eventDateAndTime = '${eventDateAndTime}', lastUpdated = ${Date.now()}`, (err, resp) => {
            if(err){
                res.statusCode(401).end()
            }
            if(resp){
                res.send('read calendar')
            }
        })
    })

    // delete
    app.delete('/pace-time-sheet/calendar/delete/:id', authenticateToken, (req, res) => {
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