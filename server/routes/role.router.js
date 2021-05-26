const Router = require('express')
const router = new Router()
const roleController = require('@server/controllers/roleController')
const roleMiddleware = require('@server/middleware/role.middleware')

router.get('/', roleMiddleware(), roleController.getAll)
router.post('/add', roleMiddleware(), roleController.create)
router.post('/remove', roleMiddleware(), roleController.destroy)

module.exports = router