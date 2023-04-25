require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.jwtSign = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

exports.jwtVerify = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.verify(payload, process.env.SECRET_KEY, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}

