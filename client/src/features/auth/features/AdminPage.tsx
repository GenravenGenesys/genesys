import React from "react";
import {
    Box,
    Typography,
    Paper,
    Stack,
} from '@mui/material';

export const AdminPage: React.FC = () => {
    return (
        <Box sx={{p: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Page
            </Typography>
            <Paper elevation={3} sx={{p: 3}}>
                <Stack spacing={2}>
                    <Typography variant="body1">
                        This is the admin page. Authentication is currently disabled.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        When authentication is implemented, this page will be restricted to admin users.
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};
