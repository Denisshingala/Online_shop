const express = require("express");
const Products = require("../../models/MongoDB/Products.model");
const User = require("../../models/MongoDB/Users.model");
const Orders = require("../../models/MongoDB/Orders.model");
const authMiddleware = require("../../middleware/auth");

const ProductRoutes = express.Router();

ProductRoutes.get("/all", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ message: "Product Details!", data: products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.get("/my-product", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const products = await Products.find({ userId: user._id });
        res.status(200).json({ message: "Product Details!", data: products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.post("/add", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
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
                res.status(500).json({ message: "Something went wrong !!" })
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.get("/details/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Products.findOne({ _id: id });
        if (products) {
            res.status(200).json({ message: "Product Details!", "data": products });
        } else {
            res.status(200).json({ message: "Product Details!", "data": [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.get("/edit/details/:id", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const products = await Products.findOne({ _id: id, userId: user._id });
        if (products) {
            res.status(200).json({ message: "Product Details!", "data": products });
        } else {
            res.status(200).json({ message: "Product not found!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const body = req.body;
        const products = await Products.findOneAndUpdate({ _id: id, userId: user._id }, body);
        if (products) {
            res.status(200).json({ message: "Product Details!", "data": products });
        } else {
            res.status(200).json({ message: "Unauthorized request!", status: 403 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;

        const product = await Products.findById(id);

        if (user._id != product.userId) {
            return res.status(403).json({ message: "Unauthorized request!" });
        }

        Products.findByIdAndDelete(id)
            .then((product) => {
                res.status(200).json({ message: "Product has been deleted!", status: 200 });
            })
            .catch((error) => {
                console.log(error);
                res.status(200).json({ message: "Unauthorized request!", status: 403 });
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.get("/get-cart-items", authMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const user = await User.findOne({ email: userData.email }).populate("cart.items.productId");
        const items = user.cart.items.map((item) => {
            return {
                _id: item.productId._id,
                quantity: item.quantity,
                productPrice: item.productId.productPrice,
                productName: item.productId.productName,
                productURL: item.productId.productURL,
                productDescription: item.productId.productDescription,
            }
        });
        res.status(200).json({ message: "Cart items!", items: items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.post("/add-to-cart", authMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const { productId } = req.body;
        const user = await User.findOne({ email: userData.email });

        const cartItems = user.cart.items;
        const productIndex = cartItems.findIndex((item) => {
            return item.productId == productId;
        });

        if (productIndex >= 0) {
            cartItems[productIndex].quantity += 1;
        } else {
            cartItems.push({
                productId: productId,
                quantity: 1
            });
        }

        await User.findByIdAndUpdate(user, { $set: { cart: { items: cartItems } } })
            .then(() => {
                res.status(200).json({ message: "Product has been added to cart!", items: cartItems });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Something went wrong !!" })
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.delete("/remove-from-cart/:id", authMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const productId = req.params.id;
        const user = await User.findOne({ "email": userData.email });
        if (user) {
            const cart = user.cart.items.filter((product) => {
                return product.productId != productId;
            });
            await User.findByIdAndUpdate(user, { $set: { cart: { items: cart } } })
                .then(() => {
                    res.status(200).json({ message: "Product has been added to cart!" });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: "Something went wrong !!" })
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.post("/place-order", authMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const user = await User.findOne({ "email": userData.email }).populate("cart.items.productId");
        if (user) {
            const items = user.cart.items;
            const orderItems = items.map((item) => {
                return {
                    productId: item.productId._id,
                    quantity: item.quantity,
                    productPrice: item.productId.productPrice
                }
            });
            new Orders({ userId: user._id, items: orderItems }).save()
                .then(async () => {
                    await User.findOneAndUpdate({ email: userData.email }, { $set: { cart: { items: [] } } })
                        .then(() => {
                            res.status(200).json({ message: "Order has been placed!" });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ message: "Something went wrong !!" })
                        })
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: "Something went wrong !!" })
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

ProductRoutes.get("/order-history", authMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const user = await User.findOne({ email: userData.email });
        if (user) {
            const orders = await Orders.find({ "userId": user._id }).populate("items.productId");
            const ordersHistory = orders.map((order) => {
                return {
                    id: order._id,
                    products: order.items.map((product) => {
                        return {
                            productId: product.productId._id,
                            productName: product.productId.productName,
                            productURL: product.productId.productURL,
                            productPrice: product.productPrice,
                            orderItem: {
                                quantity: product.quantity
                            }
                        }
                    })
                }
            })
            res.status(200).json({ message: "Order details!", order: ordersHistory });
        } else {
            res.status(500).json({ message: "Unauthorised request!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" })
    }
})

module.exports = ProductRoutes;