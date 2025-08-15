import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import {CodeSnippet} from "./CodeSnippet";
import {getAdminResource} from "./message-service";
import {
    Box,
    Typography,
    Paper,
    Stack,
} from '@mui/material';

export const AdminPage: React.FC = () => {
    const [message, setMessage] = useState<string>("");

    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getAdminResource(accessToken);

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);

    return (
        <Box sx={{p: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Page
            </Typography>
            <Paper elevation={3} sx={{p: 3}}>
                <Stack spacing={2}>
                    <Typography variant="body1">
                        This page retrieves an <strong>admin message</strong> from an external API.
                    </Typography>
                    <Typography variant="body1">
                        <strong>
                            Only authenticated users with the{' '}
                            <code>read:admin-messages</code> permission should access this page.
                        </strong>
                    </Typography>
                    <CodeSnippet title="Admin Message" code={message}/>
                </Stack>
            </Paper>
        </Box>
    );
};
