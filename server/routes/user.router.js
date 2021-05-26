const Router = require('express')
const router = new Router()
const userController = require('@@/controllers/userController')
const authMiddleware = require('@@/middleware/auth.middleware')
const roleMiddleware = require('@@/middleware/role.middleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/change_pass', authMiddleware, userController.changePassword)
router.get('/auth', authMiddleware, userController.authCheck)
router.get('/info', authMiddleware, userController.getUserInfo)
router.post('/update_info', authMiddleware, userController.updateUserInfo)

router.post('/role_add', roleMiddleware(), userController.userRoleAdd)
router.post('/role_remove', roleMiddleware(), userController.userRoleRemove)
router.get('/getroles', roleMiddleware(), userController.getRoles)

module.exports = router