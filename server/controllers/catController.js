const { Cat } = require('@@/models')
const ApiError = require('@@/error/api.error')

class CatController {
    async create(req, res, next) {
        console.log(req.body)
        try {
            const { name, parentId } = req.body
            const cat = await Cat.create({ name, parentId })
            return res.json({ cat })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, parentId } = req.body
            let cat = await Cat.findByPk(id)
            if (!cat) {
                return next(ApiError.badRequest('Категория не найдена'))
            }
            cat = await cat.update({ name, parentId })
            return res.json({ cat })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async destroy(req, res, next) {
        try {
            const { id } = req.body
            let cat = await Cat.findByPk(id)
            if (!cat) {
                return next(ApiError.badRequest('Категория не найдена'))
            }
            await cat.destroy()
            return res.json({ message: 'Категория удалена' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const cats = await Cat.findAll({
                where: { parentId: null },
                include: [{
                    model: Cat,
                    as: 'children'
                }]
            })
            return res.json({ cats })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CatController()