// npm packages
let port = process.env.PORT || 8000
let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')
let cors = require('cors')

const app = express()
app.use(bodyParser.json())
    
app.use(cors())

// exported modules
const usersRoute = require('./Routes/usersRoute')
const notificationsRoute = require('./Routes/notificationsRoute')
const taskRoute = require('./Routes/tasksRoute')
const todoRoute = require('./Routes/todoRoute')
const contactRoute = require('./Routes/contactRoute')
const calendarRoute = require('./Routes/calendarRoute')
const eScheduleRoute = require('./Routes/e-scheduleRoute')
const taskSheetRoute = require('./Routes/taskSheetRoute')
const managePermissions = require('./Routes/managePermissionRoute')
const timeSheet = require('./Routes/timeSheetRoute')

// instantiate controllers
app.use('/api/users', usersRoute)
app.use('/api/notifications', notificationsRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/todo', todoRoute)
app.use('/api/contact-us', contactRoute)
app.use('/api/calendar', calendarRoute)
app.use('/api/E-schedule', eScheduleRoute)
app.use('/api/taskSheet', taskSheetRoute)
app.use('/api/permissions', managePermissions)
app.use('/api/timeSheet', timeSheet)
// app.use((error, req, res, next) => {
//     if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//             console.log(err)
//         })
//     }
// })

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