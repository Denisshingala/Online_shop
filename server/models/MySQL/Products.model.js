const Sequelize = require("sequelize"); 
const sequelize = require("../../utils/mysql/connection");

const Products = sequelize.define("product", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productURL: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
});

module.exports = Products;