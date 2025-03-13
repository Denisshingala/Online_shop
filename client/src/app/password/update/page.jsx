"use client";
import AlertComponent from '@/app/components/AlertComponent/AlertComponent';
import axiosInstance from '@/app/utils/axiosInstance';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [validToken, setValidToken] = useState(false);
    const [verifyingToken, setVerifyingToken] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [email, setEmail] = useState(null);
    const getParam = useSearchParams();

    useEffect(() => {
        const verifyToken = async () => {
            let token = getParam.get("token");

            if (null == token) {
                setMessage("Token is invalid");
                setStatus("error");
            } else {
                await axiosInstance.get("/auth", {
                    headers: {
                        "Authorization": `Bearar ${token}`
                    }
                }).then((res) => {
                    if (res.data.status == 200) {
                        setEmail(res.data.user.email);
                        setValidToken(true);
                    } else {
                        setValidToken(false);
                    }
                }).catch((error) => {
                    setMessage(error);
                    setStatus("error");
                });
            }
        }
        verifyToken();
    }, []);

    const updatePassword = async (event) => {
        event.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            setMessage("Confirm password does not matched with new password!");
            setStatus("error");
        } else {
            await axiosInstance.post("/user/update-password", {
                email: email,
                password: form.newPassword
            }).then((response) => {
                if (response.data.status === 200) {
                    setMessage("Your password has been changed!");
                    setStatus("success");
                    setForm({ newPassword: "", confirmPassword: "" });
                    setEmail(null);
                } else {
                    setMessage(res.data.message);
                    setStatus("error");
                }
            }).catch((error) => {
                setMessage(error);
                setStatus("error");
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    const handleChange = (event) => {
        setForm((oldForm) => {
            return { ...oldForm, [event.target.name]: event.target.value };
        });
    }

    const closeAlert = () => {
        setMessage(null);
        setStatus(null);
    }

    return (
        <>
            {
                validToken ?
                    <>
                        <div className="row mt-5">
                            <div className="col-md-6 mx-auto">
                                <div className="card card-outline-secondary w-75">
                                    <div className="card-header p-3">
                                        <h3 className="mb-0">Update password</h3>
                                    </div>
                                    <form className='p-3' onSubmit={updatePassword}>
                                        <AlertComponent closeAlert={closeAlert} status={status} message={message} />
                                        <div className="mb-3">
                                            <label htmlFor="new-password" className="form-label">New password</label>
                                            <input type="password" className="form-control" name="newPassword" id="new-password" value={form.newPassword} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirm-password" className="form-label">Confirm new password</label>
                                            <input type="password" className="form-control" name="confirmPassword" id="confirm-password" value={form.confirmPassword} onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary form-control" disabled={isLoading}>Submit</button>
                                    </form>
                                    <h6 className='text-center'>Goto <Link href="/login" className='text-decoration-none'>Login</Link> page!</h6>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="alert alert-warning w-75 mx-auto text-center mt-5" role="alert">
                        Reset password link has been expired! Please, try again to <Link href="/reset-password">Reset password</Link>
                    </div>
            }
        </>
    )
}

export default page