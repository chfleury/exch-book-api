const User = require('../models/User')
const bcrypt = require('bcrypt')

class SessionController {
    async store (req, res) {
        const { email, password } = req.body

        const user = await User.findOne({
            where: { email }
        });
      
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({ error: 'Authentication failed' })
            }

            if (result) {
                return res.json({ message: 'successfully authenticated' })
            }

            return res.status(401).json({ error: 'Authentication failed' })
        })

    }

    async index (req, res) {

        return res.json()
    }
}

module.exports = new SessionController()