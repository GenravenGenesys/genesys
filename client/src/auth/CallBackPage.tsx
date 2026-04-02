import React from "react";
import {
    Box,
    Typography,
    Paper,
    Container,
} from "@mui/material";

const CallbackPage: React.FC = () => {
    return (
        <Box>
            <Container maxWidth="md">
                <Box sx={{py: 4}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Callback
                    </Typography>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="body1">
                            This page handles authentication callbacks. Authentication is currently disabled.
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default CallbackPage;