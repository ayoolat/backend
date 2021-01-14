
    let connection = require('../modules/db')
    const authenticateToken = require('../middleware/authentication')

exports.userBillingSheet = (req, res, next) => {
    connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated FROM staff s 
    JOIN billingSheet b ON s.staffID = b.staffID WHERE staffID = ${req.params.id}`, (err, resp) => {
        if (err) {
            return res.status(500).json({message: 'There has been an error, try again'})
        }
        
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}
        
exports.companyBillingSheet = (req, res, next) => {
    connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated, s.firstName, s.lastName FROM staff s 
    JOIN billingSheet b ON s.staffID = b.staffID WHERE companyId = ${req.params.id}`, (err, resp) => {
        if (err) {
            return res.status(500).json({message: 'There has been an error, try again'})
        }

        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}

exports.departmentBillingSheet = (req, res, next) => {
    connection.query(`select s.billableAmount, b.payableAmount, b.dateCreated, s.firstName, s.lastName FROM staff s 
    JOIN billingSheet b ON s.staffID = b.staffID WHERE departmentID = ${req.params.id}`, (err, resp) => {
        if (err) {
            return res.status(500).json({message: 'There has been an error, try again'})
        }
      
        if(resp){
            return res.json({
                status : 'success',
                data : resp
            })
        }
    })
}
