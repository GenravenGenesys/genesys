import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import Campaign from "../../../models/campaign/Campaign";
import CampaignService from "../../../services/CampaignService";

interface Props {
    onChange: (event: SelectChangeEvent) => void
}

export default function CampaignSelection(props: Props) {
    const {onChange} = props
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [campaign, setCampaign] = useState<Campaign>()

    useEffect(() => {
        (async (): Promise<void> => {
            setCampaigns(await CampaignService.getAllCampaigns())
        })()
    }, [setCampaigns])

    useEffect(() => {
        (async (): Promise<void> => {
            setCampaign(await CampaignService.getCurrentCampaign())
        })()
    }, [setCampaign])

    const render = () => {
        if (campaigns.length === undefined || campaigns.length === 0) {
            return <Fragment></Fragment>
        } else {
            <Select value={campaign?.name!} onChange={onChange} variant={'standard'}>
                {campaigns.map((set) => (<MenuItem key={set.name} value={set.name}>{set.name}</MenuItem>))}
            </Select>
        }
    }

    return (
        <Fragment>
            {render()}
        </Fragment>
    )
}