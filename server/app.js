require('dotenv').config()

const express = require('express')

const cookieParser = require('cookie-parser') 

const { join } = require('path')

const router = require('./controller/index')

const app = express()

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(join(__dirname, '..', 'public')))



app.set('port', process.env.PORT || 3000)




app.use(router)


module.exports = app;