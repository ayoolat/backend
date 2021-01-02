const Joi = require('joi'); 
// const { changePassword } = require('../controllers/userControl');
const schemas = { 
  signUp: Joi.object().keys({ 
    companyType: Joi.string().required(),
    companyName: Joi.string().alphanum().min(3).max(15).required(), 
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  }),

  employeeSignUp: Joi.object().keys({
    companyID : Joi.string().required, 
    roleID : Joi.string().required,
    expectedWorkHours : Joi.string().required,
    billRateCharge : Joi.string().required,
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  }),

  changePassword: Joi.object().keys({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  })
};

module.exports = schemas;
