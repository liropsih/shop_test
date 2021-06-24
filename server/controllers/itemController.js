const { Op } = require("sequelize")
const { Item, ItemInfo } = require('@@/models')
const ApiError = require('@@/error/api.error')
const uuid = require('uuid')
const path = require('path')
const { unlinkSync } = require('fs')
const imgFolder = path.resolve(__dirname, '..', 'static', 'item', 'img')

class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, count, brandId, catId, info } = req.body
            const { img } = req.files
            if (img.size > (2 * 1024 * 1024)) {
                return next(ApiError.badRequest('Размер изображения превышает 2мб'))
            }
            if (img.mimetype != 'image/jpeg' && img.mimetype != 'image/png') {
                return next(ApiError.badRequest('Неверный формат изображения'))
            }
            const fileName = uuid.v4() + path.extname(img.name).toLowerCase()
            img.mv(path.resolve(imgFolder, fileName))
            const item = await Item.create({ name, price, count, brandId, catId, img: fileName })
            if (info) {
                info = JSON.parse(info)
                info.forEach(async i => {
                    try {
                        await item.createInfo({
                            title: i.title,
                            description: i.description
                        })
                    } catch (e) {
                        throw e
                    }
                })
            }
            return res.json({ message: 'Товар добавлен' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, name, price, oldPrice, count, sale, sale_tag, brandId, catId, info } = req.body
            const item = await Item.findByPk(id)
            let img
            let fileName
            if (req.files && req.files.img) {
                img = req.files.img
                if (img.size > (2 * 1024 * 1024)) {
                    return next(ApiError.badRequest('Размер изображения превышает 2мб'))
                }
                if (img.mimetype != 'image/jpeg' && img.mimetype != 'image/png') {
                    return next(ApiError.badRequest('Неверный формат изображения'))
                }
                fileName = uuid.v4() + path.extname(img.name).toLowerCase()
                img.mv(path.resolve(imgFolder, fileName))
                const oldImage = item.img
                const oldImagePath = path.resolve(imgFolder, oldImage)
                unlinkSync(oldImagePath)
            }
            if (info) {
                info = JSON.parse(info)
                ItemInfo.destroy({ where: { itemId: item.id } })
                info.forEach(async i => {
                    try {
                        await item.createInfo({
                            title: i.title,
                            description: i.description
                        })
                    } catch (e) {
                        throw e
                    }
                })
            }
            await item.update({ name, price, oldPrice, count, sale, sale_tag, brandId, catId, img: fileName })
            return res.json({ message: 'Информация обновлена' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async destroy(req, res, next) {
        try {
            let { id } = req.body
            const item = await Item.findByPk(id)
            const fileName = item.img
            const filePath = path.resolve(imgFolder, fileName)
            unlinkSync(filePath)
            await item.destroy()
            return res.json({ message: 'Товар удалён' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        console.log(req.query)
        const { catId } = req.params
        let { brandId, sale, search, limit, page } = req.query
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit
        let items
        if (!brandId && !catId) {
            items = await Item.findAndCountAll({ limit, offset })
        }
        if (brandId && !catId) {
            items = await Item.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && catId) {
            items = await Item.findAndCountAll({ where: { catId }, limit, offset })
        }
        if (brandId && catId) {
            items = await Item.findAndCountAll({ where: { brandId, catId }, limit, offset })
        }
        if (!brandId && search) {
            items = await Item.findAndCountAll({ where: { name: { [Op.iLike]: '%' + search + '%' } }, limit })
        }
        if (brandId && search) {
            items = await Item.findAndCountAll({ where: { brandId, name: { [Op.iLike]: '%' + search + '%' } }, limit })
        }
        if (!brandId && sale) {
            items = await Item.findAndCountAll({ where: { sale }, limit, offset })
        }
        if (brandId && sale) {
            items = await Item.findAndCountAll({ where: { brandId, sale }, limit, offset })
        }
        return res.json(items)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const item = await Item.findOne({
                where: { id },
                include: [{ model: ItemInfo, as: 'info' }]
            })
            if (!item) {
                next(ApiError.internal('Товар не найден'))
            }
            return res.json(item)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    // async search(req, res) {
    //     let { value, limit } = req.query
    //     limit = limit || 12
    //     let items
    //     if (value) {
    //         items = await Item.findAndCountAll({ where: { name: { [Op.iLike]: '%' + value + '%' } }, limit })
    //     }
    //     return res.json(items)
    // }
}

module.exports = new ItemController()