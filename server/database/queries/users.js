const connection = require('../config/connection')

exports.addUserQuery = (userData) => {
    const { name, email, password, type, phone, img_url } = userData
    return connection.query('INSERT INTO users (name, email, password, role, mobile, img_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, img_url',
        [name, email, password, type, phone, img_url])
}

exports.loginQuery = (email) => {
    return connection.query('SELECT password FROM users WHERE email = $1', [email])
}

exports.getUserByEmailQuery = (email) => {
    return connection.query('SELECT id, name, email, role, img_url FROM users WHERE email = $1', [email])
}