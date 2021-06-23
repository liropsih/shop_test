const { Brand } = require('@@/models')
const ApiError = require('@@/error/api.error')

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const brand = await Brand.create({ name })
            return res.json({ message: `Брэнд "${name}" добавлен` })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, name } = req.body
            let brand = await Brand.findByPk(id)
            if (!brand) {
                return next(ApiError.badRequest('Брэнд не найден'))
            }
            brand = await brand.update({ name })
            return res.json({ message: 'Название брэнда обновлено' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async destroy(req, res, next) {
        try {
            const { id } = req.body
            let brand = await Brand.findByPk(id)
            if (!brand) {
                return next(ApiError.badRequest('Брэнд не найден'))
            }
            await brand.destroy()
            return res.json({ message: `Брэнд "${brand.name}" удалён` })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    // async getAll(req, res, next) {
    //     try {
    //         const brands = await Brand.findAll()
    //         return res.json({ brands })
    //     } catch (e) {
    //         next(ApiError.internal(e.message))
    //     }
    // }

    async getAll(req, res, next) {
        try {
            const { brandId } = req.query
            let brands
            if (brandId) {
                brands = await Brand.findAll({ where: { id: brandId } })
            } else {
                brands = await Brand.findAll()
            }
            return res.json({ brands })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    // async getOne(req, res, next) {
    //     try {
    //         const { id } = req.body
    //         const brands = await Brand.findAll(id)
    //         return res.json({ brands })
    //     } catch (e) {
    //         next(ApiError.internal(e.message))
    //     }
    // }
}

module.exports = new BrandController()