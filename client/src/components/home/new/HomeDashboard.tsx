import {Box, CircularProgress} from '@mui/material';
import FocusedVTT from "./FocusedVTT.tsx";
import CampaignWizard from "./campaign-creation/CampaignWizard.tsx";
import {useGetAllCampaigns} from "../../../api/generated/campaign-controller/campaign-controller.ts";


export default function CampaignDashboardPage() {
    const {data: response, isLoading, error, isFetching} = useGetAllCampaigns();

    if (isLoading || isFetching) {
        return (
            <Box sx={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return <CampaignWizard/>;
    }

    const campaigns = response?.data || [];

    if (campaigns.length === 0) {
        return <CampaignWizard/>;
    }

    return <FocusedVTT campaigns={campaigns}/>;
}
