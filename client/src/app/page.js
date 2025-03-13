"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import axiosInstance from "./utils/axiosInstance";
import Card from "./components/Card/Card";
import Loading from "./components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useAuth } from "./utils/authContext";

export default function home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigator = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        axiosInstance.get('product/all')
            .then((res) => {
                if (res.status == 200) {
                    setProducts(res.data.data);
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
    }, []);

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
                                        return <Card product={product} key={index} isEditable={false} isAuthenticated={isAuthenticated} />
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
