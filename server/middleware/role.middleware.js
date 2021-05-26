const jwt = require('jsonwebtoken')
const requestController = require('../controllers/requestController')
const ApiError = require('../error/api.error')

module.exports = function () {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const requestRoles = await requestController.getRoles(req.originalUrl)
            const token = req.headers.authorization.split(' ')[1] // Bearer token
            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            let hasRole = false
            decoded.roles.forEach(role => {
                if (requestRoles.includes(role) || role == 'Admin') {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({ message: 'Нет доступа' })
            }
            req.user = decoded
            next()
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}