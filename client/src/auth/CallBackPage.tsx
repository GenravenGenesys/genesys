import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {
    Box,
    Typography,
    Paper,
    Container,
} from "@mui/material";

const CallbackPage: React.FC = () => {
    const {error} = useAuth0();

    if (error) {
        return (
            <Container maxWidth="md">
                <Box sx={{py: 4}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Error
                    </Typography>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="body1">{error.message}</Typography>
                    </Paper>
                </Box>
            </Container>
        );
    }

    return (
        <Box>
            <Container maxWidth="md">
                <Box sx={{py: 4}}>
                    {/* You can add a loading spinner or redirect logic here if needed */}
                </Box>
            </Container>
        </Box>
    );
};

export default CallbackPage;