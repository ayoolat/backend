let timeSheetController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../controllers/authentificate/authentification')
    seconds = 0
    minutes = 0
    hours = 0
    app.get("/pace-time-sheet/timeSheet", authenticateToken, (req, res) => {
        connection.query(`SELECT * from timer where staffId = ${req.respData.data.staffID}`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send('success')
            }
        })
    })

    // on start time
    app.post("/pace-time-sheet/timeSheet", (req, res) => {
        startTime()
        connection.query(`INSERT INTO timer (loginTime, hours, minutes, seconds) VALUES (${Date.now}, ${hours}, ${minutes}, ${seconds}),`, (err, res) => {
            if(err){
                res.send('oops! something happened, please restart your time')
            }
            if(resp){
                res.send('timer counting')
            }
        })
    })

    app.post("/pace-time-sheet/timeSheet", (req, res) => {
        stopTime()
        connection.query(`INSERT INTO timer (logoutTime) VALUES (${Date.now}),`, (err, res) => {
            if(err){
                res.send('oops! something happened, your time wasn\'t saved')
            }
            if(resp){
                res.send('your time has been saved')
            }
        })
    })

    function setSecs(){
        if(seconds < 60){
            seconds++
        }else if(seconds == 60){
            seconds = 0
            seconds++
        }
    }
    
    function setMins(){
        if(minutes < 60){
            minutes++
        }else if(minutes == 60){
            minutes = 0
            minutes++
        } 
    }
    
    function setHours(){
        if(hours < 59){
            hours++
        }else if(hours == 59){
            hours = 0
            hours++
        }
    }
    
    function startTime(){        
       timeSec = setInterval(setSecs, 1000);
       timeMins = setInterval(setMins, 60000);
       timeHours = setInterval(setHours, 3600000);
    
    }
    
    function stopTime(){
        clearInterval(timeSec);
        clearInterval(timeMins);
        clearInterval(timeHours);
    
    }
}

module.exports = timeSheetController