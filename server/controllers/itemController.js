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
            let { name, price, oldPrice, sale, tag, brandId, catId, info } = req.body
            const { img } = req.files
            if (img.size > (2 * 1024 * 1024)) {
                return next(ApiError.badRequest('Размер изображения превышает 2мб'))
            }
            if (img.mimetype != 'image/jpeg' && img.mimetype != 'image/png') {
                return next(ApiError.badRequest('Неверный формат изображения'))
            }
            const fileName = uuid.v4() + path.extname(img.name).toLowerCase()
            img.mv(path.resolve(imgFolder, fileName))
            const item = await Item.create({ name, price, oldPrice, sale, tag, brandId, catId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEaech(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: item.id
                    })
                )
            }

            return res.json({ item })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, name, price, oldPrice, sale, tag, brandId, catId, info } = req.body
            const item = await Item.findByPk(id)
            let img
            let fileName
            if (req.files) {
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
                let findedItem
                info.forEaech(i =>
                    findedItem = ItemInfo.findOne({ where: { itemId: item.id } }),
                    findedItem.update({
                        title: i.title,
                        description: i.description
                    })
                )
            }

            const newItem = await item.update({ name, price, oldPrice, sale, tag, brandId, catId, img: fileName })

            return res.json({ newItem })
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
        const { catId } = req.params
        let { brandId, limit, page } = req.query
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
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const item = await Item.findOne({
            where: { id },
            include: [{ model: ItemInfo, as: 'info' }]
        })
        return res.json(item)
    }

    async search(req, res) {
        let { name, limit } = req.query
        limit = limit || 10
        let items
        if (name) {
            items = await Item.findAndCountAll({ where: { name: { [Op.iLike]: '%' + name + '%' } }, limit })
        }
        return res.json(items)
    }
}

module.exports = new ItemController()