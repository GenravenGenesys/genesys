import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role);
        } else {
            setRole(null);
        }
    }, [token]);

    const login = (newToken: React.SetStateAction<string | null>) => {
        if (typeof newToken === "string") {
            localStorage.setItem('token', newToken);
        }
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
