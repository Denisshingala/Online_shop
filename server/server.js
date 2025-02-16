const express = require("express");
const cors = require('cors');
// const ProductRoutes = require("./routes/MongoDB/ProductRoutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sequelize = require("./utils/mysql/connection");
const productRoutes = require("./routes/MySQL/ProductRoutes");
const userRoutes = require("./routes/MySQL/UserRoutes");
const Users = require("./models/MySQL/Users.model");

require("./models/MySQL/associations.model");
require("dotenv").config();

// to connect with mongoDB
// require("./utils/mongodb/connection");

const corsOption = {
    credentials: true,
    origin: [`${process.env.APP_CLIENT_API}`]
};

const app = express();

app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_ID,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use("/user", userRoutes);
app.use("/product", productRoutes);

sequelize.sync().then(async () => {
    const user = await Users.findByPk(1);
    if (!user) {
        await Users.create({
            username: "denis",
            email: "denisshingala@gmail.com",
            password: "Denis@123"
        });
    }
    console.log("MySQL connection has been established!!");
    app.listen(8080);
}).catch((err) => {
    console.error(err);
})
