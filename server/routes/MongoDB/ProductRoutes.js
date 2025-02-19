const express = require("express");
const Products = require("../../models/MongoDB/Products.model");
const User = require("../../models/MongoDB/Users.model");

const ProductRoutes = express.Router();

ProductRoutes.get("/all", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ message: "Product Details!", "data": products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.post("/add", async (req, res) => {
    try {
        const user = await User.findOne({ email: "denisshingala@gmail.com" });
        const { productName, productURL, productPrice, productDescription } = req.body;
        const newProduct = new Products({
            productName,
            productURL,
            productPrice,
            productDescription,
            userId: user
        });

        await newProduct.save()
            .then((product) => {
                res.status(200).json({ message: "Product Details!", "data": JSON.stringify(product) });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: "Something went wrong !!", "status": 500 })
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.get("/details/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Products.findById(id);
        res.status(200).json({ message: "Product Details!", "data": products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const products = await Products.findByIdAndUpdate(id, body);
        res.status(200).json({ message: "Product Details!", "data": products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Products.findByIdAndDelete(id);
        res.status(200).json({ message: "Product has been deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.get("/get-cart-items", async (req, res) => {
    try {
        const user = await User.findOne({ email: "denisshingala@gmail.com" }).populate("cart.items.productId");
        const items = user.cart.items.map((item) => {
            return {
                quantity: item.quantity,
                productPrice: item.price,
                _id: item.productId._id,
                productName: item.productId.productName,
                productURL: item.productId.productURL,
                productDescription: item.productId.productDescription,
            }
        });
        res.status(200).json({ message: "Cart items!", items: items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.post("/add-to-cart", async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findOne({ email: "denisshingala@gmail.com" });
        const product = await Products.findById(productId);

        const cartItems = user.cart.items;
        const productIndex = cartItems.findIndex((item) => {
            return item.productId == productId;
        });
        console.log(productIndex);

        if (productIndex >= 0) {
            cartItems[productIndex].quantity += 1;
            cartItems[productIndex].price = product.productPrice;
        } else {
            cartItems.push({
                productId: productId,
                quantity: 1,
                price: product.productPrice
            });
        }

        await User.findByIdAndUpdate(user, { $set: { cart: { items: cartItems } } })
            .then(() => {
                res.status(200).json({ message: "Product has been added to cart!", items: cartItems });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Something went wrong !!", "status": 500 })
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.delete("/remove-from-cart/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const user = await User.findOne({ "email": "denisshingala@gmail.com" });
        if (user) {
            const cart = user.cart.items.filter((item) => {
                item.productId != productId;
            });
            await User.findByIdAndUpdate(user, { $set: { cart: { items: cart } } })
                .then(() => {
                    res.status(200).json({ message: "Product has been added to cart!" });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: "Something went wrong !!", "status": 500 })
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

module.exports = ProductRoutes;