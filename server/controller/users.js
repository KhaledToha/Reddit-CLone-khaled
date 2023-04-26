
const usersQuery = require('../database/queries/users')
const CustomError = require('../helper/customError')
const { jwtSign } = require('../helper/jwtSign')
const { SignUpSchema } = require('../validation/authValidation')
const { LoginSchema } = require('../validation/authValidation')
const bcrybt = require('bcrypt')

exports.addUser = (req, res, next) => {
    const { password } = req.body
    let userData;

    SignUpSchema.validateAsync(req.body, { abortEarly: false })
        .then(value => bcrybt.hash(password, 7))


        .then((hashedPass) => {
            req.body.password = hashedPass
            return usersQuery.addUserQuery(req.body)
        })
        .then(data => {
            userData = data.rows[0]
            return jwtSign(data.rows[0])
        })
        .then(result => {
            res.cookie('token', result)
            res.redirect(301, '/')
        }

        )
        .catch((err) => {
            if(err.isJoi){
                next(new CustomError(400, err.details))
            }else{
                next(new CustomError(400, 'This email is already existed'))
            }
        })


}


exports.login = (req,res,next) =>{
    const { email, password } = req.body
    let userData;

    LoginSchema.validateAsync(req.body)
    .then(value => usersQuery.loginQuery(email))
    .then((data) => {
        if(data.rows.length == 0) {
            next(new CustomError(400, 'This Email Dosn\'t Exsists'))
        }
        return bcrybt.compare(password, data.rows[0].password)
    })
    .then((result)=> {
        if (result === false){
            next(new CustomError(400, 'Wrong Password'))
        }
        return usersQuery.getUserByEmailQuery(email)
    }).then((data)=>{
        userData = data.rows[0]
       return jwtSign(userData)
    }).then((token)=>{
        // res.cookie('token', token, { path : '/'}).json({
        //     error: false,
        //     message: 'User Logged In Successfully',
        //     data : userData
    // })

        res.cookie('token', token, { path: '/', httpOnly: true})
        return res.redirect(301, '/')
        
    })
    .catch((err)=>{
        if(err.isJoi){
            next(new CustomError(400, err.details))
        }
        else {
            next(new CustomError(500, 'Internal Server Error'))
        }
    })

}

exports.getUserById = (req,res,next)=>{
    usersQuery.getUserByIdQuery(req.params.id)
    .then(data => {
        res.status(200).json({
            error:false,
            message: 'Fetch user data',
            data: data.rows[0]
        })
    })
    .catch(err => next(new CustomError(500, err)))
}