import { axiosInstance } from "@/lib/axiosinstance";
import { createContext, useState, useContext, useCallback, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within an AuthProvider");
    }
    return context;
}
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}
const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}
const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}
export function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");
        return access && refresh ? true : false;
    });

    const createUser = async (data) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post('auth/register', data);
            setIsAuthenticated(true);
            console.log(response.data)
            return response.data;
        } catch (err) {
            return err.response.data;
        } finally {
            setIsLoading(false)
        }
    }
    const login = async (data) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post('auth/login', data);
            setIsAuthenticated(true);
            console.log(response.data);
            if (response.data.access && response.data.refresh) {
                saveToLocalStorage("access", response.data.access);
                saveToLocalStorage("refresh", response.data.refresh);
            }
            return response.data;
        } catch (err) {
            return err.response.data;
        } finally {
            setIsLoading(false)
        }
    }
    const logout = () => {
        setIsAuthenticated(false);
        removeFromLocalStorage("access");
        removeFromLocalStorage("refresh");
    }

    useEffect(() => {
        const checkUser = () => {
            const accessToken = getFromLocalStorage("access");
            const refreshToken = getFromLocalStorage("refresh");
            if (accessToken && refreshToken) {
                setIsAuthenticated(true);
            }
        }
        checkUser();
    }, [])

    useEffect(() => {
        console.log("Auth Status:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <UserContext.Provider value={{ isLoading, setIsLoading, isAuthenticated, createUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}