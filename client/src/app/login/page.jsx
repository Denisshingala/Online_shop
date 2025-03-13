"use client"
import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AlertComponent from '../components/AlertComponent/AlertComponent';
import { useAuth } from '../utils/authContext';

const page = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [status, setStatus] = useState(null);
    const [message, setMesssage] = useState(null);
    const navigate = useRouter();
    const { signToken } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeAlert = () => {
        setStatus(null);
        setMesssage(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axiosInstance.post("/user/login", form)
            .then((res) => {
                if (res.data.status == 200) {
                    signToken(res.data.token);
                    navigate.push("/");
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
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} id="email" placeholder="Enter email" />
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={handleChange} className="form-control" id="password" placeholder="Password" />
                            </div>
                            <Link href="/reset-password" className="float-end mb-3 text-decoration-none">Forgot Password?</Link>
                            <button type="submit" className="btn btn-primary form-control">Sign Up</button>
                        </form>
                        <div className='mb-3 text-center'>Create new account? <Link href="/register" className="text-decoration-none">Register</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page