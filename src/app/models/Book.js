const Sequelize = require('sequelize')

class Book extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                category: Sequelize.STRING,
                description: Sequelize.STRING,
                conservation_state: Sequelize.STRING,
                is_active: Sequelize.BOOLEAN,
            }, {
                sequelize
            }
        )

        return this
    }
}

module.exports = Book
