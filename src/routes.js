const { Router } = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const BookController = require('./app/controllers/BookController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/books', BookController.index)
routes.post('/books', BookController.store)
routes.put('/books/:id', BookController.update)
routes.get('/books/:id', BookController.indexOne)

routes.post('/login', SessionController.store)

module.exports = routes
