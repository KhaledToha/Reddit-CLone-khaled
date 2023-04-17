const Joi = require('joi');


exports.SignUpSchema = Joi.object({


    name: Joi.string().alphanum().required().min(3).max(7),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('[a-zA-Z0-9]{6,30}$')),
    confirmPassword: Joi.ref('password'),
    type: Joi.string().valid('admin','user'),
    phone: Joi.string().pattern(new RegExp('059{1}[9528]{1}[0-9]{6}')),
    img_url: Joi.string()
})

exports.LoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(6).required()
})

