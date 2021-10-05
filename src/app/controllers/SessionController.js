const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                const token = jwt.sign({
                    userId: user.id,
                    email: user.email,
                    name: user.name,
                }, process.env.JWT_KEY, { expiresIn: "5d" })

                return res.json({ 
                    message: 'successfully authenticated',
                    token: token
                })
            }

            return res.status(401).json({ error: 'Authentication failed' })
        })

    }
}

module.exports = new SessionController()