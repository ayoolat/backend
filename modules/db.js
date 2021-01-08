// require npm packages
const mysql = require('mysql')
require('dotenv').config()

// create mysql connection
var connection = mysql.createPool({
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
})

// [mysql://b726afb036f0bd:3fdf3077@us-cdbr-east-02.cleardb.com/heroku_ec0bd4ee53407d5?reconnect=true]

// connection.connect((err, res) => {
//     if (err) throw err
//     console.log('DB connected')
// })

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "pacetimesheet_"
// })

// connection.connect((err, res) => {
//     if (err) throw err

//     console.log("db server running")
// })

module.exports = connection