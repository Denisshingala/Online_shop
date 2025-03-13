"use client"
import { createContext, useContext, useEffect, useState } from "react"
import axiosInstance from "./axiosInstance";
import Loading from "../components/Loading/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            await axiosInstance.get('/auth')
                .then((response) => {
                    if (response.data.status == 200) {
                        setIsAuthenticate(true);
                    } else {
                        setToken(null);
                        setIsAuthenticate(false);
                        localStorage.removeItem("token");
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        authenticateUser();
    }, []);

    const signToken = (token) => {
        setIsAuthenticate(true);
        setToken(token);
        localStorage.setItem("token", token);
    }

    const destroyToken = () => {
        setToken(null);
        setIsAuthenticate(false);
        localStorage.removeItem("token");
    }

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <AuthContext.Provider value={{ isAuthenticated, isLoading, token, signToken, destroyToken }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
}