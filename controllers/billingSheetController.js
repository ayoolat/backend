let billingSheetController = (app) => {
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')

    app.get("/pace-time-sheet/billingSheet/personal", authenticateToken, (req, res) => {
        connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated FROM staff s 
        JOIN billingSheet b ON s.staffID = b.staffID WHERE staffID = ${req.params.id}`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send('resp')
            }
        })
    })

    app.post("/pace-time-sheet/timeSheet", authenticateToken, (req, res) => {
        connection.query(`INSERT INTO billingSheet (staffID, payableAmount) VALUES ('${req.params.id}', '${req.respData.data.firstName * timeSpent}')`, (err, resp) => {
            if(err){
                res.statusCode(401).send('error')
            }
            if(resp){
                res.send(resp)
            }
        })
    })

    // app.get("/pace-time-sheet/timeSheet/department", authenticateToken, (req, res) => {
    //     connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated, s.firstName, s.lastName FROM staff s JOIN billingSheet b ON s.staffID = b.staffID WHERE`, (err, resp) => {

    //     })
    // })

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
}

module.exports = billingSheetController