"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import axiosInstance from '../utils/axiosInstance'
import Loading from '../components/Loading/Loading';
import CartItemCard from '../components/CartItemCard/CartItemCard';
import { useRouter } from 'next/navigation';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigator = useRouter();

    useEffect(() => {
        const getCartItem = async () => {
            await axiosInstance.get("/product/get-cart-items")
                .then((res) => {
                    if (res.data.items) {
                        setCartItems(res.data.items);
                    } else {
                        navigator.push("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }

        getCartItem();
    }, []);

    const removeCart = async (event) => {
        const productId = event.target.dataset.id;

        await axiosInstance.delete(`/product/remove-from-cart/${productId}`)
            .then((res) => {
                if (res.status == 200) {
                    setCartItems((cartItems) => {
                        return cartItems.filter(item => item._id != productId);
                    });
                } else {
                    console.log("Something went wrong!!");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        await axiosInstance.post("/product/place-order", cartItems)
            .then((res) => {
                if (res.status == 200) {
                    setCartItems([]);
                } else {
                    console.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <Header />
            {
                isLoading ?
                    <Loading />
                    :
                    (
                        <>
                            <div className="d-flex justify-content-center align-items-center flex-wrap">
                                {
                                    cartItems.length > 0 ?
                                        cartItems.map((cartItem, index) => {
                                            return <CartItemCard item={cartItem} key={index} removeCart={removeCart} />
                                        })
                                        :
                                        <h1 className='text-center text-secondary'>Your cart is an empty!!</h1>
                                }
                            </div>
                            {cartItems.length > 0 && <div className='m-auto w-25'><button className="btn btn-primary form-control" onClick={placeOrder}>Place order!</button></div>}
                        </>
                    )
            }
        </>
    );
}

export default Cart