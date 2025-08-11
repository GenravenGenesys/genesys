import React, { createContext, useState, useEffect } from 'react';
import {AuthContextType, JwtPayload} from "./Auth";
import {jwtDecode} from "jwt-decode";


export const AuthContext = createContext<AuthContextType>({
    token: null,
    role: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<JwtPayload['role'] | null>(null);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            setRole(decoded.role);
        } else {
            setRole(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
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
