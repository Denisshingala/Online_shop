"use client";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

// modify the request
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;