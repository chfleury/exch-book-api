const Book = require('../models/Book')
const Offer = require('../models/Offer')
const User = require('../models/User')

class OffersController {
    async store(req, res) {
        const {
            user_from_id,
            user_to_id,
            book_from_id,
            book_to_id,
            is_accepted
        } = req.body

        const offer = await Offer.create({
            user_from_id,
            user_to_id,
            book_from_id,
            book_to_id,
            is_accepted
        })

        return res.json(offer)
    }

    async index(req, res) {
        const offers = await Offer.findAll({
            where: req.query,
            attributes: ['id', 'user_from_id', 'user_to_id', 'book_from_id', 'book_to_id', 'is_accepted'],
            include: [
                {
                    model: Book,
                    as: 'book_from',
                    attributes: ['id', 'title', 'category', 'description', 'is_active', 'conservation_state', 'image_id', 'created_at']
                },
                {
                    model: User,
                    as: 'user_from',
                    attributes: ['email', 'phone', 'name', 'password', 'location', 'created_at']
                }
            ]
        })

        return res.json(offers)
    }

    async indexOne(req, res) {
        const { id } = req.params

        const offer = await Offer.findOne({
            where: { id: id }
        })

        if (offer === null)
            return res.status(404).json({ id: id })

        return res.json(offer)
    }

    async update(req, res) {
        const { id } = req.params
        const body = req.body

        const offer = await Offer.findByPk(id)

        if (offer === null)
            return res.status(404).json({ id: id })

        let invalidKeys = []
        for (let key in body) {
            if (!(key in offer.dataValues))
                invalidKeys.push(key)
        }
        console.log(invalidKeys)

        if (invalidKeys.length !== 0)
            return res.status(400).json({ invalidKeys: invalidKeys })

        offer.update(body)

        return res.json(offer)
    }

    async delete(req, res) {
        const { id } = req.params

        const offer = await Offer.findOne({
            where: { id: id }
        })

        if (offer === null)
            return res.status(404).json({ id: id })

        await offer.destroy()

        return res.json(offer)
    }

}

module.exports = new OffersController()