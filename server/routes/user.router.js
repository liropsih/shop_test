const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.authCheck)

router.post('/roleadd', roleMiddleware(['Admin']), userController.roleAdd)
router.post('/rolechange', roleMiddleware(['Admin']), userController.roleChange)

module.exports = router