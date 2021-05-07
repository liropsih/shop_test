"use strict"
const express = require('express')
// const config = require('config')
require('dotenv').config()
const path = require('path')
const { dirname } = require('path')

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
if (process.env.NODE_ENV === 'production') {
    app.use('/admin', express.static(path.join(__dirname, 'dist', 'admin')))
    app.get('/admin/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'admin', 'index.html'))
    })
    app.use('/', express.static(path.join(__dirname, 'dist', 'index')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index', 'index.html'))
    })
}
// const router = express.Router()

const PORT = process.env.PORT

// router.use(bodyParser.urlencoded({ extended: false }))
// router.use(bodyParser.json())



// app.use(router)
app.listen(PORT, () => console.log('Express server listening on port ' + PORT))