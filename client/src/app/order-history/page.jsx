"use client";
import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import axiosInstance from '../utils/axiosInstance'
import Loading from '../components/Loading/Loading';
import Order from '../components/Order/Order';

const orderHistory = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrderItems = async () => {
            await axiosInstance.get("product/order-history")
                .then((res) => {
                    if (res.status == 200) {
                        setOrders(res.data.order);
                    } else {
                        console.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        getOrderItems();
    }, [])

    return (
        <>
            <Header />
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        {
                            orders.length > 0 ?
                                orders.map((order, index) => {
                                    return <Order order={order} key={index} />
                                })
                                :
                                <h1 className='text-center text-secondary'>No any order history!!</h1>
                        }
                    </>
            }
        </>
    )
}

export default orderHistory