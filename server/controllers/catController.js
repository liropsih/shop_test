const { Cat, Item } = require('@@/models')
const ApiError = require('@@/error/api.error')

class CatController {
    async create(req, res, next) {
        console.log(req.body)
        try {
            const { name, parentId } = req.body
            await Cat.create({ name, parentId })
            return res.json({ message: `${parentId ? 'Подкатегория' : 'Категория'} "${name}" добавлена` })
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
            return res.json({ message: `${parentId ? 'Подкатегория' : 'Категория'} обновлена` })
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
            return res.json({ message: `${cat.parentId ? 'Подкатегория' : 'Категория'} "${cat.name}" удалена` })
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

    // async getOne(req, res, next) {
    //     try {
    //         const { id } = req.body
    //         const cats = await Cat.findByPk( id, {
    //             include: Item
    //             // count rows????
    //         })
    //         return res.json({ cats })
    //     } catch (e) {
    //         next(ApiError.internal(e.message))
    //     }
    // }
}

module.exports = new CatController()