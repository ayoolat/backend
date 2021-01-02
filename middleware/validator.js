const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
  const Validation = schema.validate(req.body)

  if(Validation.error){
    res.status(422).json({ error: Validation.error.details[0].message})
  }else{
    next()
  }
}
} 
module.exports = middleware;