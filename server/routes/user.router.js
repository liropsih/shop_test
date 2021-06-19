const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const userController = require('@@/controllers/userController')
const authMiddleware = require('@@/middleware/auth.middleware')
const roleMiddleware = require('@@/middleware/role.middleware')

router.post(
    '/register',
    [
        check('name', 'Некорректно введено имя')
            .isLength({ min: 2 })
            .trim()
            .escape(),
        check('email', 'Некорректный email')
            .isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
            .escape()
    ],
    userController.register
)
router.post(
    '/login',
    [
        check('email', 'Некорректный email')
            .normalizeEmail()
            .isEmail(),
        check('password', 'Пароль не должен быть пустым')
            .exists()
            .escape()
    ],
    userController.login)
router.get('/auth', authMiddleware, userController.authCheck)
router.get('/info', authMiddleware, userController.getUserInfo)
router.post(
    '/update_info',
    [
        check('name', 'Некорректно введено имя')
            .isLength({ min: 2 })
            .trim()
            .escape(),
        check('lastname', 'Некорректно введена фамилия')
            .isLength({ min: 2 })
            .trim()
            .optional({ checkFalsy: true })
            .escape(),
        check('patronymic', 'Некорректно введено отчество')
            .isLength({ min: 2 })
            .trim()
            .optional({ checkFalsy: true })
            .escape(),
        check('email', 'Некорректный email')
            .isEmail(),
        check('phone', 'Некорректно введён номер телефона')
            .isMobilePhone()
            .optional({ checkFalsy: true }),
        check('birthdate', 'Некорректно введена дата')
            .isDate({
                format: 'DD/MM/YYYY',
                delimiters: ['/', '-', '.']
            })
            .optional({ checkFalsy: true }),
        check('oldPassword')
            .custom((value, { req }) => (!!value === !!req.body.newPassword))
            .withMessage('Старый пароль не должен быть пустым')
            .optional({ checkFalsy: true })
            .escape(),
        check('newPassword')
            .custom((value, { req }) => (!!value === !!req.body.oldPassword))
            .withMessage('Новый пароль не должен быть пустым')
            .isLength({ min: 6 })
            .withMessage('Минимальная длина пароля 6 символов')
            .custom((value, { req }) => (value !== req.body.oldPassword))
            .withMessage('Новый пароль должен отличаться от старого')
            .optional({ checkFalsy: true })
            .escape(),
    ],
    authMiddleware,
    userController.updateUserInfo)
router.get('/cart', authMiddleware, userController.getUserCart)
router.post('/role_add', roleMiddleware, userController.userRoleAdd)
router.post('/role_remove', roleMiddleware, userController.userRoleRemove)

module.exports = router