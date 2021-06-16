const jwt = require('jsonwebtoken')
const requestController = require('@@/controllers/requestController')
const ApiError = require('@@/error/api.error')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        // let token = req.headers.authorization
        const token = req.headers.authorization
        if (!token) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }
        // token = token.split(' ')[1] // Bearer token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const requestRoles = await requestController.getRoles(req.originalUrl)
        let hasRole = false
        decoded.roles.forEach(role => {
            if (requestRoles.includes(role) || role == 'Admin') {
                hasRole = true
            }
        })
        if (!hasRole) {
            next(ApiError.forbidden('Нет доступа'))
        }
        req.user = decoded
        next()
    } catch (e) {
        next(ApiError.internal(e.message))
    }
}