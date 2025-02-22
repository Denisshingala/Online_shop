const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            require: true
        },
        productPrice: {
            type: Number,
            require: true
        }
    }]
});

const Orders = mongoose.model("order", OrderSchema);

module.exports = Orders;