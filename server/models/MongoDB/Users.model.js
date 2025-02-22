const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                require: true
            },
            quantity: {
                type: Number,
                require: true,
                default: 1
            }
        }]
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;