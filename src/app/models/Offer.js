const Sequelize = require('sequelize')

class Offer extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                is_accepted: Sequelize.BOOLEAN,
            }, {
                sequelize
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_from_id', as: 'user_from' });
        this.belongsTo(models.User, { foreignKey: 'user_to_id', as: 'user_to' });

        this.belongsTo(models.Book, { foreignKey: 'book_from_id', as: 'book_from' });
        this.belongsTo(models.Book, { foreignKey: 'book_to_id', as: 'book_to' });
    }

}

module.exports = Offer
