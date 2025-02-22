"use client"
import React, { useState } from 'react'
import Script from 'next/script'

const InputField = ({ name, type, placeholder, value, onChange }) => {
    return (
        <div className="mb-5 flex gap-3 rounded-full bg-[#333A5c] px-6 py-3">
            <input name={name} type={type} placeholder={placeholder} className="border-none outline-none bg-transparent w-full text-white" value={value} onChange={onChange} required />
        </div>
    );
}

const SocialButtons = () => {
    return (
        <div className="mt-6 flex justify-center w-full gap-6">
            <button className="bg-[#333A5c] px-4 py-1.5 w-full max-w-56 rounded-lg flex justify-center items-center cursor-pointer">
                <span className="text-indigo-100 tracking-wide text-base w-full">Google</span>
            </button>
            <button className="bg-[#333A5c] px-4 py-1.5 w-full max-w-56 rounded-lg flex justify-center items-center cursor-pointer">
                <span className="text-indigo-100 tracking-wide text-base w-full">Facebook</span>
            </button>
        </div>
    );
}

const page = () => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted', form);
    };
    return (
        <>
            <Script src="https://unpkg.com/@tailwindcss/browser@4" strategy="lazyOnload"></Script>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-400 relative">
                <div className="absolute top-4 left-6 flex justify-center items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 492.481 492.481" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <polygon fill="#0077FF" points="25.687,297.141 135.735,0 271.455,0 161.398,297.141" />
                        <polygon fill="#DA498C" points="123.337,394.807 233.409,97.674 369.144,97.674 259.072,394.807" />
                        <polygon fill="#0077FF" points="221.026,492.481 331.083,195.348 466.794,195.348 356.746,492.481" />
                    </svg>
                    <p className="text-2xl text-indigo-500 tracking-wide font-bold">Logo</p>
                </div>
                <div className="w-full rounded-lg bg-slate-900 p-10 text-sm text-indigo-300 sm:w-96 max-w-96 mt-18">
                    <h1 className="mb-4 text-center text-3xl font-semibold text-white">Create Account</h1>
                    <p className="mb-6 text-center text-md">Create your account now!</p>
                    <form onSubmit={handleSubmit}>
                        <InputField name="fullName" type="text" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
                        <InputField name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
                        <InputField name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                        <p className="mb-6 text-sm flex justify-end cursor-pointer">Forgot Password?</p>
                        <button className="w-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-900 py-3 font-medium tracking-wide text-white cursor-pointer">Sign Up</button>
                    </form>
                    <p className="mt-4 mb-7 text-center text-sm text-slate-400">Already Have an account? <a href="#" className="hover:underline text-blue-600">Login</a></p>
                    <span className="block w-full h-0.5 bg-gradient-to-r from-slate-900 via-indigo-500 to-slate-900"></span>
                    <SocialButtons />
                </div>
            </div>
        </>
    )
}

export default page