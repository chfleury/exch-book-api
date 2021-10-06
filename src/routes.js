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

routes.get('/books', auth, BookController.index)
routes.post('/books', auth, BookController.store)

routes.post('/files', upload.single('file'), FileController.store)

module.exports = routes
