import {useParams} from "react-router-dom";
import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import {useFetchCurrentCampaign} from "../CampaignWorkflow";
import {Fragment, useState} from "react";
import CampaignSession from "../../../models/campaign/CampaignSession";
import CampaignService from "../../../services/CampaignService";
import Party from "../../../models/campaign/Party";
import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import PartyCard from "../party/PartyCard";

export default function SessionPage() {
    const {name} = useParams<{ name: string }>();
    const campaign = useFetchCurrentCampaign();
    const [value, setValue] = useState('1');

    if (!campaign) {
        return <Fragment/>;
    }
    const session = campaign.sessions.find(session => session.name === name) as CampaignSession;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const startSession = async () => {
        const currentPartyState: Party = campaign.party;
        const updatedSession = {...session, party: currentPartyState, active: true};
        const updatedCampaign = {
            ...campaign,
            player: currentPartyState.players.length,
            gm: 1,
            sessions: campaign.sessions.map(s => s.name === session.name ? updatedSession : s)
        };
        await CampaignService.updateCampaign(updatedCampaign);
    };

    const endSession = async () => {
        const updatedSession = {...session, active: false};
        const updatedCampaign = {
            ...campaign,
            party: session.party,
            sessions: campaign.sessions.map(s => s.name === session.name ? updatedSession : s)
        };
        await CampaignService.updateCampaign(updatedCampaign);
    };

    return (
        <Card>
            <CenteredCardHeader title={session.name}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Settings" value="1"/>
                                <Tab label="Party" value="2"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">
                            <Button variant="contained" color="primary" onClick={startSession}>Start Session</Button>
                            <Button variant="contained" color="primary" onClick={endSession}>End Session</Button>
                        </TabPanel>
                        <TabPanel value="2">
                            <PartyCard party={session.party}/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    );
}