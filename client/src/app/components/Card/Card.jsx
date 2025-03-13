import axiosInstance from "@/app/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Card = ({ product, deleteProduct, isEditable, isAuthenticated }) => {
    const router = useRouter();

    const addToCart = async (event) => {
        const productId = event.target.dataset.id;
        await axiosInstance.post("/product/add-to-cart", { productId })
            .then((res) => {
                if (res.status == 200) {
                    console.log("added to the cart");
                } else {
                    console.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <div className="card m-3" style={{ "width": "18rem" }}>
            <img className="card-img-top" style={{ "minHeight": "13rem" }} src={product.productURL} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text" style={{ "minHeight": "50px" }}>{product.productDescription} <br />${product.productPrice}</p>
                {isEditable && <Link href={`/product/update/${product._id}`} className="btn btn-success form-control my-2">Update details</Link>}
                <div className="btn-group w-100" role="group" aria-label="Basic outlined example">
                    <Link href={`/product/details/${product._id}`} className="btn btn-primary form-control">View details</Link>
                    {isEditable && <button data-id={product._id} onClick={deleteProduct} className="btn btn-danger form-control">Delete</button>}
                </div>
                {isAuthenticated && <button className="btn btn-secondary form-control my-2" data-id={product._id} onClick={addToCart}>Add to cart</button>}
            </div>
        </div>
    );
}

export default Card;