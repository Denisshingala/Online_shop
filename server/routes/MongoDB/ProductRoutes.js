const express = require("express");
const Products = require("../../models/MongoDB/Products.model");

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

ProductRoutes.post("/add-product", async (req, res) => {
    try {
        const { productName, productURL, productPrice, productDescription } = req.body;
        const newProduct = new Products({
            productName,
            productURL,
            productPrice,
            productDescription
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
        const data = req.session.cart ?? [];
        res.status(200).json({ message: "Cart items!", items: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.post("/add-to-cart", async (req, res) => {
    try {
        const { productId } = req.body;
        if (req.session.cart) {
            const productIndex = req.session?.cart?.findIndex(product => product._id == productId);
            const product = req.session.cart[productIndex];

            if (product) {
                product.quantity++;
                req.session.cart[productIndex] = product;
            } else {
                const product = await Products.findById(productId).lean();
                product.quantity = 1;
                req.session.cart.push(product);
            }
        } else {
            const product = await Products.findById(productId).lean();
            product.quantity = 1;
            req.session.cart = [product];
        }

        res.status(200).json({ message: "Product has been added to cart!", items: req.session.cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

ProductRoutes.delete("/remove-from-cart/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        if (req.session.cart) {
            req.session.cart = req.session.cart.filter(product => product._id != productId);
        }
        res.status(200).json({ message: "Product has been added to cart!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

module.exports = ProductRoutes;