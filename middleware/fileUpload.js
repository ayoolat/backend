const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        try{
            cb(null, 'uploads/paceImages/')
        }catch(err){
            res.send(err)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const imageFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    }else{
        cb('please upload an image file', false)
    }
}

exports.uploadImage = multer({storage : storage, imageFilter : imageFilter})
exports.fileUpload = multer({storage : storage})

