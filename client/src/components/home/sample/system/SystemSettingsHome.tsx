import {Box, Typography} from "@mui/material";

export default function SystemSettingsHome() {
        return (
            <Box sx={{p: 4, maxWidth: 1400, mx: 'auto'}}>
                <Box sx={{mb: 6, display: 'flex', alignItems: 'flex-end', gap: 2}}>
                    <Typography variant="h3" fontWeight="900" sx={{lineHeight: 1}}>
                        Genesys RPG System Settings
                    </Typography>
                </Box>
            </Box>
        );
}