const Sequelize = require('sequelize')
const { password } = require('../../config/database')

class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                phone: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING
            }, {
                sequelize
            }
        )

        return this
    }
}

module.exports = User