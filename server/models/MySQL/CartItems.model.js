const Sequelize = require("sequelize");
const sequelize = require("../../utils/mysql/connection");

const CartItems = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = CartItems;