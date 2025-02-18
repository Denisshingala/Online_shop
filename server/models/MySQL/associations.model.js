const CartItems = require("./CartItems.model");
const Carts = require("./Carts.model");
const OrderItems = require("./OrderItems.model");
const Orders = require("./Orders.model");
const Products = require("./Products.model");
const Users = require("./Users.model");

Users.hasMany(Products);
Products.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });

Users.hasMany(Carts);
Carts.belongsTo(Users);

Products.belongsToMany(Carts, { through: CartItems });
Carts.belongsToMany(Products, { through: CartItems });

Orders.belongsTo(Users);
Users.hasMany(Orders);

Orders.belongsToMany(Products, { through: OrderItems });
Products.belongsToMany(Orders, { through: OrderItems });