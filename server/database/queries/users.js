const connection = require('../config/connection')

exports.addUserQuery = (userData) => {
    const { name, email, password, type, phone, img_url } = userData
    return connection.query('INSERT INTO users (name, email, password, role, mobile, img_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [name,email, password, type, phone, img_url])
}