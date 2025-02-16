"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import axiosInstance from "./utils/axiosInstance";
import Card from "./components/Card/Card";
import Loading from "./components/Loading/Loading";

export default function home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('product/all')
            .then((res) => {
                if (res.status == 200) {
                    setProducts(res.data.data);
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const deleteProduct = async (event) => {
        const id = event.target.dataset.id;

        await axiosInstance.delete(`/product/delete/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setProducts((products) => {
                        return products.filter(product => product._id != id);
                    })
                } else {
                    console.error(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
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
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            {
                                products.length > 0 ?
                                    products.map((product, index) => {
                                        return <Card product={product} key={index} deleteProduct={deleteProduct} />
                                    })
                                    :
                                    <h1> No product found!</h1>
                            }
                        </div>
                    )
            }
        </>
    );
}
