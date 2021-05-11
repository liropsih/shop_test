const Router = require('express')
const router = new Router()
const brandRouter = require('./brand.router')
const itemRouter = require('./item.router')
const typeRouter = require('./type.router')
const userRouter = require('./user.router')

router.use('/brand', brandRouter)
router.use('/item', itemRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)

module.exports = router