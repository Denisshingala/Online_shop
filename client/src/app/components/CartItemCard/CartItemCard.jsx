import React from 'react'

const CartItemCard = ({ item, removeCart }) => {
    return (
        <div className="card m-3" style={{ "width": "18rem" }}>
            <img className="card-img-top" style={{ "minHeight": "13rem" }} src={item.productURL} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title text-center">{item.productName}</h5>
                <p className="card-text mt-1 mb-0 text-center">Quantity: {item.quantity}</p>
                <div className="btn btn-success form-control my-2">$ {item.productPrice}</div>
                <button className="btn btn-danger form-control my-2" data-id={item._id} onClick={removeCart}>Remove from the cart</button>
            </div>
        </div>
    )
}

export default CartItemCard