import React from 'react'
import OrderItem from '../OrderItem/OrderItem'
import styles from './Order.module.css'

const Order = ({ order }) => {
    return (
        <>
            {
                <div className="w-50 m-auto my-5">
                    <div className={`card ${styles.card1}`}>
                        <div className="card-header bg-white">
                            <div className="media flex-sm-row flex-column-reverse justify-content-between">
                                {/* <div className="col my-auto"> <h4 className="mb-0">Thanks for your Order,<span className="change-color">Denis</span> !</h4> </div> */}
                                <div className="col-auto text-center my-auto pl-0 pt-sm-4">
                                    <img className="img-fluid my-auto align-items-center mb-0 pt-3" src="/images/e-commerce.png" width="115" height="115" />
                                    <p className="mb-4 pt-0 Glasses">Thank you for order!!</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-between mb-3">
                                <div className="col-auto"> <h6 className="color-1 mb-0 change-color">Receipt</h6> </div>
                                <div className="col-auto  "> <small>Invoice number: #{order.id}</small> </div>
                            </div>
                            {
                                order.products.map((product, index) => {
                                    return <OrderItem product={product} key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Order