const { Router } = require('express')
const router = Router()

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/login', async (req, res) => {
    try { } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
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
//                 let token = jwt.sign({ id: user.id }, nodejs_config.secret, {
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