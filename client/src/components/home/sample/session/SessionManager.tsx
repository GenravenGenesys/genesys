import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {CircularProgress, Typography} from "@mui/material";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import {useGetAllCampaignSessions} from "../../../../api/generated/sessions/sessions.ts";

export default function SessionManager() {
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading: isCampaignLoading} = useCampaignLive(id);
    const {data: sessions, isLoading: isSessionsLoading} = useGetAllCampaignSessions();
    // const {data: session, isLoading: isSessionLoading} = useGetCampaignSession(sessionId);

    if (isCampaignLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }
}