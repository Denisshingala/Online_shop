import React, { useState } from 'react'

const AlertComponent = ({ status, message, closeAlert = null }) => {
    switch (status) {
        case "success":
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Sucess!</strong> {message}
                    <button type="button" className="btn-close" onClick={closeAlert} data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        case "error":
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {message}
                    <button type="button" className="btn-close" onClick={closeAlert} data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        case "alert":
            return (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong> {message}
                    <button type="button" className="btn-close" onClick={closeAlert} data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        default:
            return "";
    }
}

export default AlertComponent;