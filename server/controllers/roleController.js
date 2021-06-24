const { Role } = require('../models')
const ApiError = require('../error/api.error')

class RoleController {
    async create(req, res, next) {
        try {
            const { value } = req.body
            const role = await Role.create({ value })
            return res.json({ role })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, value } = req.body
            let role = await Role.findByPk(id)
            role = await role.update({ value })
            return res.json({ role })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async destroy(req, res, next) {
        try {
            const { id } = req.body
            const role = await Role.findByPk(id)
            if (!role) {
                return next(ApiError.badRequest('Роль не найдена'))
            }
            await role.destroy()
            return res.json({ message: 'Роль удалена' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        try {
            const role = await Role.findAll()
            return res.json({ role })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new RoleController()