const { Router } = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const BookController = require('./app/controllers/BookController')

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/books', BookController.index)
routes.post('/books', BookController.store)

module.exports = routes
