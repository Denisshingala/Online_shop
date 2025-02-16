const Sequelize = require("sequelize");
const sequelize = require("../../utils/mysql/connection");

const OrderItems = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
})

module.exports = OrderItems;