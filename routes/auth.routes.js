const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
// const bcrypt_config = require('./bcrypt.config')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const DB = require('../models/User')
const db = new DB("sqlitedb")

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array({}),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const { name, email, password } = req.body
            db.findOne(email, 'email', 'user', async (e, row) => {
                if (e) { throw e }
                if (row) { return res.status(400).json({ message: 'Такой email уже существует' }) }
                const hashedPassword = await bcrypt.hash(password, 12)
                db.insertUser([
                    name,
                    email,
                    hashedPassword
                ], (e) => {
                    if (e) { throw e }
                })
                // res.json({ name, email })
                return res.status(201).json({ message: 'Пользователь создан', name, email })
            })
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.post('/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').exists
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const { email, password } = req.body
            db.findOne(email, 'email', 'user', async (e, row) => {
                if (e) { throw e }
                if (!row) { return res.status(400).json({ message: 'Такого пользователя не существует' }) }
                isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    return res.status(400).json({ message: 'Неверный пароль' })
                }
                const token = jwt.sign(
                    { userId: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: '1h' }
                )
                res.json({ token, userId: user.id })
                return res.status(201).json({ message: 'Вход выполнен' })
            })
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

module.exports = router

// router.post('/register', function (req, res) {
//     db.insert([
//         req.body.name,
//         req.body.email,
//         bcrypt.hashSync(req.body.password, 8)
//     ],
//         function (err) {
//             if (err) return res.status(500).send("There was a problem registering the user.")
//             db.selectByEmail(req.body.email, (err, user) => {
//                 if (err) return res.status(500).send("There was a problem getting user")
//                 let token = jwt.sign({ id: uerr.id }, nodejs_config.secret, {
//                     expiresIn: 86400 // expires in 24 hours
//                 })
//                 res.status(200).send({ auth: true, token: token, user: user })
//             })
//         })
// })

// router.post('/login', (req, res) => {
//     db.selectByEmail(req.body.email, (err, user) => {
//         if (err) return res.status(500).send('Error on the server.')
//         if (!user) return res.status(404).send('No user found.')
//         let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
//         let token = jwt.sign({ id: user.id }, nodejs_config.secret, {
//             expiresIn: 86400 // expires in 24 hours
//         })
//         // let tokenverify = jwt.verify(token, user.id)
//         res.status(200).send({
//             auth: true,
//             token: token,
//             user: user,
//             // tokenverify: tokenverify
//         })
//     })
// })

// router.post('/getuser', (req, res) => {
//     // console.log('req.body.token:', req.body.token)
//     let id = (jwt.decode(req.body.token)).id
//     db.selectById(id, (err, user) => {
//         if (err) return res.status(500).send('Error on the server.')
//         if (!user) return res.status(404).send('No user found.')
//         res.status(200).send({
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 status: user.is_admin
//             }
//         })
//     })
// })