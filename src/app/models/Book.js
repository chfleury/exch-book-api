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

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    }
}

module.exports = Book
