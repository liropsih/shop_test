const Router = require('express')
const router = new Router()
const itemController = require('@@/controllers/itemController')
const roleMiddleware = require('@@/middleware/role.middleware')

router.post('/add', roleMiddleware, itemController.create)
router.post('/update', roleMiddleware, itemController.update)
router.post('/remove', roleMiddleware, itemController.destroy)
router.get('/get/:catId', itemController.getAll)
router.get('/sale', itemController.getAll)
router.get('/search', itemController.getAll)
router.get('/detail/:id', itemController.getOne)

module.exports = router