const express = require("express");
const Products = require("../../models/MySQL/Products.model");
const Users = require("../../models/MySQL/Users.model");
const CartItems = require("../../models/MySQL/CartItems.model");

const productRoutes = express.Router();

productRoutes.get("/all", async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({ message: "Product Details!", "data": products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

productRoutes.post("/add", async (req, res) => {
    try {
        const { productName, productURL, productPrice, productDescription } = req.body;
        const user = await Users.findByPk(1);
        const newProduct = new Products({
            productName,
            productURL,
            productPrice,
            productDescription,
            userId: user.id
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

productRoutes.get("/details/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Products.findByPk(id);
        res.status(200).json({ message: "Product Details!", "data": products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

productRoutes.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { productId, productName, productURL, productPrice, productDescription } = req.body;

        if (id != productId) {
            return res.status(401).json({ message: "Invalid request for the product", "status": 401 })
        }

        const product = await Products.update({ productName, productURL, productPrice, productDescription }, { where: { "_id": productId } },);

        res.status(200).json({ message: "Product Details!", "data": product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

productRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Products.destroy({
            where: {
                _id: id
            }
        });
        res.status(200).json({ message: "Product has been deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

productRoutes.get("/get-cart-items", async (req, res) => {
    try {
        const user = await Users.findByPk(1);

        user.getCarts()
            .then((carts) => {
                if (carts.length) {
                    carts[0].getProducts()
                        .then((products) => {
                            return products.map((product) => ({
                                ...product.toJSON(),
                                quantity: product.cartItem.quantity
                            }));
                        })
                        .then((products) => {
                            res.status(200).json({ message: "Cart items!", items: products });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    res.status(200).json({ message: "Cart items!", items: [] });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

productRoutes.post("/add-to-cart", async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Products.findByPk(productId);
        const user = await Users.findByPk(1);

        user.getCarts()
            .then((carts) => {
                if (carts.length) {
                    carts[0].getProducts({ where: { _id: productId } })
                        .then((products) => {
                            if (products.length) {
                                carts[0].addProduct(products[0], {
                                    through: { quantity: products[0].cartItem.quantity + 1 }
                                });
                            } else {
                                carts[0].addProduct(product, {
                                    through: { quantity: 1 }
                                });
                            }
                            res.status(200).json({ message: "Product has been added to cart!" });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ message: error, "status": 500 })
                        });
                } else {
                    user.createCart()
                        .then((carts) => {
                            carts.addProduct(product, {
                                through: { quantity: 1 }
                            });
                            res.status(200).json({ message: "Product has been added to cart!" });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ message: error.toString(), "status": 500 })
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: error, "status": 500 })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
})

productRoutes.delete("/remove-from-cart/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const user = await Users.findByPk(1);

        user.getCarts()
            .then((carts) => {
                if (carts.length) {
                    carts[0].getProducts({ where: { _id: productId } })
                        .then((product) => {
                            product[0].cartItem.destroy()
                                .then(() => {
                                    res.status(200).json({ message: "Your cart has been removed!" });
                                })
                                .catch((error) => {
                                    console.log(error);
                                    res.status(500).json({ message: error, "status": 500 })
                                })
                        })
                        .catch((error) => {
                            res.status(500).json({ message: error, "status": 500 })
                        })
                } else {
                    res.status(200).json({ message: "Your cart is already an empty!" });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: error, "status": 500 })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!", "status": 500 })
    }
});

productRoutes.post("/place-order", async (req, res) => {
    try {
        const cartItem = req.body;
        const user = await Users.findByPk(1);

        user.getCarts()
            .then((cart) => {
                if (cart.length > 0) {
                    cart[0].getProducts()
                        .then((product) => {
                            return product;
                        })
                        .then((products) => {
                            user.createOrder()
                                .then((order) => {
                                    order.setProducts(products.map((product) => {
                                        product.orderItem = { quantity: product.cartItem.quantity }
                                        return product;
                                    }));
                                    return order;
                                })
                                .catch((error) => {
                                    console.log(error);
                                    res.status(500).json({ message: "Something went wrong!" });
                                });
                            cart[0].setProducts(null);
                            res.status(200).json({ message: "Your order has been placed!" });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    res.status(200).json({ message: "Your order is an empty!" });
                }
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!", status: 500 });
    }
});

productRoutes.get("/order-history", async (req, res) => {
    try {
        const user = await Users.findByPk(1);

        user.getOrders({
            include: [{
                model: Products,
            }]
        })
            .then((order) => {
                res.status(200).json({ message: "Order details!", order: order });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Something went wrong!", status: 500 });
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!", status: 500 });
    }
});

module.exports = productRoutes;