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

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static/item/img')))
app.use(fileUpload({}))
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
    app.use('/admin', express.static(path.join(process.cwd(), '/dist/admin')))
    app.get('/admin/*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), '/dist/admin/index.html'))
    })
    app.use('/', express.static(path.join(process.cwd(), '/dist/client')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), '/dist/client/index.html'))
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