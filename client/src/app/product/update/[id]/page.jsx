"use client";
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/Loading';
import ProductForm from '@/app/components/ProductForm/ProductForm';
import axiosInstance from '@/app/utils/axiosInstance';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id == "undefined" || id == null) {
            router.push("/");
        }
        const getProductDetails = async () => {
            await axiosInstance.get(`/product/edit/details/${id}`)
                .then((res) => {
                    if (res.data.data) {
                        setProduct(res.data.data);
                        setIsLoading(false);
                    } else {
                        router.push("/");
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
        getProductDetails();
    }, []);

    const updateProduct = async (event, data) => {
        event.preventDefault();

        await axiosInstance.put(`/product/update/${data.productId}`, data)
            .then((res) => {
                if (res.status == 200) {
                    router.push("/");
                } else {
                    console.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
            <Header />
            {
                isLoading ?
                    <Loading />
                    :
                    <ProductForm submitForm={updateProduct} product={product} />
            }
        </>
    )
}

export default page