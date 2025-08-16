import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {CodeSnippet} from "./CodeSnippet";
import {
    Box,
    Container,
    Typography,
    Avatar,
    Paper,
    Stack,
} from "@mui/material";

const ProfilePage: React.FC = () => {
    const {user} = useAuth0();

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{py: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile Page
                </Typography>

                <Paper elevation={3} sx={{p: 3}}>
                    <Stack spacing={2}>
                        <Typography variant="body1">
                            You can use the <strong>ID Token</strong> to get the profile
                            information of an authenticated user.
                        </Typography>
                        <Typography variant="body1">
                            <strong>Only authenticated users can access this page.</strong>
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                                src={user.picture}
                                alt="Profile"
                                sx={{width: 64, height: 64}}
                            />
                            <Box>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </Box>
                        </Stack>

                        <Box>
                            <CodeSnippet
                                title="Decoded ID Token"
                                code={JSON.stringify(user, null, 2)}
                            />
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default ProfilePage;