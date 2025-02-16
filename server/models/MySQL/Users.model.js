const Sequelize = require("sequelize");
const sequelize = require("../../utils/mysql/connection");

const Users = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

module.exports = Users;