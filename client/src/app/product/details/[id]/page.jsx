"use client";
import React, { useEffect, useState } from 'react';
import Card from '@/app/components/Card/Card';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header/Header';
import axiosInstance from '@/app/utils/axiosInstance';

const productDetails = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axiosInstance.get(`/product/details/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    setProduct(res.data.data)
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);


    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center m-3">
                <Card product={product} />
            </div>
        </>
    );
};

export default productDetails;