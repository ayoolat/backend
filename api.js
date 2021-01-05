// npm packages
let port = process.env.PORT
let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')
var cors = require('cors')

const app = express()
app.use(bodyParser.json())

app.use(cors())

// exported modules
const usersRoute = require('./Routes/usersRoute')
const notificationsRoute = require('./Routes/notificationsRoute')
const taskRoute = require('./Routes/tasksRoute')
const todoRoute = require('./Routes/todoRoute')
const feedbackRoute = require('./Routes/feedbackRoute')
const calendarRoute = require('./Routes/calendarRoute')
const eScheduleRoute = require('./Routes/e-scheduleRoute')
// const taskSheetRoute = require('./Routes/taskSheetRoute')


// app.use((error, req, res, next) => {
//     if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//             console.log(err)
//         })
//     }
// })

// instantiate controllers
app.use('/api/users', usersRoute)
app.use('/api/companyName/notifications', notificationsRoute)
app.use('/api/companyName/tasks', taskRoute)
app.use('/todo', todoRoute)
app.use('/feedback', feedbackRoute)
app.use('/api/companyName/calendar', calendarRoute)
app.use('/api/companyName/E-schedule', eScheduleRoute)
// app.use('/api/companyName/taskSheet', taskSheetRoute)

// app.use((req, res, next) => {
//     throw new error('This route does not exist')
// })

// app.use((error, req, res, next) => {
//     if(res.headerSent){
//         return next(error)
//     }
//     res.status(error.code || 500)
//     res.json({message: error.message || 'Unknown error occurred'})
// })


app.listen(port)
console.log('Listening on port 8000')

