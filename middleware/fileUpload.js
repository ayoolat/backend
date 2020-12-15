const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, '/paceImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const imageFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    }else{
        cb('please upload an image file', false)
    }
}

var uploadImage = multer({storage : storage, imageFilter : imageFilter})

module.exports = uploadImage


