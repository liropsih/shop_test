const jwt = require('jsonwebtoken')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer token
            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            let hasRole = false
            decoded.role.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            // if (roles.includes(decoded.role)) {
            //     hasRole = true
            // }
            if (!hasRole) {
                return res.status(403).json({ message: 'Нет доступа' })
            }
            // if (decoded.role !== role) {
            //     return res.status(403).json({ message: 'Нет доступа' })
            // }
            req.user = decoded
            next()
        } catch (e) {
            console.log(e)
            res.status(401).json({ message: 'Пользователь не авторизован' })
        }
    }
}