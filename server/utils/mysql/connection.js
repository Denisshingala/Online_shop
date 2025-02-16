const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("online_shop", "root", "Root@123", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "denis",
//     password: "Denis@123",
// });

// // to directly connect with database
// connection.connect((err) => {
//     if (err) {
//         console.error(err);
//     }

//     let database_name = 'online_shop';
//     connection.query(`CREATE DATABASE IF NOT EXISTS ${database_name}`, (err) => {
//         if (err) {
//             console.error('Error creating database: ' + err.stack);
//             return;
//         }

//         mysql.createConnection({
//             host: "localhost",
//             user: "denis",
//             password: "Denis@123",
//             database: database_name
//         }).connect((err) => {
//             if (err) {
//                 console.error("Database connection error:", err.stack);
//                 return;
//             }
//             console.log("Mysql database has been connected successfully!");
//         })
//     })
// });

