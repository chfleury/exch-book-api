const { Router } = require('express')

const routes = new Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const upload = multer(multerConfig)

const UserController = require('./app/controllers/UserController')
const BookController = require('./app/controllers/BookController')
const SessionController = require('./app/controllers/SessionController')
const FileController = require('./app/controllers/FileController')

const auth = require('./app/middlewares/auth')

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

routes.post('/login', SessionController.store)

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.get('/users/:id', UserController.indexOne)
routes.delete('/users/:id', UserController.delete)

// routes.use(auth);


routes.get('/books', BookController.index)

routes.get('/bookuser/:user_id', BookController.indexUser)
routes.get('/booknotuser/:user_id', BookController.indexNotUser)
routes.post('/books', BookController.store)
routes.put('/books/:id', BookController.update)
routes.get('/books/:id', BookController.indexOne)
routes.delete('/books/:id', BookController.delete)

routes.post('/files', upload.single('file'), FileController.store)

module.exports = routes
