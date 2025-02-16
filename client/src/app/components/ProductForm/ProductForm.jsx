import React, { useState } from 'react'

const ProductForm = ({ submitForm, product = {} }) => {

    const [formData, setFormData] = useState({
        productId: product?._id ?? "",
        productName: product?.productName ?? "",
        productURL: product?.productURL ?? "",
        productPrice: product?.productPrice ?? "",
        productDescription: product?.productDescription ?? ""
    });

    const setValue = (e) => {
        setFormData((oldData) => ({ ...oldData, [e.target.name]: e.target.value }));
    }

    return (
        <div className="border rounded-1 p-3 w-25 mx-auto">
            <form action="/" onSubmit={(event) => submitForm(event, formData)}>
                <input type="hidden" name="productId" value={formData.productId} />
                <div className="mb-3">
                    <label htmlFor="product-name" className="form-label">Product name</label>
                    <input type="text" className="form-control" name='productName' onChange={setValue} value={formData.productName} id="product-name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="product-img" className="form-label">Product image URL</label>
                    <input type="url" className="form-control" name='productURL' onChange={setValue} value={formData.productURL} id="product-img" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="product-price" className="form-label d-block">Product price</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" name='productPrice' onChange={setValue} value={formData.productPrice} id="product-price" min={0} aria-label="Amount (to the nearest dollar)" required />
                        <span className="input-group-text">.00</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="product-discription" className="form-label">Product Discription</label>
                    <textarea className="form-control" name='productDescription' onChange={setValue} value={formData.productDescription} id="product-discription" required />
                </div>
                <button type="submit" className="btn btn-primary form-control">Submit</button>
            </form>
        </div>
    )
}

export default ProductForm