import {Box, CircularProgress} from '@mui/material';
import FocusedVTT from "./FocusedVTT.tsx";
import CampaignWizard from "./campaign-creation/CampaignWizard.tsx";
import {useGetAllCampaigns} from "../../../api/generated/campaign-controller/campaign-controller.ts";


export default function CampaignDashboardPage() {
    const {data: campaignsResponse, isLoading} = useGetAllCampaigns();
    const campaigns = campaignsResponse?.data;

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (!campaigns || campaigns.length === 0) {
        return <CampaignWizard/>;
    }

    return <FocusedVTT campaigns={campaigns}/>;
}