
let connection = require('../modules/db')
const authenticateToken = require('../middleware/authentication')
const util = require('util');
const dateFormat = require( 'dateformat' );
const date = dateFormat( new Date(), "yyyy-mm-dd" );

connection.query = util.promisify(connection.query);


exports.IncludeDateAndTime =  (req, res, next) => {
    let allUsers
    getAllStaffTime()
    async function getAllStaffTime() {
        await connection.query(`SELECT staffID from staff`, (err, resp) => {
            if(err){ return res.send(err)}

            if(resp){
                allUsers = resp
                sendDate()
            }
        })

    }

    function sendDate() {
        allUsers.forEach(element => {
            try{
                queryDB()
                async function queryDB() {
                    await connection.query(`INSERT INTO timer (staffId, date) VALUES ('${element.staffID}', '${date}')`)
                
                    await connection.query(`INSERT INTO billingSheet (staffId, dateCreated) VALUES ('${element.staffID}', '${date}')`)    
                }


            }catch(err){
                return res.status(500).json({Message:"An error has occured"})
            }
        }); 
        return res.json({status : "success"})

    }   
}    
    
exports.startTime = (req, res, next) => {
    const {id} = req.params
    connection.query(`UPDATE timer SET loginTime = NOW() WHERE staffID = ${id} AND date ='${date}' `, (err, resp) => {
        if(err){
            res.send(err)
        }
        if(resp){
            res.send('resp')
        }
    })
}
   
exports.stopTime = (req, res, next) => {
    const {id} = req.params
    const {millSecs} = req.body
    const {expectedWorkHours, billRateCharge} = req.respData.response[0]
    connection.query(`UPDATE timer SET logoutTime = NOW(), seconds = ${millSecs} WHERE staffID = ${id} AND date = '${date}'`, (err, resp) => {
        if(err){
            return res.send(err)
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
                    return res.statusCode(401).send('error')
                }
                if(resp){
                    return res.send(resp)
                }
            })
        }
    })
}
    
exports.getUserTimeSheet = (req, res, next) => {
    const {id} = req.params
    const {startDate, endDate} = req.params

    connection.query(`SELECT s.firstName, s.lastName, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date FROM staff s 
    JOIN timer t ON s.staffID = t.staffID 
    WHERE s.staffId = ${id} AND date BETWEEN '${startDate}' AND '${endDate}'`, (err, resp) => {
        if(err){
            res.send(err)
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
        connection.query(`SELECT s.firstName, s.departmentId, s.lastName, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date FROM staff s 
        JOIN timer t ON s.staffID = t.staffID 
        WHERE companyId = ${id} AND date BETWEEN '${startDate}' AND '${endDate}'`, (err, resp) => {
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
        connection.query(`SELECT s.firstName, s.lastName, t.seconds, s.expectedWOrkHours, t.loginTime, t.logoutTime, t.date FROM staff s
        JOIN timer t ON s.staffID = t.staffID 
        WHERE departmentId = ${id} AND date BETWEEN '${startDate}' AND '${endDate}'`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send(resp)
            }
        })
    }

}

    
