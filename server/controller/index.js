const express = require('express')
const { errHandling } = require('../middlelware/error')
const users = require('./users')

const router  = express.Router()

router.post('/signup', users.addUser)
router.post('/login', users.login)

router.use(errHandling)



module.exports = router