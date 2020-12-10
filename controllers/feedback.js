const connection = require('../modules/db')
module.exports = (app) => {

    // SENDING FEEDBACK
    app.post('/feedback', (req, res) => {
        let mysql = `INSERT INTO feedback (fullName, email, message) 
        VALUE ('${req.body.fullName}', '${req.body.email}','${req.body.message}')`
        connection.query(mysql, (err, respond) => {
            if (respond) {
                res.send("Thanks for your feedback! we will get back to you")

            } else {
                return err;
            }
        })
    })



    // CONTACT-US 
    app.post('/contact-us', (req, res) => {
        let mysql = `INSERT INTO contactus (contactName, contactEmail, message, date) 
        VALUE ('${req.body.contactName}', 
        '${req.body.contactEmail}',
        '${req.body.message}',
        '${req.body.date}')`
        connection.query(mysql, (err, respond) => {
            if (respond) {
                res.send("Thank you! We will get back to you")

            } else {
                return err;
            }
        })
    })
}