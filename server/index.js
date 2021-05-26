require('dotenv').config()
require('module-alias/register')
const express = require('express')
const sequelize = require('./database')
const models = require('./models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes')
const errorHandler = require('./middleware/error.middleware')
const path = require('path')

const PORT = process.env.port || 3000

// const path = require('path')
// const { dirname } = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static/item/img')))
app.use(fileUpload({}))
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
    app.use('/admin', express.static(path.join(__dirname, '../dist/admin')))
    app.get('/admin/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/admin/index.html'))
    })
    app.use('/', express.static(path.join(__dirname, '../dist/client')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/client/index.html'))
    })
}

// Обработка ошибок (последний Middleware)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await models.createTableRecords()
        app.listen(PORT, () => console.log('Express server listening on port ' + PORT))
    } catch (e) { console.log(e) }
}

start()

// app.use(express.json({ extended: true }))

// // CORS middleware
// const allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
// }
// app.use(allowCrossDomain)

// app.use('/api/auth', require('../routes/auth.routes'))

// if (process.env.NODE_ENV === 'production') {
//     app.use('/admin', express.static(path.join(__dirname, 'dist', 'admin')))
//     app.get('/admin/*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'dist', 'admin', 'index.html'))
//     })
//     app.use('/', express.static(path.join(__dirname, 'dist', 'index')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'dist', 'index', 'index.html'))
//     })
// }
