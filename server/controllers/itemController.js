const { Item, ItemInfo } = require('../models')
const ApiError = require('../error/api.error')
const uuid = require('uuid')
const path = require('path')
const { unlink } = require('fs')

class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, catId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '../static/item/img', fileName))
            const item = await Item.create({ name, price, brandId, catId, img: fileName })

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
            let { id, name, price, brandId, catId, info } = req.body
            const item = await Item.findByPk(id)
            let img
            let fileName
            if (req.files) {
                if (req.files.img) {
                    img = req.files.img
                    fileName = uuid.v4() + '.jpg'
                    img.mv(path.resolve(__dirname, '../static/item/img', fileName))
                    const oldImage = item.img
                    const oldImagePath = path.resolve(__dirname, '../static/item/img', oldImage)
                    unlink(oldImagePath, (err) => {
                        if (err) throw err
                    })
                }
            }

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

            const newItem = await item.update({ name, price, brandId, catId, img: fileName })

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
            const filePath = path.resolve(__dirname, '../static/item/img', fileName)
            unlink(filePath, (err) => {
                if (err) throw err
            })
            await item.destroy()
            return res.json({ message: 'Товар удалён' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, catId, limit, page } = req.query
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
}

module.exports = new ItemController()