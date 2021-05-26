const ApiError = require('../error/api.error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role, Cart } = require('../models')

const generateJwt = (id, email, roles) => {
    return jwt.sign(
        { id, email, roles },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, password: hashPassword })
            let role = await Role.findOne({ where: { value: 'User' } })
            role = await user.addRoles([role])
            const roles = role.map(role => role.roleValue)
            await Cart.create({ userId: user.id })
            const token = generateJwt(user.id, user.email, roles)
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email },
                include: Role
            })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не существует'))
            }
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'))
            }
            const roles = user.roles.map(role => role.value)
            const token = generateJwt(user.id, user.email, roles)
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async authCheck(req, res, next) {
        // const token = generateJwt(user.id, user.email, user.role)
        // return res.json(token)
        // return res.json({ message: 'Ok!', user: req.user })
        return res.json({ message: 'Ok!' })
    }

    async changePassword(req, res, next) {
        try {
            const { email, password, newPassword } = req.body
            let user = await User.findOne({
                where: { email },
                include: Role
            })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не существует'))
            }
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'))
            }
            if (!newPassword) {
                return next(ApiError.badRequest('Некорректный новый пароль'))
            }
            const hashPassword = await bcrypt.hash(newPassword, 5)
            user = await user.update({ password: hashPassword })
            const roles = user.roles.map(role => role.value)
            const token = generateJwt(user.id, user.email, roles)
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getUserInfo(req, res, next) {
        try {
            const { email } = req.user
            const { name, lastname, patronymic, phone, birthdate } = await User.findOne({
                where: { email }
            })
            const info = { name, lastname, patronymic, phone, birthdate }
            return res.json(info)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateUserInfo(req, res, next) {
        try {
            const { email } = req.user
            let user = await User.findOne({
                where: { email }
            })
            const { name, lastname, patronymic, phone, birthdate } = req.body
            user = await user.update({ name, lastname, patronymic, phone, birthdate })
            return res.json({ message: 'Данные сохранены' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async userRoleAdd(req, res, next) {
        try {
            const { email, roleId } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не существует'))
            }
            const roles = await user.addRoles(roleId)
            const message = !roles
                ? 'Нет изменений'
                : ((roles > 1)
                    ? 'Роли присвоены'
                    : 'Роль присвоена'
                )
            return res.json({ message })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async userRoleRemove(req, res, next) {
        try {
            const { email, roleId } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не существует'))
            }
            const roles = await user.removeRoles(roleId)
            const message = !roles
                ? 'Нет изменений'
                : ((roles > 1)
                    ? 'Роли отозваны'
                    : 'Роль отозвана'
                )
            return res.json({ message })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getRoles(req, res, next) {
        try {
            const { email } = req.user
            const user = await User.findOne({
                where: { email },
                include: Role
            })
            // const roles = (await user.getRoles({
            //     attributes: ['value'],
            //     raw: true
            // })).map(role => role.value)
            const roles = user.roles.map(role => role.value)
            return res.json({ user: user.email, roles })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()