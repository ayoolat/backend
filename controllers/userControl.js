<<<<<<< HEAD
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

// exported modules
let connection = require('../modules/db')
const authenticateToken = require('../middleware/authentication')
const imageUpload = require('../middleware/fileUpload')

const notificationControl = require('./notificationControl')
notificationControl(app)
 // sign up Company(post company)
exports.signUp =  (req, res, next) =>{
    const {companyName, email, companyType, password} = req.body
    // hash password
    bcrypt.hash(password, 10, (err, hash) => {
        // handle error
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        // handle success
        if (hash){
            connection.query(`INSERT INTO company (companyName, password, email, companyType)
            VALUES ('${companyName}', '${hash}', '${email}', '${companyType}')`, 
            (err, resp) => {
                // handle error
                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                // handle success
                // Create admin user, add details to staff table
                if(resp){ 
                    connection.query(`INSERT INTO staff (companyID, password, email, roleID, username)
                    VALUES (@@IDENTITY, '${hash}', '${req.body.email}', '1', '${req.body.email}')
                    `, (err, resp) => {
                        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                        if(resp){
                            // Insert default admin user permissions
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('1', @@IDENTITY, '1'), 
                            ('1', @@IDENTITY, '2'), ('1', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                            ('1', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('1', @@IDENTITY, '9'), 
                            ('1', @@IDENTITY, '10'), ('1', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                            ('1', @@IDENTITY, '13'), ('1', @@IDENTITY, '14')`, (err, resp) => {
                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'success',
                                        data : req.body
                                    })
                                }
                            })
                        }
                    })
                }
            })
=======
let userController = (app) => {
    // require npm packages
    require('dotenv').config()
    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    const crypto = require('crypto')

    // exported modules
    let connection = require('../modules/db')
    const authenticateToken = require('../controllers/authentificate/authentification')
    const imageUpload = require('../modules/fileUpload')

    console.log('users connected')

    // **********************************************************************************************************
    // *********************************************** SIGN UP **************************************************

    // sign up Company(post company)
    app.post('/pace-time-sheet/signUp', (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.send('User must enter email and password')
        }

        if (/^[a-zA-Z0-9_]{8,16}$/.test(req.body.password)) {
            // hash password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // handle error
                if (err) throw (err)
                    // handle success
                if (hash) {
                    // add user/company into database
                    connection.query(`INSERT INTO company (companyName, password, email, companyType)
                    VALUES ('${req.body.companyName}', '${hash}', '${req.body.email}', '${req.body.companyType}')`,
                        (err, resp) => {
                            // handle error
                            if (err) {
                                res.statusCode = 401
                                res.end()
                            }
                            // handle success
                            // Create admin user, add details to staff table
                            if (resp) {
                                connection.query(`INSERT INTO staff (companyID, password, email, roleID, username)
                            VALUES (@@IDENTITY, '${hash}', '${req.body.email}', '1', '${req.body.email}')
                            `, (err, resp) => {
                                    if (err) {
                                        res.statusCode = 401
                                        res.send(err)
                                    }

                                    if (resp) {
                                        connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('1', @@IDENTITY, '1'), 
                                    ('1', @@IDENTITY, '2'), ('1', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                    ('1', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('1', @@IDENTITY, '9'), 
                                    ('1', @@IDENTITY, '10'), ('1', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                    ('1', @@IDENTITY, '13'), ('1', @@IDENTITY, '14')`, (err, resp) => {
                                            if (err) {
                                                res.statusCode = 401
                                                res.send(err)
                                            }

                                            if (resp) {
                                                res.send("User company has been created")
                                            }
                                        })
                                    }
                                })
                            }
                        })
                }
            })
        } else {
            res.send('Password must have at least 8 letters')
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007
        }
    })
}

<<<<<<< HEAD
// sign up User fromAdmin
exports.employeeSignUp = (req, res, next) => {
    const {companyID, email, roleID, expectedWorkHours, billRateCharge, staffRole} = req.body
    const userName = email.split('@')[0]
    permitDetails = req.respData.response.find(x => x.permitItem == 'Add user')
    if(permitDetails.permit ===  'allowed'){            
        // hash password
        bcrypt.hash(password, 10, (err, hash) => {
            // handle error
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            // handle success
            if(hash){
                // insert employee details into database
                connection.query(`INSERT INTO staff (password, userName, companyID, email, roleID, expectedWorkHours, billRateCharge, staffRole)
                    VALUES ('${hash}', '${userName}', '${companyID}', '${email}', '${roleID}', '${expectedWorkHours}', '${billRateCharge}', '${staffRole}')`, 
                    (err, resp) =>{

                    if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                    // insert permissions
                    if(resp){
                        if (roleID === 2){
                            // If user role is co-Admin (i.e roleID = 2)
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '1'), 
                                ('1', @@IDENTITY, '2'), ('1', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                ('1', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                ('1', @@IDENTITY, '10'), ('1', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                ('1', @@IDENTITY, '13'), ('1', @@IDENTITY, '13')`, (err, resp) => {

                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'success',
                                        data : req.body
                                    })
                                }
                            })
                        }
                        // If user role is internal Admin (i.e roleID = 4)
                        if (roleID === '4'){
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '1'), 
                                ('2', @@IDENTITY, '2'), ('2', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                ('2', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                ('1', @@IDENTITY, '10'), ('2', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                ('2', @@IDENTITY, '13'), ('2', @@IDENTITY, '13')`, (err, resp) => {

                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'success',
                                        data : req.body
                                    })
                                }
                            })
                        }
                        // If user role is employee (i.e roleID = 5)
                        if (roleID === '5'){
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '2'), 
                                ('2', @@IDENTITY, '2'), ('2', @@IDENTITY, '5'), ('2', @@IDENTITY, '6'), 
                                ('2', @@IDENTITY, '7'), ('2', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                ('2', @@IDENTITY, '10'), ('2', @@IDENTITY, '11'), ('2', @@IDENTITY, '12'), 
                                ('2', @@IDENTITY, '13'), ('2', @@IDENTITY, '13')`, (err, resp) => {

                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'success',
                                        data : req.body
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }else{
        return res.status(403).json({message: 'You do not have permission to add users'})
    }   
}

// login user
exports.userLogin = (req, res, next) => {
    // get user with user email
    connection.query(`SELECT s.firstName, s.lastName, s.password, s.companyID, s.staffID, permit, permitItem, roleID 
    from permissions p JOIN staff s ON s.staffID = p.staffID 
    JOIN permitItem pi ON pi.permitItemID = p.permitItemID
    JOIN permit pe ON pe.permitID = p.permitID
    WHERE email = '${req.body.email}'`, 
    (err, resp) => {

        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

        //if user email not in database
        if(resp === []){
            return res.json({message: 'User does not exist'})
        }

        //if user email in database
        if(resp){
            //check if password matches
            bcrypt.compare(req.body.password, resp[0].password, (hashErr, valid) => {
                //if password does not match
                if(!valid) {return res.status(500).json({message: 'Incorrect password'})}

                if(hashErr) {return res.status(500).json({message: 'There has been an error, please try again'})}

                // if password matches
                let  payload = {'response': resp}

                //get token
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {expiresIn : '3600000'})

                let respData = {
                    'response' : resp,
                    'accessToken' : accessToken
                }
                return res.json({
                    status : 'success',
                    data : respData
                })
            })
=======
    // sign up User fromAdmin
    app.post('/pace-time-sheet/newEmployeeSignUP', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add user')
        if (permitDetails) {
            if (permitDetails.permit === 'allowed') {
                if (!req.body.email || !req.body.password || !req.body.roleID || !req.body.companyID || !req.body.expectedWorkHours || !req.body.billRateCharge || !req.body.staffRole) {
                    res.send('All starred fields must be complete')
                }
                // hash password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // handle error
                    if (err) throw (err)
                        // handle success
                    if (hash) {
                        connection.query(`INSERT INTO staff (password, userName, companyID, email, 
                            roleID, expectedWorkHours, billRateCharge, staffRole)
                            VALUES ('${hash}', '${req.body.userName}', '${req.body.companyID}', 
                            '${req.body.email}', '${req.body.roleID}', '${req.body.expectedWorkHours}', 
                            '${req.body.billRateCharge}', '${req.body.staffRole}')`,
                            (err, resp) => {
                                if (err) {
                                    // res.statusCode = 401
                                    res.send(err)
                                }

                                if (resp) {
                                    if (req.body.roleID === 2) {
                                        // If user role is co-Admin (i.e roleID = 2)
                                        connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '1'), 
                                        ('1', @@IDENTITY, '2'), ('1', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                        ('1', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                        ('1', @@IDENTITY, '10'), ('1', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                        ('1', @@IDENTITY, '13'), ('1', @@IDENTITY, '13')`, (err, resp) => {
                                            if (err) {
                                                // res.statusCode = 401
                                                res.send(err)
                                            }

                                            if (resp) {
                                                res.send("User has been created")
                                            }
                                        })
                                    }
                                    // If user role is internal Admin (i.e roleID = 4)
                                    if (req.body.roleID === '4') {
                                        connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '1'), 
                                        ('2', @@IDENTITY, '2'), ('2', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                        ('2', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                        ('1', @@IDENTITY, '10'), ('2', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                        ('2', @@IDENTITY, '13'), ('2', @@IDENTITY, '13')`, (err, resp) => {
                                            if (err) {
                                                // res.statusCode = 401
                                                res.send(err)
                                            }

                                            if (resp) {
                                                res.send("User has been created")
                                            }
                                        })
                                    }
                                    // If user role is employee (i.e roleID = 5)
                                    if (req.body.roleID === '5') {
                                        connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '2'), 
                                        ('2', @@IDENTITY, '2'), ('2', @@IDENTITY, '5'), ('2', @@IDENTITY, '6'), 
                                        ('2', @@IDENTITY, '7'), ('2', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                        ('2', @@IDENTITY, '10'), ('2', @@IDENTITY, '11'), ('2', @@IDENTITY, '12'), 
                                        ('2', @@IDENTITY, '13'), ('2', @@IDENTITY, '13')`, (err, resp) => {
                                            if (err) {
                                                // res.statusCode = 401
                                                res.send(err)
                                            }

                                            if (resp) {
                                                res.send("User has been created")
                                            }
                                        })
                                    }
                                }
                            })
                    }
                })
            } else {
                res.send('You do not have permission to add a new user')
            }
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007
        }
    })
}

<<<<<<< HEAD
// get all staff
exports.getAllCompanyStaff = (req, res, next) => {
    permitDetails = req.respData.response.find(x => x.permitItem == 'View all company users')
    if(permitDetails.permit === 'allowed'){
        connection.query(`select * from staff where companyID = ${req.params.companyID} `, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }else{
        return res.status(403).json({message: 'You do not have permission to view all staff'})
    } 
}

// Update user record
exports.updateUserRecord = (req, res, next) => {
    const {firstName, lastName, phoneNumber, address, userName,} = req.body
    const {id} = req.params

    permitDetails = req.respData.response.find(x => x.permitItem == 'Edit user billing and time')
    if(permitDetails.permit === 'allowed'){
        if(permitDetails.staffID == id){
            image = req.file.path.replace("/\\/g", "//")
            connection.query(`UPDATE staff SET firstName = '${firstName}', lastName='${lastName}', phoneNumber =  '${phoneNumber}', address = '${address}', 
            userName = '${userName}', image = '${image}', lastUpdated = '${Date.now}' WHERE staffID = ${id}`,
            (err, resp) => {
                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
    
                if(resp){
                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                } 
            })
        }
    }
    
}

// read User
exports.viewProfile = (req, res, next) => {
    const {id} = req.params
    if(req.respData.response[0].staffID == id){
        connection.query(`select * from staff where staffID = ${id}`, (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(resp){
                return res.json({
                    status : 'success',
                    data : resp
                })
            }
        })
    }
}

// change user password
exports.changePassword = (req, res, next) => {
    const {id} = req.params
    const {password} = req.body
    
    if(req.respData.response[0].staffID == id){
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

            if(hash){
                connection.query(`UPDATE staff SET password = '${hash}'`, (err, resp) => {
                    if(err) {return res.status(500).json({message: 'There has been an error, try again'})}

                    if(resp){
                        return res.json({
                            status : 'success',
                            data : resp
                        })
                    }
                })
            }
        })
    }
}
=======
    // **********************************************************************************************************
    // ******************************************* LOGIN USERS **************************************************

    // login user
    app.post('/pace-time-sheet/login', (req, res) => {
        // get user with user email
        connection.query(`SELECT s.firstName, s.lastName, s.companyID, s.staffID, permit, permitItem, roleID 
        from permissions p JOIN staff s ON s.staffID = p.staffID 
        JOIN permitItem pi ON pi.permitItemID = p.permitItemID
        JOIN permit pe ON pe.permitID = p.permitID
        WHERE email = '${req.body.email}'`,
            (err, resp) => {
                if (err) {
                    res.send(err)
                    res.end()
                }

                //if user email not in database
                if (resp == []) {
                    res.send("User does not exist")
                    res.statusCode = 401
                }

                //if user email in database
                if (resp) {
                    //check if password matches
                    bcrypt.compare(req.body.password, resp[0].password, (hashErr, valid) => {
                            //if password does not match
                            if (!valid) {
                                return res.send('invalid login details')
                            }

                            if (hashErr) {
                                return res.send(err)
                            }
                            // if password matches

                            let payload = { 'data': resp } //req.body.data[0].fullname

                            //get token
                            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '3600000' })

                            let respData = {
                                'data': resp,
                                'accessToken': accessToken
                            }
                            res.send(respData)
                                // res.end() 
                        })
                        // res.send(resp[0])
                }
            })
    })
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007

// edit employee time and billing
exports.timeAndBilling = (req, res, next) => {
    const {expectedWorkHours, billRateCharge} = req.body
    const {id} = req.params

<<<<<<< HEAD
    permitDetails = req.respData.response.find(x => x.permitItem == 'Edit user billing and time')
    if(permitDetails.permit === 'allowed'){
        connection.query(`UPDATE staff SET expectedWorkHours = '${expectedWorkHours}', 
        billRateCharge ='${billRateCharge}', lastUpdated = '${Date.now()}'
        where staffID = ${id} and companyID = ${permitDetails.companyID}`,
        (err, resp) => {
            if(err) {return res.status(500).json({message: 'There has been an error, try again'})}

            if(resp == []){
                return res.json({
                    status : 'User does not exist in this company',
                })
            }
            if(resp){
                let notified = {
                    'staffID' : req.params.id,
                    'heading' : 'User details update',
                    'body' :  `Your bill rate charge has been updated to ${req.body.billRateCharge} and expected hours updated to ${req.body.expectedWorkHours}`,
                    'status' : 'false'
                }
                logNotification(notified, res)
                return res.json({
                    status : 'success',
                    data : resp
                })
            } 
        })
    }else{
        res.send('You do not have permission to edit details')
    }  
}
=======
    // read company
    app.get('/pace-time-sheet/database', authenticateToken, (req, res) => {
        // approved = req.user.data.permit.find(x => x.permission == 'allowed')
        connection.query('select * from company', (err, resp) => {
            if (err) throw err
            res.send(req.data)
        })
    })

    // read user
    app.get('/pace-time-sheet/database/staff', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'View all company users')
        if (!!permitDetails) {
            if (permitDetails.permit === 'allowed') {
                connection.query(`select * from staff where companyID = ${companyID}= `, (err, resp) => {
                    if (err) throw err
                    res.send(resp)
                })
            } else {
                res.send('You do not have permission to view all company employees')
            }
        }
    })
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007

const userController = (app) =>{

    // update company details
    app.put('/pace-time-sheet/companyName/companySettings/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Edit company settings')
        if (!!permitDetails) {
            if (permitDetails.permit === 'allowed') {
                // if(permitDetails.companyID === `${req.params.companyID}`){
                connection.query(`UPDATE staff SET firstName = '${req.body.firstName}', lastName='${req.body.lastName}',
                    phoneNumber =  '${req.body.phoneNumber}', address = '${req.body.address}', 
                    userName = '${req.body.userName}' WHERE staffID = ${req.params.id}`,
                        (err, resp) => {
                            if (err) {
                                res.statusCode = 401
                                res.send(err)
                            }

                            if (resp) {
                                res.send('User details have been updated')
                            }
                        })
                    // }
            } else {
                res.send('You do not have permission to edit details')
            }
        } else {
            return res.send('You do not have permission to edit details')
        }

    })

<<<<<<< HEAD
  


    
=======
    // update user details
    app.put('/pace-time-sheet/companyName/employeeEdit/:id', authenticateToken, imageUpload.single('image'), (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Edit user billing and time')
        if (!!permitDetails) {
            if (permit.staffID == req.params.id) {
                image = req.file.path.replace("/\\/g", "//")
                connection.query(`UPDATE staff SET firstName = '${req.body.firstName}', lastName='${req.body.lastName}',
                phoneNumber =  '${req.body.phoneNumber}', address = '${req.body.address}', 
                userName = '${req.body.userName}', image = '${image}', lastUpdated = '${Date.now()}' WHERE staffID = ${req.params.id}`,
                    (err, resp) => {
                        if (err) {
                            res.statusCode = 401
                            res.send(err)
                        }

                        if (resp) {
                            res.send('User details have been updated')
                        }
                    })
            }
        }
    })

    // edit user billing and expected hours
    app.put('/pace-time-sheet/companyName/employeeSettings/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Edit user billing and time')
        if (!!permitDetails) {
            if (permitDetails.permit === 'allowed') {
                connection.query(`UPDATE staff SET expectedWorkHours = '${req.body.expectedWorkHours}', 
                billRateCharge ='${req.body.billRateCharge}', lastUpdated = '${Date.now()}'
                where staffID = ${req.params.id} and companyID = ${permitDetails.companyID}`,
                    (err, resp) => {
                        if (err) {
                            // res.statusCode = 401
                            res.send(err)
                        }
                        if (resp) {
                            let notified = {
                                'staffID': req.params.id,
                                'heading': 'User details update',
                                'body': `Your bill rate charge has been updated to ${req.body.billRateCharge} and expected hours updated to ${req.body.expectedWorkHours}`,
                                'status': 'false'
                            }
                            logNotification(notified, res)
                            res.send('User details have been updated')
                        }
                    })
            } else {
                res.send('You do not have permission to edit details')
            }
        } else {
            return res.send('You do not have permission to edit details')
        }
    })

    // change password
    app.put('/pace-time-sheet/companyName/changePassword', authenticateToken, (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.statusCode = 401
                res.send(err)
            }

            if (hash) {
                connection.query(`password = '${req.body.hash}'`, (err, resp) => {
                    if (err) {
                        res.statusCode = 401
                        res.send(err)
                    }

                    if (resp) {
                        res.send('User details have been updated')
                    }
                })
            }
        })
    })

>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007
    // reset password
    app.post('/pace-time-sheet/companyName/passwordReset', (req, res) => {
        passwordResetToken = crypto.randomBytes(20).toString('hex')
<<<<<<< HEAD
        passwordResetExpires = date.now()+3600000
        connection.query(`INSERT INTO staff (passwordResetToken, passwordResetExpires, tokenUsed) 
        VALUES ("${passwordResetToken}", '${passwordResetExpires}', 'false')`, (req, resp) => {
            if(res){
=======
        passwordResetExpires = date.now() + 3600000
        connection.query(`INSERT INTO staff (passwordResetToken, passwordResetExpires) 
        VALUES (${passwordResetToken}, ${passwordResetExpires})`, (req, resp) => {
            if (res) {
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007
                connection.query(`SELECT passwordResetExpires FROM staff WHERE email = ${req.body.email}`)

                let payload = { 'data': resp }

                //get token
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '3600000' })

                let respData = {
                    'data': resp,
                    'accessToken': accessToken
                }

                res.send(respData)
            }
        })

        res.send('A reset password link has been sent to your mail')
    })

<<<<<<< HEAD
    app.put('/pace-time-sheet/passwordReset/:token/:id',(req, res) => {
        if(req.respData.data.passwordResetExpires > Date.now() ){
            connection.query(`SELECT tokenUsed FROM staff WHERE staffID = ${req.params.id}`, (err, respToken) => {
                if(err){
                    return res.send(err)
                }
                if(resp){
                    if(respToken[0].tokenUsed == 'false'){
                        connection.query(`UPDATE staff SET tokenUsed = 'true'`,(err, respReset) => {
                            if(err){
                                return res.send(err)
                            }
                            if(respReset){
                                bcrypt.hash(req.body.password, 10, (err, hash) => {
                                    if(err){
                                        res.statusCode = 401
                                        res.send(err)
                                    }
                        
                                    if(hash){
                                        connection.query(`UPDATE staff SET password = '${req.body.hash}' WHERE staffID = '${req.params.id}'`, (err, resp) => {
                                            if(err){
                                                res.statusCode = 401
                                                res.send(err)
                                            }
                        
                                            if(resp){
                                                res.send('Your password has been updated')
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }

                    if(respToken[0].tokenUsed == 'true'){
                        res.send('This token has been used before')
                    }
=======
    app.post('/pace-time-sheet/passwordReset/:token', (req, res) => {
        if (req.respData.data.passwordResetExpires > Date.now()) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.statusCode = 401
                    res.send(err)
                }

                if (hash) {
                    connection.query(`password = '${req.body.hash}'`, (err, resp) => {
                        if (err) {
                            res.statusCode = 401
                            res.send(err)
                        }

                        if (resp) {
                            res.send('Your password has been updated')
                        }
                    })
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007
                }
                
            })
        }
    })

    // delete company

    // delete user
    app.delete('/pace-time-sheet/companyName/deleteUser/:id', authenticateToken, (req, res) => {
        connection.query(`DELETE from staff WHERE staffID = ${req.params.id}`, (err, resp) => {
            if (err) {
                res.statusCode = 401
                res.send(err)
            }

            if (resp) {
                res.send('User deleted')
            }
        })
    })
}

<<<<<<< HEAD
// module.exports = userController
// module.exports = signUp
=======
module.exports = userController
>>>>>>> f5e37a920e4fee67721e219132cb7b2fc66e6007
