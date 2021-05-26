const Router = require('express')
const router = new Router()
const catController = require('@@/controllers/catController')
const roleMiddleware = require('@@/middleware/role.middleware')

router.post('/add', roleMiddleware(), catController.create)
router.post('/update', roleMiddleware(), catController.update)
router.post('/remove', roleMiddleware(), catController.destroy)
router.get('/', catController.getAll)

module.exports = router