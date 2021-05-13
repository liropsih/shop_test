const ApiError = require('../error/api.error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, UserRole, Role, Cart } = require('../models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async register(req, res, next) {
        const { email, password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const role = await Role.findOne({ where: { value: 'User' } })
        const user = await User.create({ email, password: hashPassword })
        const userRole = await UserRole.create({ userId: user.id, roleId: role.id })
        const cart = await Cart.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, role.value)
        return res.json(token)
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не существует'))
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const userRole = await UserRole.findAll({ where: { userId: user.id } })
        let userRoleMassive = []
        for (const [key, value] of Object.entries(userRole)) {
            const role = await Role.findOne({ where: { id: value.roleId } })
            userRoleMassive[key] = role.value
        }
        // const userRole = await UserRole.findOne({ where: { userId: user.id } })
        // const role = await Role.findOne({ where: { id: userRole.roleId } })
        const token = generateJwt(user.id, user.email, userRoleMassive)
        return res.json(token)
    }

    async authCheck(req, res, next) {
        const token = generateJwt(user.id, user.email, user.role)
        return res.json(token)
    }

    async roleAdd(req, res) {
        try {
            const { role } = req.body
            Role.create({ value: role })
            return res.json({ message: 'Роль сохранена' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async roleChange(req, res) {
        try {
            const { email, role } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не существует'))
            }
            const roleCh = await Role.findOne({ where: { value: role } })
            const userRole = await UserRole.create({ userId: user.id, roleId: roleCh.id })
            return res.json({ message: 'Роль добавлена' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new UserController()