"use strict"
const express = require('express')
const config = require('config')

// const bcrypt = require('bcrypt')
// const bcrypt_config = require('./bcrypt.config')
// const jwt = require('jsonwebtoken')
// const bodyParser = require('body-parser')

const app = express()
app.use(express.json({ extended: true }))
// CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
}
app.use(allowCrossDomain)

app.use('/api/auth', require('./routes/auth.routes'))
// const router = express.Router()

const PORT = config.get('port')

// router.use(bodyParser.urlencoded({ extended: false }))
// router.use(bodyParser.json())



// app.use(router)

app.listen(PORT, () => console.log('Express server listening on port ' + PORT))