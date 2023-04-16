const { addUserQuery } = require('../database/queries/index')
const CustomError = require('../helper/customError')
const { jwtSign } = require('../helper/jwtSign')
const { SignUpSchema } = require('../validation/authValidation')
const bcrybt = require('bcrypt')

exports.addUser = (req, res, next) => {
    const { password } = req.body
    let userData;

    SignUpSchema.validateAsync(req.body, { abortEarly: false })
        .then(value => bcrybt.hash(password, 7))


        .then((hashedPass) => {
            req.body.password = hashedPass
            return addUserQuery(req.body)
        })
        .then(data => {
            userData = data.rows[0]
            return jwtSign(data.rows[0])
        })
        .then(result => res.cookie('token', result).json({
            error: false,
            message: 'User Created Successfully',
            data: userData
        }))
        .catch((err) => {
            if(err.isJoi){
                next(new CustomError(400, err.details))
            }else{
                next(new CustomError(500, 'Internal Server Error'))
            }
        })


}