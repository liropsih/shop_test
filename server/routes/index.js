const Router = require('express')
const router = new Router()
const brandRouter = require('./brand.router')
const itemRouter = require('./item.router')
const catRouter = require('./cat.router')
const userRouter = require('./user.router')
const requestRouter = require('./request.router')
const roleRouter = require('./role.router')

router.use('/brand', brandRouter)
router.use('/item', itemRouter)
router.use('/cat', catRouter)
router.use('/user', userRouter)
router.use('/request', requestRouter)
router.use('/role', roleRouter)

module.exports = router