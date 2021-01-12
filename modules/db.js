// require npm packages
const mysql = require('mysql')
require('dotenv').config()

// create mysql connection
<<<<<<< HEAD
const connection = mysql.createPool({
=======
var connection = mysql.createPool({
>>>>>>> 5b290b72ef669b3fe3b062da532e03f78649d0db
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
<<<<<<< HEAD


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
=======


connection.connect((err, res) => {
    if (err) throw err
    console.log('DB connected')
})
>>>>>>> 5b290b72ef669b3fe3b062da532e03f78649d0db

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