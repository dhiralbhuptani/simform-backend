const joi = require('joi');

exports.registrationValidator = joi.object({
  firstName: 
    joi.string()
    .trim(true)
    .required()
    .error(new Error('First name is required!')),
  lastName: 
    joi.string()
    .trim(true)
    .required()
    .error(new Error('Last name is required!')),
  email: 
    joi.string()
    .email({ minDomainSegments: 2 })
    .trim(true)
    .required(),
  password: 
    joi.string()
    .min(8)
    .trim(true)
    .required()
});

exports.loginValidator = joi.object({  
  email: 
    joi.string()
    .email({ minDomainSegments: 2 })
    .trim(true)
    .required(),
  password: 
    joi.string()
    .min(8)
    .trim(true)
    .required()
    .error(new Error('Password is required!')),
});