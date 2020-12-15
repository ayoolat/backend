function authorize(req, next, can){
    console.log(can, req,next)
    permitDetails = req.respData.response.find(x => x.permitItem == can)
    next()
}

module.exports = authorize