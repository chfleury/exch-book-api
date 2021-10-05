const { Router } = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const BookController = require('./app/controllers/BookController')
const SessionController = require('./app/controllers/SessionController')

const auth = require('../middlewares/auth')

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/books', auth, BookController.index)
routes.post('/books', auth, BookController.store)

routes.post('/login', SessionController.store)

module.exports = routes
