const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const roleMiddleware = require('../middleware/role.middleware')

router.post('/add', roleMiddleware(), itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)

module.exports = router