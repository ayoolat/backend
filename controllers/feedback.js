const nodemailer = require('nodemailer')

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
            var transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "9f06e003b14b45",
                    pass: "e32d15f2d5cfff"
                }
            });

            const mailOptions = {
                from: 'akan.asanga@gmail.com',
                to: 'akan.asanga@yahoo.com',
                subject: 'From Feedback',
                html: `<h1>Contact-us</h1> \n
            '${req.body.fullName}', \n
            '${req.body.email}',\n
            '${req.body.message}'`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
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
            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: '@gmail.com',
            //         pass: 'password' // naturally, replace both with your real credentials or an application-specific password
            //     }
            // });

        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9f06e003b14b45",
                pass: "e32d15f2d5cfff"
            }
        });

        const mailOptions = {
            from: 'akan.asanga@gmail.com',
            to: 'akan.asanga@yahoo.com',
            subject: 'From contact',
            html: `<h1>Contact-us</h1> \n
            '${req.body.contactName}', \n
            '${req.body.contactEmail}',\n
            '${req.body.message}',\n
            '${req.body.date}'`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })

}