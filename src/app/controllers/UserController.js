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

    async indexOne(req, res) {
        const { id } = req.params

        const user = await User.findOne({
            where: { id: id }
        })

        if (user === null)
            return res.status(404).json({ id: id })

        return res.json(user)
    }

    async update(req, res) {
        const { id } = req.params
        const body = req.body

        const user = await User.findOne({
            where: { id: id }
        })

        if (user === null)
            return res.status(404).json({ id: id })

        let invalidKeys = []
        for (let key in body) {
            if (!(key in user.dataValues))
                invalidKeys.push(key)
        }
        console.log(invalidKeys)

        if (invalidKeys.length !== 0)
            return res.status(400).json({ invalidKeys: invalidKeys })

        user.update(body)

        return res.json(user)
    }

    async delete(req, res) {
        const { id } = req.params

        const user = await User.findOne({
            where: { id: id }
        })

        if (user === null)
            return res.status(404).json({ id: id })

        await user.destroy()

        return res.json(user)
    }
}

module.exports = new UserController()