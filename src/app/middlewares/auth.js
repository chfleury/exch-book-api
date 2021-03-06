const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.aplit(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode
        next()

    } catch (error) {
        return res.status(401).send({ message: 'Authentication failed' })
    }
}