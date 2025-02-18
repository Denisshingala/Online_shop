const Sequelize = require("sequelize");
const sequelize = require("../../utils/mysql/connection");

const Orders = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }
})

module.exports = Orders;