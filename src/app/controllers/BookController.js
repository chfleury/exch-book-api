const Book = require('../models/Book')
const Op = require('sequelize').Op;
const File = require('../models/File')
const User = require('../models/User')

class BookController {
    async store(req, res) {
        const {
            user_id,
            title, 
            category, 
            description,
            conservation_state, 
            is_active,
            image_id,
        } = req.body

        const book = await Book.create({
            user_id, 
            title, 
            category, 
            description,
            conservation_state, 
            is_active,
            image_id,
        })

        return res.json(book)
    }

    async index(req, res) {
        const books = await Book.findAndCountAll({
            where:{ is_active:true},
         
            attributes: ['id', 'title', 'category', 'description', 'is_active', 'conservation_state', 'image_id', 'user_id', 'created_at'],
            include: [
              {
                model: File,
                as: 'image',
                attributes: ['name', 'path', 'url'],
              },
              {
                model: User,
                as: 'user',
                attributes: ['location']
              }
            ],
        })


        return res.json(books)
    }


    async indexNotUser(req, res) {
        const {user_id} = req.params
        const books = await Book.findAndCountAll({
            where: { user_id: { [Op.ne]: user_id }, is_active:true},
            order: [['created_at', 'DESC']],
          
            attributes: ['id', 'title', 'category', 'description', 'is_active', 'conservation_state', 'image_id', 'user_id', 'created_at'],
            include: [
              {
                model: File,
                as: 'image',
                attributes: ['name', 'path', 'url'],
              },
              {
                model: User,
                as: 'user',
                attributes: ['location']
              }
            ],
        })


        return res.json(books)
    }

    async indexUser(req, res) {
        const {user_id} = req.params
        const books = await Book.findAll({
            where: { user_id ,is_active: true},
            order: [['created_at', 'DESC']],
         
            attributes: ['id', 'title', 'category', 'description', 'is_active', 'conservation_state', 'image_id', 'user_id', 'created_at'],
            include: [
              {
                model: File,
                as: 'image',
                attributes: ['name', 'path', 'url'],
              },
              {
                model: User,
                as: 'user',
                attributes: ['location']
              }
            ],
        })


        return res.json(books)
    }



    async indexOne(req, res) {
        const { id } = req.params

        const book = await Book.findOne({
            where: { id: id }
        })

        const image = await File.findByPr(recipe.image_id)

        if (book === null)
            return res.status(404).json({ id: id })

        return res.json({ ...book, image })
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

        book.update(body)

        return res.json(book)
    }

    async delete(req, res) {
        const { id } = req.params

        const book = await Book.findOne({
            where: { id: id }
        })

        if (book === null)
            return res.status(404).json({ id: id })

        await book.destroy()

        return res.json(book)
    }
}

module.exports = new BookController()
