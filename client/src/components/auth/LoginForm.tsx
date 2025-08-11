import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "./AuthProvider";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error('Login failed');
            const data = await res.json();
            login(data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;