const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/online-shop")
    .then(() => {
        console.log("MongoDB database has been connected successfully!");
    })
    .catch((err) => {
        console.log(err);
    });