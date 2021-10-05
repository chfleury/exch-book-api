const Book = require('../models/Book')
const auth = require('../middlewares/auth')

class BookController {
    async store (req, res) {
        const book = await Book.create(req.body)

        return res.json(book)
    }

    async index (req, res) {
        const books = await Book.findAll()

        return res.json(books)
    }
}

module.exports = new BookController()
