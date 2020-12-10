// npm packages
let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')

// exported modules
let userControllers = require('./controllers/userControl')
let taskControllers = require('./controllers/taskControl')
let todoControllers = require('./controllers/todoController')
let feedback = require('./controllers/feedback')
const timeSheetController = require('./controllers/timesheetController')
const calendarController = require('./controllers/calenderContol')
const eScheduleController = require('./controllers/e-schedule')
app = express()
app.use(bodyParser.json())

app.use((error, req, res, next) => {
    if (req.file){
        fs.unlink(req.file.path, (err) => {
            console.log(err)
        })
    }
})
// instantiate controllers
userControllers(app)
taskControllers(app)
todoControllers(app)
feedback(app)
calendarController(app)
eScheduleController(app)
timeSheetController(app)


app.listen(8000)
console.log('Listening on port 8000')