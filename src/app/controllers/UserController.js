const User = require('../models/User')
const bcrypt = require('bcrypt')

class UserController {
    async store (req, res) {
        const { email, phone, name, password } = req.body

        bcrypt.hash(password, 10, async (errBcrypt, hash) => {
            // if (errBcrypt) {
                // texugo
            //     return res.status(500).send({ error: 'errBcrypt' })
            // }

            const user = await User.create({ email, phone, name, password: hash })

            return res.json(user)
        })
    }

    async index (req, res) {
        const users = await User.findAll()

        return res.json(users)
    }
}

module.exports = new UserController()