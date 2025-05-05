import {useParams} from "react-router";
import {Button, Card, CardContent} from "@mui/material";
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
import ViewCampaignScenes from "../scene/ViewCampaignScenes";
import GridContainer from "../../common/grid/GridContainer";

const SessionPage = () => {
    const {name} = useParams<{ name: string }>();
    const campaign = useFetchCurrentCampaign();
    const [value, setValue] = useState('1');

    if (!campaign) {
        return <Fragment/>;
    }
    const session = campaign.sessions.find(session => session.name === name) as CampaignSession;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
                <GridContainer>
                    <TabContext value={value}>
                        <GridContainer centered>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Settings" value="1"/>
                                <Tab label="Party" value="2"/>
                                <Tab label="Scenes" value="3"/>
                            </TabList>
                        </GridContainer>
                        <TabPanel value="1">
                            <GridContainer centered>
                                <Button variant="contained" color="primary" onClick={startSession}>Start
                                    Session</Button>
                                <Button variant="contained" color="primary" onClick={endSession}>End Session</Button>
                            </GridContainer>
                        </TabPanel>
                        <TabPanel value="2">
                            <PartyCard party={session.party}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <ViewCampaignScenes session={session}/>
                        </TabPanel>
                    </TabContext>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default SessionPage;