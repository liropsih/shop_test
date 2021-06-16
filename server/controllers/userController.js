const { User, Role, Cart, Item } = require('@@/models')
const { validationResult } = require('express-validator')
const ApiError = require('@@/error/api.error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, name, roles) => {
    return jwt.sign(
        { id, name, roles },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

const changePassword = async (user, oldPassword, newPassword, next) => {
    try {
        const comparePassword = await bcrypt.compare(oldPassword, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const hashPassword = await bcrypt.hash(newPassword, 5)
        await user.update({ password: hashPassword })
        return
    } catch (e) {
        throw (e)
    }
}

class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const message = errors.array({}).map(e => e.msg)
                return next(ApiError.badRequest(message))
            }
            const { name, email, password } = req.body
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ name, email, password: hashPassword })
            await user.createCart()
            const token = generateJwt(user.id, user.name)
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
            const token = generateJwt(user.id, user.name, roles)
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async authCheck(req, res, next) {
        try {
            const { id } = req.user
            const user = await User.findByPk(id, {
                include: Role
            })
            const roles = user.roles.map(role => role.value)
            const token = generateJwt(user.id, user.name, roles)
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    // async changePassword(req, res, next) {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()) {
    //             const message = errors.array({}).map(e => e.msg)
    //             return next(ApiError.badRequest(message))
    //         }
    //         const { id } = req.user
    //         const { oldPassword, newPassword } = req.body
    //         let user = await User.findByPk(id, {
    //             include: Role
    //         })
    //         if (!user) {
    //             return next(ApiError.badRequest('Пользователь с таким email не существует'))
    //         }
    //         const comparePassword = await bcrypt.compare(oldPassword, user.password)
    //         if (!comparePassword) {
    //             return next(ApiError.badRequest('Неверный пароль'))
    //         }
    //         if (!newPassword) {
    //             return next(ApiError.badRequest('Некорректный новый пароль'))
    //         }
    //         const hashPassword = await bcrypt.hash(newPassword, 5)
    //         user = await user.update({ password: hashPassword })
    //         const roles = user.roles.map(role => role.value)
    //         const token = generateJwt(user.id, user.name, roles)
    //         return res.json(token)
    //     } catch (e) {
    //         next(ApiError.internal(e.message))
    //     }
    // }

    async getUserInfo(req, res, next) {
        try {
            const { id } = req.user
            const { name, lastname, patronymic, email, phone, birthdate } = await User.findByPk(id)
            const info = { name, lastname, patronymic, email, phone, birthdate }
            return res.json(info)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateUserInfo(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const message = errors.array({}).map(e => e.msg)
                return next(ApiError.badRequest(message))
            }
            const { id } = req.user
            const { name, lastname, patronymic, email, phone, birthdate, oldPassword, newPassword } = req.body
            const user = await User.findByPk(id, {
                include: Role
            })
            if (oldPassword && newPassword) {
                await changePassword(user, oldPassword, newPassword)
            }
            await user.update({ name, lastname, patronymic, email, phone, birthdate })
            return res.json({ message: 'Данные успешно сохранены' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getUserCart(req, res, next) {
        try {
            const { id } = req.user
            const user = await User.findByPk(id, {
                include: Cart
            })
            const { cart } = await User.findByPk(id, {
                include: Cart
            })
            console.log(cart.id)
            const cartcart = await Cart.findByPk(cart.id, {
                include: Item
            })
            console.log(cartcart)
            return
            const item = await cartcart.addItem(1)
            console.log(item)
            return
            return res.json(cart)
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
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new UserController()