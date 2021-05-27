const jwt = require('jsonwebtoken')
const requestController = require('@@/controllers/requestController')
const path = require('path')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.sendFile(path.resolve(process.cwd(), 'dist', 'error', '401.html'))
        }
        token = token.split(' ')[1] // Bearer token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const requestRoles = await requestController.getRoles(req.originalUrl)
        let hasRole = false
        decoded.roles.forEach(role => {
            if (requestRoles.includes(role) || role == 'Admin') {
                hasRole = true
            }
        })
        if (!hasRole) {
            return res.sendFile(path.resolve(process.cwd(), 'dist', 'error', '403.html'))
        }
        req.user = decoded
        next()
    } catch (e) {
        return res.sendFile(path.resolve(process.cwd(), 'dist', 'error', '500.html'))
    }
}