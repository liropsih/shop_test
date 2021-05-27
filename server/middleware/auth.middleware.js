const jwt = require('jsonwebtoken')
const ApiError = require('@@/error/api.error')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        let token = req.headers.authorization
        if (!token) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }
        token = token.split(' ')[1] // Bearer token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        next(ApiError.internal(e.message))
    }
}