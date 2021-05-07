require('dotenv').config()
const express = require('express')

const PORT = process.env.port

const path = require('path')
const { dirname } = require('path')

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

app.listen(PORT, () => console.log('Express server listening on port ' + PORT))