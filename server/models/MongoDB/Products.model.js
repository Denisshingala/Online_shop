const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productURL: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    }
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;