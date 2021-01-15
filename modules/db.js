// require npm packages
const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createPool({
    // host: 'localhost',
    // user: 'toluwanimi',
    // password: 'password',
    // database: 'pacetimesheet_'
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
        // host: 'localhost',
        // user: 'root',
        // password: '',
        // database: 'pace'
})

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "pacetimesheet_"
// })


// connection.connect((err, res) => {
//     if (err) throw err
//     console.log('DB connected')
// })

module.exports = connection