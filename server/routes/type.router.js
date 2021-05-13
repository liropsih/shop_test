const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const roleMiddleware = require('../middleware/role.middleware')

router.post('/', roleMiddleware(['Admin']), typeController.create)
router.get('/', typeController.getAll)

module.exports = router