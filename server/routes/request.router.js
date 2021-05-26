const Router = require('express')
const router = new Router()
const requestController = require('@server/controllers/requestController')
const roleMiddleware = require('@server/middleware/role.middleware')

router.get('/', roleMiddleware(), requestController.getAll)
router.post('/add', roleMiddleware(), requestController.create)
router.post('/update', roleMiddleware(), requestController.update)
router.post('/remove', roleMiddleware(), requestController.destroy)

router.post('/role_add', roleMiddleware(), requestController.requestRoleAdd)
router.post('/role_remove', roleMiddleware(), requestController.requestRoleRemove)

module.exports = router