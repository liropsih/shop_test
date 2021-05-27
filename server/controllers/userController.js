const { User, Role, Cart } = require('@@/models')
const { validationResult } = require('express-validator')
const ApiError = require('@@/error/api.error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const message = errors.array({}).map(e => e.msg)
                return next(ApiError.badRequest(message))
            }
            const { email, password } = req.body
            // if (!email || !password) {
            //     return next(ApiError.badRequest('Некорректный email или пароль'))
            // }
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, password: hashPassword })
            await Cart.create({ userId: user.id })
            const role = await Role.findOne({ where: { value: 'User' } })
            await user.addRoles([role])
            // const roles = role.map(role => role.roleId')
            const roles = (await user.getRoles()).map(role => role.value)
            const token = generateJwt(user.id, user.email, roles)
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const message = errors.array({}).map(e => e.msg)
                return next(ApiError.badRequest(message))
            }
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
        // const { id } = req.user
        // let user = await User.findByPk(id, {
        //     include: Role
        // })
        return res.json({ message: 'Проверка авторизации прошла успешно' })
    }

    async changePassword(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const message = errors.array({}).map(e => e.msg)
                return next(ApiError.badRequest(message))
            }
            const { id } = req.user
            const { password, newPassword } = req.body
            let user = await User.findByPk(id, {
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
            const { id } = req.user
            const { name, lastname, patronymic, phone, birthdate } = await User.findByPk(id)
            const info = { name, lastname, patronymic, phone, birthdate }
            return res.json(info)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateUserInfo(req, res, next) {
        try {
            const { id } = req.user
            let user = await User.findByPk(id)
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