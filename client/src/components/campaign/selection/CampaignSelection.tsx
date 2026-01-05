import {Alert, CircularProgress, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import CampaignService from "../../../services/CampaignService";
import type {Campaign} from "../../../api/model";
import {useFetchCurrentCampaign} from "../../../hooks/campaign/useFetchCurrentCampaign.ts";

interface Props {
    onChange: (event: SelectChangeEvent) => void;
}

export default function CampaignSelection(props: Props) {
    const {onChange} = props;
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const {campaign, loading, error} = useFetchCurrentCampaign();

    useEffect(() => {
        (async (): Promise<void> => {
            setCampaigns(await CampaignService.getAllCampaigns());
        })()
    }, [setCampaigns]);

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