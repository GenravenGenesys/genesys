import {Alert, CircularProgress, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {Fragment} from "react";
import {useFetchCurrentCampaign} from "../../../hooks/campaign/useFetchCurrentCampaign.ts";
import {useFetchAllCampaigns} from "../../../hooks/campaign/useFetchAllCampaigns.ts";

interface Props {
    onChange: (event: SelectChangeEvent) => void;
}

export default function CampaignSelection(props: Props) {
    const {onChange} = props;
    const {campaign, loading, error} = useFetchCurrentCampaign();
    const {campaigns} = useFetchAllCampaigns();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    const render = () => {
        if (campaigns.length === undefined || campaigns.length === 0) {
            return <Fragment></Fragment>
        } else {
            return (
                <Select value={campaign?.name!} onChange={onChange} variant={'standard'}>
                    {campaigns.map((campaign) => (<MenuItem key={campaign.name} value={campaign.id}>{campaign.name}</MenuItem>))}
                </Select>
            );
        }
    };

    return (
        <Fragment>
            {render()}
        </Fragment>
    );
}