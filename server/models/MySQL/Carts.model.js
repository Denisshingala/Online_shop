const Sequelize = require("sequelize");
const sequelize = require("../../utils/mysql/connection");

const Carts = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Carts;