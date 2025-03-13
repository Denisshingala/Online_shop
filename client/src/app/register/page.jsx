"use client"
import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AlertComponent from '../components/AlertComponent/AlertComponent';

const page = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [status, setStatus] = useState(null);
    const [message, setMesssage] = useState(null);
    const navigate = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeAlert = () => {
        setStatus(null);
        setMesssage(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axiosInstance.post("/user/create", form)
            .then((res) => {
                if (res.data.status == 200) {
                    navigate.push("/login");
                } else {
                    setMesssage(res.data.message);
                    setStatus("error");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-6 mx-auto">
                    <div className="card card-outline-secondary w-75">
                        <div className="card-header p-3">
                            <h3 className="mb-0">Sign Up</h3>
                        </div>
                        <form onSubmit={handleSubmit} className='p-3'>
                            <AlertComponent status={status} message={message} closeAlert={closeAlert} />
                            <div className="form-group my-4">
                                <label htmlFor="username">User name</label>
                                <input type="username" name="username" onChange={handleChange} className="form-control" id="username" placeholder="User name" />
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} id="email" placeholder="Enter email" />
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={handleChange} className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary form-control">Sign Up</button>
                        </form>
                        <div className='mb-3 text-center'>Already have an account? <Link href="/login" className="text-decoration-none">Login</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page