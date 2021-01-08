
let connection = require('../modules/db')
const authenticateToken = require('../middleware/authentication')
const util = require('util');

connection.query = util.promisify(connection.query);


exports.IncludeDateAndTime =  (req, res, next) => {
    const allUsers
    getAllStaffTime()
    async function getAllStaffTime() {
        await connection.query(`SELECT staffID from staff`, (err, resp) => {
            if(err){}

            if(resp){
                allUsers = resp[0]
            }
        })

        sendDate()
    }

    function sendDate() {
        allUsers.forEach(element => {
            connection.query(`INSERT INTO (staffID) where staffId = ${element}`, (err, resp) => {
                if(err){
                    res.statusCode(401).send('error')
                }
                if(resp){
                    res.send('success')
                }
            })
        });
    }
    
}    
    
exports.startTime = (req, res, next) => {
    const {id} = req.params
    connection.query(`UPDATE timer SET loginTime = NOW() WHERE staffID = ${id}`, (err, resp) => {
        if(err){
            res.send(err)
        }
        if(resp){
            res.send('timer counting')
        }
    })
}
   
exports.stopTime = (req, res, next) => {
    const {id} = req.params
    const {millSecs} = req.body
    const {expectedWorkHours, billRateCharge} = req.respData.response[0]
    connection.query(`UPDATE timer SET logoutTime = NOW(), seconds = '${millSecs}' WHERE staffID = ${id} ,`, (err, res) => {
        if(err){
            res.send('oops! something happened, your time wasn\'t saved')
        }
        if(resp){
            let workedMillSecs = expectedWorkHours * 3600000
            let hours 
            if(workedMillSecs > millSecs){
                hours = workedMillSecs * 3600000
            }else{
                hours = millSecs * 3600000
            }
           
            connection.query(`INSERT INTO billingSheet (staffID, payableAmount) VALUES ('${id}', '${billRateCharge * hours}')`, (err, resp) => {
                if(err){
                    res.statusCode(401).send('error')
                }
                if(resp){
                    res.send(resp)
                }
            })
            res.send('your time has been saved')
        }
    })
}
    
exports.getUserTimeSheet = (req, res, next) => {
    const {id} = req.params
    const {startDate, endDate} = req.params

    connection.query(`SELECT s.firstName, s.lastName, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date FROM staff 
    JOIN timer ON s.staffID = t.staffID 
    WHERE staffId = ${id} AND date BETWEEN '${startDate}' AND '${endDate}' = ${id}`, (err, resp) => {
        if(err){
            res.statusCode(401).send('error')
        }
        if(resp){
            res.send(resp)
        }
    })
}
    
exports.getAllStaffTimeSheet = (req, res, next) => {
    const {id} = req.params
    const {startDate, endDate} = req.params

    permitDetails = req.respData.response.find(x => x.permitItem == 'View company timesheet and billing report')
    if(permitDetails.permit === 'allowed'){
        connection.query(`SELECT s.firstName, s.departmentId, s.lastName, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date FROM staff 
        JOIN timer ON s.staffID = t.staffID 
        WHERE companyId = ${id} AND date BETWEEN '${startDate}' AND '${endDate}' = ${id}`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send(resp)
            }
        })
    }

}

exports.getAllDepartmentTimeSheet = (req, res, next) => {
    permitDetails = req.respData.response.find(x => x.permitItem == 'View department timesheet and billing report')
    if(permitDetails.permit === 'allowed'){
        connection.query(`SELECT s.firstName, s.lastName, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date FROM staff 
        JOIN timer ON s.staffID = t.staffID 
        WHERE departmentId = ${id} AND date BETWEEN '${startDate}' AND '${endDate}' = ${id}`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send(resp)
            }
        })
    }

}
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

    
