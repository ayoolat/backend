let timeSheetController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')
    seconds = 0
    minutes = 0
    hours = 0
    app.get("/pace-time-sheet/timeSheet/personal", authenticateToken, (req, res) => {
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
    app.post("/pace-time-sheet/timeSheet/start/:id", (req, res) => {
        connection.query(`INSERT INTO timer (hours, minutes, seconds, staffID) 
        VALUES ('${hours}', '${minutes}', '${seconds}', '${req.params.id}')`, (err, resp) => {
            if(err){
                res.send(err)
            }
            if(resp){
                startTime()
                res.send('timer counting')
            }
        })
    })

    app.post("/pace-time-sheet/timeSheet/end", (req, res) => {
        connection.query(`INSERT INTO timer (logoutTime) VALUES (${Date.now()}),`, (err, res) => {
            if(err){
                res.send('oops! something happened, your time wasn\'t saved')
            }
            if(resp){
                stopTime()
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

    app.get("/pace-time-sheet/timeSheet/company/id", authenticateToken, (req, res) => {
        connection.query(`SELECT s.firstName, s.lastName, t.hours, t.minutes, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date 
        from staff JOIN timer ON s.staffID = t.staffID where staffId = ${req.respData.data.staffID}`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send(resp)
            }
        })
    })
}

module.exports = timeSheetController