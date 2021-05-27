const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const userController = require('@@/controllers/userController')
const authMiddleware = require('@@/middleware/auth.middleware')
const roleMiddleware = require('@@/middleware/role.middleware')

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    userController.register
)
router.post(
    '/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Пароль не должен быть пустым').exists().escape()
    ],
    userController.login)
router.post(
    '/change_pass',
    [
        check('password', 'Пароль не должен быть пустым').exists().escape(),
        check('newPassword', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
            .custom((value, { req }) => (value !== req.body.password))
            .withMessage('Новый пароль должен отличаться от старого')
            .escape(),
    ],
    authMiddleware,
    userController.changePassword
)
router.get('/auth', authMiddleware, userController.authCheck)
router.get('/info', authMiddleware, userController.getUserInfo)
router.post(
    '/update_info',
    [
        check('name', 'Некорректно введено имя').isLength({ min: 2 }).trim().escape(),
        check('lastname', 'Некорректно введена фамилия').isLength({ min: 2 }).trim().escape(),
        check('patronymic', 'Некорректно введено отчество').isLength({ min: 2 }).trim().escape(),
        check('phone', 'Некорректно введена фамилия').isMobilePhone(),
        check('birthdate', 'Некорректно введено отчество').toDate()
    ],
    authMiddleware,
    userController.updateUserInfo)

router.post('/role_add', roleMiddleware, userController.userRoleAdd)
router.post('/role_remove', roleMiddleware, userController.userRoleRemove)
router.get('/getroles', roleMiddleware, userController.getRoles)

module.exports = router