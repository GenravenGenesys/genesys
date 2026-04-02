import React from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
} from "@mui/material";

const ProfilePage: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{py: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile Page
                </Typography>

                <Paper elevation={3} sx={{p: 3}}>
                    <Stack spacing={2}>
                        <Typography variant="body1">
                            This is the profile page. Authentication is currently disabled.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            When authentication is implemented, user profile information will be displayed here.
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default ProfilePage;