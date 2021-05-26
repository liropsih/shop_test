const Router = require('express')
const router = new Router()
const brandController = require('@server/controllers/brandController')
const roleMiddleware = require('@server/middleware/role.middleware')

router.post('/add', roleMiddleware(), brandController.create)
router.post('/update', roleMiddleware(), brandController.update)
router.post('/remove', roleMiddleware(), brandController.destroy)
router.get('/', brandController.getAll)

module.exports = router