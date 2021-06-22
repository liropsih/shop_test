const { Request, Role } = require('@@/models')
const ApiError = require('@@/error/api.error')

class RequestController {
    async create(req, res, next) {
        try {
            const { value, name } = req.body
            const request = await Request.create({ value, name })
            return res.json({ request })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, value, name } = req.body
            let request = await Request.findByPk(id)
            if (!request) {
                return next(ApiError.badRequest('Запрос не найден'))
            }
            request = await request.update({ value, name })
            return res.json({ request })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async destroy(req, res, next) {
        try {
            const { id } = req.body
            let request = await Request.findByPk(id)
            if (!request) {
                return next(ApiError.badRequest('Запрос не найден'))
            }
            await request.destroy()
            return res.json({ message: 'Запрос удалён из базы данных' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const requests = await Request.findAll()
            return res.json(requests)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getRoles(value) {
        try {
            const request = await Request.findOne({
                where: { value },
                include: Role
            })
            let roles = []
            if (request) { roles = request.roles.map(role => role.value) }
            return roles
        } catch (e) {
            throw e
        }
    }

    async requestRoleAdd(req, res, next) {
        try {
            const { id, roleId } = req.body
            const request = await Request.findByPk(id)
            if (!request) {
                return next(ApiError.badRequest('Запрос не найден'))
            }
            const roles = await request.addRoles(roleId)
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

    async requestRoleRemove(req, res, next) {
        try {
            const { id, roleId } = req.body
            const request = await Request.findByPk(id)
            if (!request) {
                return next(ApiError.badRequest('Запрос не найден'))
            }
            const roles = await request.removeRoles(roleId)
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
}

module.exports = new RequestController()