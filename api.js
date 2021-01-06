// npm packages
let port = process.env.PORT
let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')
let cors = require('cors')

const app = express()
app.use(bodyParser.json())

let corsOption ={
    origin : true,
    methods : 'GET,HEAD,PUT,PATCH,POST,DELETE,',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}

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
app.use('/contact-us', contactRoute)
app.use('/api/companyName/calendar', calendarRoute)
app.use('/api/companyName/E-schedule', eScheduleRoute)
app.use('/api/companyName/taskSheet', taskSheetRoute)
app.use('/api/companyName/permissions', managePermissions)

app.use((req, res, next) => {
    throw new error('This route does not exist')
})

// app.use((error, req, res, next) => {
//     if(res.headerSent){
//         return next(error)
//     }
//     res.status(error.code || 500)
//     res.json({message: error.message || 'Unknown error occurred'})
// })


app.listen(port)
console.log('Listening on port 8000')