import React from 'react'
import styles from './OrderItem.module.css'

const OrderItem = ({ product }) => {
    return (
        <div className="row my-2">
            <div className="col">
                <div className={`card ${styles.card2}`}>
                    <div className="card-body">
                        <div className="row media">
                            <div className="col sq align-self-center"> <img className="img-fluid  my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" src={product.productURL} width="135" height="135" /> </div>
                            <div className="col media-body my-auto text-right">
                                <div className="row my-auto flex-column flex-md-row">
                                    <div className="col my-auto">
                                        <h6 className="mb-0">{product.productName}</h6>
                                    </div>
                                    <div className="col my-auto">
                                        <small>Qty : {product.orderItem.quantity}</small>
                                    </div>
                                    <div className="col my-auto"><h6 className="mb-0">&#8377;{product.orderItem.quantity * product.productPrice}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3 " />
                        <div className="row">
                            <div className="col-md-3 mb-3"><small>Track order <span><i className=" ml-2 fa fa-refresh" aria-hidden="true"></i></span></small> </div>
                            <div className="col mt-auto">
                                <div className={`progress ${styles.progress} my-auto`}> <div className={`progress-bar progress-bar rounded ${styles.rounded} ${styles.progressBar}`} style={{ "width": "100%" }} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div> </div>
                                <div className="media row justify-content-between">
                                    <div className="col-auto text-right"><span> <small className="text-right mr-sm-2"></small> <i className={`fa fa-circle ${styles.faCircle}active`}></i> </span></div>
                                    <div className="col-auto flex-col"> <span> <small className="text-right mr-sm-2">Out for delivary</small><i className={`fa fa-circle ${styles.faCircle}active`}></i></span></div>
                                    <div className="col-auto flex-col-auto"><small className="text-right mr-sm-2">Delivered</small><span> <i className={`fa fa-circle${styles.faCircle}`}></i></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem