const Book = require('../models/Book')

class BookController {
    async store(req, res) {
        const {
            user_id, title, category, description,
            conservation_state, is_active
        } = req.body
        const book = await Book.create({
            user_id, title, category, description,
            conservation_state, is_active
        })

        return res.json(book)
    }

    async index(req, res) {
        const books = await Book.findAll()

        return res.json(books)
    }

    async indexOne(req, res) {
        const { id } = req.params

        const book = await Book.findOne({
            where: { id: id }
        })

        if (book === null)
            return res.status(404).json({ id: id })

        return res.json(book)
    }
}

module.exports = new BookController()
