
const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
<<<<<<< HEAD
    const Validation = schema.validate(req.body)

    if(Validation.error){
      res.status(422).json({ error: Validation.error.details[0].message})
    }else{
      next()
    }
  }
=======
  const Validation = schema.validate(req.body)

  if(Validation.error){
    res.status(422).json({ error: Validation.error.details[0].message})
  }else{
    next()
  }
}
>>>>>>> 7cd19922bf7d71617deba910af92936141631a5a
} 
module.exports = middleware;