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

    async update(req, res) {
        const { id } = req.params
        const body = req.body

        const book = await Book.findOne({
            where: { id: id }
        })

        if (book === null)
            return res.status(404).json({ id: id })

        const dataValues = book.dataValues
        let invalidKeys = []
        for (let key in body) {
            if (!(key in dataValues))
                invalidKeys.push(key)
        }

        if (invalidKeys.length !== 0)
            return res.status(400).json({ invalidKeys: invalidKeys })

        const [affectedRows] = await Book.update(body, {
            where: { id: id }
        })

        if (affectedRows === 0)
            return res.status(500).json({
                error: 'Something went wrong. Please try again later'
            })

        return res.json({ ...dataValues, ...body })
    }
}

module.exports = new BookController()
