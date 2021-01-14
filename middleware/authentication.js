authenticateToken = function(req, res, next) {
    //require npm package jasonWebToken
    const jwt = require('jsonwebtoken')

    const authenticationHeader = req.headers['authorization']
    const Token = authenticationHeader && authenticationHeader.split(' ')[1]

    // if(Token == null) return res.status(401).json({error:'Unauthorized request'})
    if(Token == null) return res.status(401).json({error:'Unauthorized request'})


    jwt.verify(Token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
        if(err) return res.status(401).json({error:'invalid token or token expired'})
        // if(err) return res.status(401).send(err)
        req.respData = data
        next()
    })
}

module.exports = authenticateToken


