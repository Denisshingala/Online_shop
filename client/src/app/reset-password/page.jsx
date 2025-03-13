"use client"
import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import AlertComponent from '../components/AlertComponent/AlertComponent';

const page = () => {
    const [form, setForm] = useState({ email: '' });
    const [status, setStatus] = useState(null);
    const [message, setMesssage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeAlert = () => {
        setStatus(null);
        setMesssage(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await axiosInstance.post("/user/reset-password", form)
            .then((res) => {
                if (res.data.status == 200) {
                    setForm({ email: "" });
                    setMesssage(res.data.message);
                    setStatus("success");
                } else {
                    setMesssage(res.data.message);
                    setStatus("error");
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-6 mx-auto">
                    <div className="card card-outline-secondary w-75">
                        <div className="card-header p-3">
                            <h3 className="mb-0">Reset passsword</h3>
                        </div>
                        <form onSubmit={handleSubmit} className='p-3'>
                            <AlertComponent status={status} message={message} closeAlert={closeAlert} />
                            <div className="form-group my-4">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} value={form.email} id="email" placeholder="Enter email" required />
                            </div>
                            <button type="submit" className="btn btn-primary form-control" disabled={isLoading}>Reset password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page