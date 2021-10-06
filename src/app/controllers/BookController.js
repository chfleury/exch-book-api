const Book = require('../models/Book')

class BookController {
    async store (req, res) {
        const book = await Book.create(req.body)

        return res.json(book)
    }

    async index (req, res) {
        const books = await Book.findAll()

        return res.json(books)
    }

    async update (req, res) {
        
    }

    async destroy (req, res) {
        
    }
}

module.exports = new BookController()
