import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {AuthContext} from "./AuthProvider";

const LoginForm: React.FC = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            alert('Login failed');
            return;
        }

        const data: { token: string } = await res.json();
        login(data.token);
        navigate('/home');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
            }}
        >
            <Typography variant="h5" mb={2}>
                Log In
            </Typography>

            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Log In
            </Button>

            <Typography variant="body2" mt={2} textAlign="center">
                Don’t have an account?{' '}
                <MuiLink component={RouterLink} to="/signup">
                    Sign up
                </MuiLink>
            </Typography>
        </Box>
    );
};

export default LoginForm;