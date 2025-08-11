import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography, SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "./AuthProvider";
import {LoginResponse, SignupPayload} from "./Auth";

const SignupForm: React.FC = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState<SignupPayload>({
        username: '',
        password: '',
        role: 'PLAYER',
    });
    const navigate = useNavigate();

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e: SelectChangeEvent<'DM' | 'PLAYER'>) => {
        setForm((prev) => ({ ...prev, role: e.target.value as 'DM' | 'PLAYER' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            alert('Signup failed');
            return;
        }

        const data: LoginResponse = await res.json();
        login(data.token);
        navigate('/dashboard');
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
                Create Account
            </Typography>

            <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleTextChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleTextChange}
                fullWidth
                margin="normal"
                required
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select name="role" value={form.role} onChange={handleRoleChange} label="Role">
                    <MenuItem value="PLAYER">Player</MenuItem>
                    <MenuItem value="DM">Dungeon Master</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign Up
            </Button>

            <Typography variant="body2" mt={2} textAlign="center">
                Already have an account? <a href="/login">Log in</a>
            </Typography>
        </Box>
    );
};

export default SignupForm;