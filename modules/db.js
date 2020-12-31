// require npm packages
const mysql = require('mysql')

//create mysql connection
var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'toluwanimi',
    // password: 'password',
    // database: 'pacetimesheet_'
    host: '@us-cdbr-east-02.cleardb.com',
    user: 'b726afb036f0bd',
    password: '3fdf3077',
    database: 'heroku_ec0bd4ee53407d5'    
})

// [mysql://b726afb036f0bd:3fdf3077@us-cdbr-east-02.cleardb.com/heroku_ec0bd4ee53407d5?reconnect=true]

connection.connect((err, res) => {
    if (err) throw err
    console.log('DB connected')
})

module.exports = connection