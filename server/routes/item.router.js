const Router = require('express')
const router = new Router()
const itemController = require('@server/controllers/itemController')
const roleMiddleware = require('@server/middleware/role.middleware')

router.post('/add', roleMiddleware(), itemController.create)
router.post('/update', roleMiddleware(), itemController.update)
router.post('/remove', roleMiddleware(), itemController.destroy)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)

module.exports = router