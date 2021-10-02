const { Router } = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

routes.get('/users', UserController.store)
routes.post('users', UserController.index)

module.exports = routes