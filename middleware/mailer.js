require('dotenv').config()
const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

// const auth = {
//     auth: {
//       apiKey: `${process.env.API_KEY}`,
//       domain: `${process.env.DOMAIN}`
//     }
// }

// const mailer = nodemailer.createTransport(mailGun(auth));

// const sendMail = (email, receiver, subject, html, text, cb) => {
//     const mailOptions = {
//         from : email,
//         to : receiver,
//         subject : subject,
//         html : html,
//         text : text
//     };
//     mailer.sendMail(mailOptions, (err, info) => {
//         if(err){
//             cb(err, null)
//         }
//         else{
//             cb(null, info)
//         }
//     })
// }

var transporter = nodemailer.createTransport({
    host: "yahoo",
    auth: {
        user: "ayoola_toluwanimi@yahoo.com",
        pass: "Rereloluwa1144"
    }
});

const sendMails = (from, to, subject, html) => {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info.response);
        }
    });
}

module.exports = sendMails