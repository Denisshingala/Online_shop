"use client";
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';
import axiosInstance from '../utils/axiosInstance';
import Loading from '../components/Loading/Loading';
import ProductForm from '../components/ProductForm/ProductForm';

const addProduct = () => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const addProduct = async (event, formData) => {
        event.preventDefault();
        const data = formData;
        setIsLoading(true);

        await axiosInstance.post("/product/add", data)
            .then((res) => {
                if (res.status == 200) {
                    router.push("/");
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <>
                <Header />
                <ProductForm submitForm={addProduct} />
            </>
        );
    }
};

export default addProduct;