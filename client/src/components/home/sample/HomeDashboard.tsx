import {Box, CircularProgress} from '@mui/material';
import FocusedVTT from "./Sample.tsx";


export default function DashboardPage() {
    const {data: campaigns, isLoading} = useGetCampaigns();

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    }

    // 1. IF NO DATA: Render the Wizard directly as the main UI
    if (!campaigns || campaigns.length === 0) {
        return <CampaignWizard isFirstCampaign={true}/>;
    }

    // 2. IF DATA EXISTS: Render the standard list
    return <FocusedVTT/>;
}