"use client";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

// modify the request
axiosInstance.interceptors.request.use((config) => {
    // Check if localStorage is available (only in the client-side)
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const accessToken = JSON.parse(token);

                if (accessToken) {
                    if (config.headers) {
                        config.headers["Authorization"] = `Bearer ${accessToken}`; // Typically you send the token like this
                    }
                }
            } catch (e) {
                console.error("Error parsing token from localStorage:", e);
            }
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;