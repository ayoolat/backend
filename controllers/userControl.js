require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const util = require('util');

// exported modules
let connection = require('../modules/db')
console.log('users')

// Middleware import
const authenticateToken = require('../middleware/authentication')
const sendMail = require('../middleware/mailer')

const notificationControl = require('./notificationControl')

connection.query = util.promisify(connection.query);

// sign up Company(post company)
exports.signUp =  (req, res, next) =>{
    const {companyName, email, companyType, password} = req.body
    // hash password
    bcrypt.hash (password, 10, (err, hash) => {
        // handle error
        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
        
        // handle success
        if (hash){
            queryDB()
            async function  queryDB() {
                try{
                    await connection.query(`INSERT INTO company (companyName, email, companyType)
                    VALUES ('${companyName}', '${email}', '${companyType}')`)

                    await connection.query(`INSERT INTO staff (companyID, password, email, roleID, username)
                    VALUES (LAST_INSERT_ID(), '${hash}', '${email}', '1', '${email}')`) 
                    
                    await connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('1', LAST_INSERT_ID(), '1'), 
                    ('1', LAST_INSERT_ID(), '2'), ('1', LAST_INSERT_ID(), '5'), ('1', LAST_INSERT_ID(), '6'), 
                    ('1', LAST_INSERT_ID(), '7'), ('1', LAST_INSERT_ID(), '8'), ('1', LAST_INSERT_ID(), '9'), 
                    ('1', LAST_INSERT_ID(), '10'), ('1', LAST_INSERT_ID(), '11'), ('1', LAST_INSERT_ID(), '12'), 
                    ('1', LAST_INSERT_ID(), '13'), ('1', LAST_INSERT_ID(), '14')`)

                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                
                }catch(err){
                    return res.status(500).json({message: 'This email already exists'})
                }
            }   
        }
    })
}

// sign up User fromAdmin
exports.employeeSignUp = (req, res, next) => {
    const {companyID, email, roleID, expectedWorkHours, billRateCharge, staffRole} = req.body
    const userName = email.split('@')[0]
    const password = 'password'

    permitDetails = req.respData.response.find(x => x.permitItem == 'Add user')
    if(permitDetails.permit ===  'allowed'){            
        // hash password
        bcrypt.hash(password, 10, (err, hash) => {
            // handle error
            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
            // handle success
            if(hash){
                // insert employee details into database
                connection.query(`INSERT INTO staff (password, userName, companyID, email, roleID, expectedWorkHours, billRateCharge, staffRole, tokenUsed)
                    VALUES ('${hash}', '${userName}', '${companyID}', '${email}', '${roleID}', '${expectedWorkHours}', '${billRateCharge}', '${staffRole}', 'false')`, 
                    (err, resp) =>{

                    if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                    // insert permissions
                    if(resp){
                        confirmationToken = crypto.randomBytes(20).toString('hex')
                        
                        connection.query(`UPDATE staff SET confirmationToken = '${confirmationToken}', tokenUsed = 'false' WHERE email = '${email}'`, (err, respConfirm) => {
                            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                            if(respConfirm){
                                sendMail(
                                    'ayoola.toluwanimi@lmu.edu.ng',
                                    'ayoola_toluwanimi@yahoo.com',
                                    'Password reset link',
                                    `<p>Please click the link below to reset you password<p/>
                                    <a href = '/api/companyName/users/companyName/confirmation/${resp.insertID}'>/api/companyName/users/companyName/userProfile/passwordReset/${passwordResetToken}/${respQuery[0].staffID}<a/>`,
                                    'To reset your password',
                                    (errMail, info) => {
                                        if(errMail){return res.status(500).json({message: 'There has been an error, try again'})}
                                                    
                                        return res.json({
                                            message : 'A confirmation link has been sent to the user',
                                            data : respData
                                        })
                                        
                                    }
                                )
                            }
                            
                        })
                        if (roleID === 2){
                            // If user role is co-Admin (i.e roleID = 2)
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', LAST_INSERT_ID(), '1'), 
                                ('1', LAST_INSERT_ID(), '2'), ('1', LAST_INSERT_ID(), '5'), ('1', LAST_INSERT_ID(), '6'), 
                                ('1', LAST_INSERT_ID(), '7'), ('1', LAST_INSERT_ID(), '8'), ('2', LAST_INSERT_ID(), '9'), 
                                ('1', LAST_INSERT_ID(), '10'), ('1', LAST_INSERT_ID(), '11'), ('1', LAST_INSERT_ID(), '12'), 
                                ('1', LAST_INSERT_ID(), '13'), ('1', LAST_INSERT_ID(), '13')`, (err, resp) => {

                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'Success! A confirmation link has been sent to the user',
                                        data : req.body
                                    })
                                }
                            })
                        }
                        // If user role is internal Admin (i.e roleID = 4)
                        if (roleID === '4'){
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', LAST_INSERT_ID(), '1'), 
                                ('2', LAST_INSERT_ID(), '2'), ('2', LAST_INSERT_ID(), '5'), ('1', LAST_INSERT_ID(), '6'), 
                                ('2', LAST_INSERT_ID(), '7'), ('1', LAST_INSERT_ID(), '8'), ('2', LAST_INSERT_ID(), '9'), 
                                ('1', LAST_INSERT_ID(), '10'), ('2', LAST_INSERT_ID(), '11'), ('1', LAST_INSERT_ID(), '12'), 
                                ('2', LAST_INSERT_ID(), '13'), ('2', LAST_INSERT_ID(), '13')`, (err, resp) => {

                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'Success! A confirmation link has been sent to the user',
                                        data : req.body
                                    })
                                }
                            })
                        }
                        // If user role is employee (i.e roleID = 5)
                        if (roleID === '5'){
                            connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', LAST_INSERT_ID(), '2'), 
                                ('2', LAST_INSERT_ID(), '2'), ('2', LAST_INSERT_ID(), '5'), ('2', LAST_INSERT_ID(), '6'), 
                                ('2', LAST_INSERT_ID(), '7'), ('2', LAST_INSERT_ID(), '8'), ('2', LAST_INSERT_ID(), '9'), 
                                ('2', LAST_INSERT_ID(), '10'), ('2', LAST_INSERT_ID(), '11'), ('2', LAST_INSERT_ID(), '12'), 
                                ('2', LAST_INSERT_ID(), '13'), ('2', LAST_INSERT_ID(), '13')`, (err, resp) => {

                                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                                if(resp){
                                    return res.json({
                                        status : 'Success! A confirmation link has been sent to the user',
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

// Confirm employee signUp
exports.confirmSignUp = (req, res, next) => {
    const {password} = req.body
    const {id} = req.params
    connection.query(`SELECT tokenUsed FROM staff WHERE staffID = ${id}`, (err, respToken) => {
        if(err){return res.status(500).json({message: 'There has been an error, try again'})}

        if(respToken){
            if(respToken[0].tokenUsed == 'false'){
                connection.query(`UPDATE staff SET tokenUsed = 'true'`,(err, respConfirm) => {
                    if(err){return res.status(500).json({message: 'There has been an error, try again'})}

                    if(respConfirm){
                        bcrypt.hash(password, 10, (err, hash) => {
                            if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                
                            if(hash){
                                connection.query(`UPDATE staff SET password = '${hash}' WHERE `, (err, resp) => {
                                    if(err) {return res.status(500).json({message: 'There has been an error, try again'})}
                
                                    if(resp){
                                        let payload = { 'data': resp }
                            
                                        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '3600000' })

                                        let respData = {
                                            'data': resp,
                                            'accessToken': accessToken
                                        }

                                        return res.json({
                                            status : 'success',
                                            data : respData
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }

            if(respToken[0].tokenUsed == 'true'){
                return res.json({
                    message : 'This link has been used before',
                })
            }
        }
        
    })

}

// login user
exports.userLogin = (req, res, next) => {
    const {email, password} = req.body
    // get user with user email
    connection.query(`SELECT s.firstName, s.lastName, s.password, s.expectedWorkHours, s.billRateCharge, s.departmentID, s.companyID, s.staffID, permit, permitItem, roleID 
    from permissions p JOIN staff s ON s.staffID = p.staffID 
    JOIN permitItem pi ON pi.permitItemID = p.permitItemID
    JOIN permit pe ON pe.permitID = p.permitID
    WHERE email = '${email}'`, 
    (err, resp) => {

        if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
       
        //if user email not in database
        if(resp === []){
            return res.json({message: 'User does not exist'})
        }
        
        //if user email in database
        if(resp){
            //check if password matches
            bcrypt.compare(password, resp[0].password, (hashErr, valid) => {
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
        }
    })
}

// get all staff
exports.getAllCompanyStaff = (req, res, next) => {
    permitDetails = req.respData.response.find(x => x.permitItem == 'View all company users')
    if(permitDetails.permit === 'allowed'){
        // queryDB()
        // async function queryDB() {
        //     try{
        //         await connection.query(`select * from staff where companyID = ${req.params.companyID} `)

        //         return res.json({
        //             status : 'success',
        //             data : resp
        //         })
        //     }
        //     catch(err){
        //         res.json({"error" : err[0]})
        //         // return res.status(500).json({message: 'There has been an error, please try again'}) 
        //     }
        // }
        
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

// Update company record
exports.updateCompanyRecord = (req, res, next) => {
    const {companyAdjective, companyType, currency} = req.body
    const {id} = req.params
    // =====================================================================
    // ******************** CHANGE PERMISSION ******************************
    // =====================================================================
    permitDetails = req.respData.response.find(x => x.permitItem == 'Edit user billing and time')
    if(permitDetails.permit === 'allowed'){
        if(permitDetails.companyID == id){
            connection.query(`UPDATE company SET companyType = '${companyType}', companyAdjective='${companyAdjective}', currency = '${currency}', lastUpdated = NOW() WHERE companyID = ${id}`,
            (err, resp) => {
                if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}

                if(resp){
                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                } 
            })
        }else{
            return res.status(500).json({message: 'You do not have permission to edit company details'})
        }
    }  
}

// Add department
exports.addDepartment = (req, res, next) => {
    const {departmentName} = req.body
    const {id} = req.params
    // =====================================================================
    // ******************** CHANGE PERMISSION ******************************
    // =====================================================================
    permitDetails = req.respData.response.find(x => x.permitItem == 'Edit user billing and time')
    if(permitDetails.permit === 'allowed'){
        if(permitDetails.companyID == id){
            connection.query(`INSERT INTO company (departmentName, companyID) VALUES(${departmentName}, ${id})`,
            (err, resp) => {
                // if(err) {return res.status(500).json({message: 'There has been an error, please try again'})}
                if(err) res.send(err)

                if(resp){
                    return res.json({
                        status : 'success',
                        data : req.body
                    })
                } 
            })
        }else{
            return res.status(500).json({message: 'You do not have permission to edit company details'})
        }
    }  
}

// Update user record
exports.updateUserRecord = (req, res, next) => {
    const {firstName, lastName, phoneNumber, address, userName,} = req.body
    const {id} = req.params

    image = req.file.path.replace("/\\/g", "//")
    connection.query(`UPDATE staff SET firstName = '${firstName}', lastName='${lastName}', phoneNumber =  '${phoneNumber}', address = '${address}', 
    userName = '${userName}', image = '${image}', lastUpdated = NOW() WHERE staffID = ${id}`,
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

// read company
exports.viewCompanyProfile = (req, res, next) => {
    const {id} = req.params
    if(req.respData.response[0].staffID == id){
        connection.query(`select * from company where staffID = ${id}`, (err, resp) => {
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

// edit employee time and billing
exports.timeAndBilling = (req, res, next) => {
    const {expectedWorkHours, billRateCharge, departmentID} = req.body
    const {id} = req.params

    permitDetails = req.respData.response.find(x => x.permitItem == 'Edit user billing and time')
    if(permitDetails.permit === 'allowed'){
        connection.query(`UPDATE staff SET expectedWorkHours = '${expectedWorkHours}', 
        billRateCharge ='${billRateCharge}', departmentID = '${departmentID}' lastUpdated = NOW()'
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
                    'staffID' : id,
                    'heading' : 'User details update',
                    'body' :  `Your bill rate charge has been updated to ${billRateCharge} and expected hours updated to ${expectedWorkHours}`,
                    'status' : 'false'
                }
                notificationControl.logNotification(notified, res)
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

// password reset
exports.resetPassword = (req, res, next) => {
    const {email} = req.body
    connection.query(`SELECT password, passwordResetExpires, staffID, tokenUsed FROM staff WHERE email = '${email}' `, (errQuery, respQuery) => {
        if(errQuery){
            // {return res.status(500).json({message: 'There has been an error, try again'})}
        }

        if(respQuery){
            // generate a crypto code
            passwordResetToken = crypto.randomBytes(20).toString('hex')
            // Set expiration time to one hour after crypto code was generated
            passwordResetExpires = Date.now() + 3600000
            console.log(passwordResetExpires)
            // insert code, expiration time and link status to
            connection.query(`UPDATE staff SET passwordResetToken = "${passwordResetToken}", passwordResetExpires = '${passwordResetExpires}' ,tokenUsed = 'false' , lastUpdated = NOW() WHERE email = '${email}'`, (err, resp) => {
                if(resp){
                    sendMail(
                        'ayoola.toluwanimi@lmu.edu.ng',
                        'ayoola_toluwanimi@yahoo.com',
                        'Password reset link',
                        `<p>Please click the link below to reset you password<p/>
                        <a href = '/api/companyName/users/companyName/userProfile/passwordReset/${passwordResetToken}/${respQuery[0].staffID}'>/api/companyName/users/companyName/userProfile/passwordReset/${passwordResetToken}/${respQuery[0].staffID}<a/>`,
                        'To reset your password',
                        (errMail, info) => {
                            // if(errMail){return res.status(500).json({message: 'There has been an error, try again'})}
                            
                            let payload = { 'response': respQuery }
                            
                            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '3600000' })

                            let respData = {
                                'response': respQuery,
                                'accessToken': accessToken
                            }

                            return res.json({
                                message : 'Reset password link has been sent to your email',
                                data : respData
                            })
                            
                        }
                    )
                }

                if(err) {return res.status(500).json({message: 'There has been an error, try again'})}
            })
        }
    })
}

exports.setNewPassword = (req, res, next) => {
    connection.query(`SELECT tokenUsed, password from staff where staffId = '${req.params.id}'`, (err, respQuery) => {
        if(err) {return res.status(500).json({message: 'There has been an error, try again'})}

        if(respQuery){
            console.log(respQuery[0])
            if( respQuery[0].tokenUsed == 'false'){

                connection.query(`UPDATE staff SET tokenUsed = 'true' where staffID = '${req.params.id}'`,(err, respReset) => {
                if(err){return res.status(500).json({message: 'There has been an error, try again'})}
                
                if(respReset){
                    bcrypt.compare(req.body.password, respQuery[0].password, (hashErr, valid) => {

                        if(valid){
                            if(respQuery[0].password == req.body.password){

                                return res.json({
                                    message : 'Password cannot be the same',
                                })
                            }
                        }

                        if(!valid){
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if(err){return res.status(500).json({message: 'There has been an error, try again'})}
                    
                                if(hash){
                                    connection.query(`UPDATE staff SET password = '${hash}' WHERE staffID = '${req.params.id}'`, (err, resp) => {
                                        if(err){
                                            res.statusCode = 401
                                            res.send(err)
                                        }
                    
                                        if(resp){
                                            return res.json({
                                                message : 'Password Updated',
                                            })
                                        }
                                    })
                                }
                            })
                        }

                        if(hashErr){return res.status(500).json({message: 'There has been an error, try again'})}

                    })
                }

                if(err){return res.status(500).json({message: 'There has been an error, try again'})}

                })
            }
            if( respQuery[0].tokenUsed == 'true'){
                    return res.json({
                    message : 'This token has been used before',
                })
            }
        }
    })
}
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