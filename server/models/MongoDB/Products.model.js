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
    }
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;