// require npm packages
const mysql = require('mysql')
require('dotenv').config()

//create mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'toluwanimi',
    password: 'password',
    database: 'pacetimesheet_'
    
})

// [mysql://b726afb036f0bd:3fdf3077@us-cdbr-east-02.cleardb.com/heroku_ec0bd4ee53407d5?reconnect=true]



module.exports = connection