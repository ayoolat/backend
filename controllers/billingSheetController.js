
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')

exports.userBillingSheet = (req, res, next) => {
    connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated FROM staff s 
    JOIN billingSheet b ON s.staffID = b.staffID WHERE staffID = ${req.params.id}`, (err, resp) => {
        if(err){
            res.statusCode(401).send('error')
        }
        if(resp){
            res.send('resp')
        }
    })
}
        

    app.get("/pace-time-sheet/timeSheet/company", authenticateToken, (req, res) => {
        connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated, s.firstName, s.lastName FROM staff s 
        JOIN billingSheet b ON s.staffID = b.staffID WHERE companyId = ${req.params.id}`, (err, resp) => {
            if(err){
                res.statusCode(401).send("error")
            }
            if(resp){
                res.send(resp)
            }
        })
    })
