import {Alert, Button, Card, CardActions, CardContent, CardHeader, CircularProgress} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import GenesysSystemDashboard from "./MainDashboard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CampaignDialog from "../campaign/CampaignDialog";
import CampaignPage from "../campaign/CampaignPage";
import CampaignSelectionDialog from "../campaign/selection/CampaignSelectionDialog";
import ViewSessions from "../campaign/session/ViewSessions";
import CampaignService from "../../services/CampaignService";
import ViewAllPlayers from "../campaign/party/player/ViewAllPlayers";
import Tab from "@mui/material/Tab";
import ViewScenes from "../campaign/scene/ViewScenes";
import GridContainer from "../common/grid/GridContainer";
import FullGrid from "../common/grid/FullGrid";
import {
    getCurrentCampaignController
} from "../../api/generated/current-campaign-controller/current-campaign-controller.ts";
import type {Campaign} from "../../api/model";

export default function HomeCampaignDashboard() {
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState('1');
    const [openCampaignSelectionDialog, setOpenCampaignSelectionDialog] = useState(false);
    const [openCampaignCreationDialog, setOpenCampaignCreationDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getCurrentCampaignController().getCurrentCampaign();
                setCampaign(response);
            } catch (err) {
                setError('Failed to load injury.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const startCampaign = async () => {
        await CampaignService.updateCampaign({
            ...campaign,
            active: true
        });
    }

    const renderButton = () => {
        return campaign ? <Button color='primary' variant='contained'
                                  onClick={(): void => setOpenCampaignSelectionDialog(true)}>Change Campaign</Button> :
            <Button color='primary' variant='contained'
                    onClick={(): void => setOpenCampaignCreationDialog(true)}>Create Campaign</Button>;
    }

    return (
        <Card sx={{width: 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Dashboard'}
                subheader={campaign ? campaign?.name! : 'No Campaign Selected'}>
            </CardHeader>
            <CardContent>
                <FullGrid>
                    <TabContext value={value}>
                        <GridContainer centered>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Genesys System Defaults" value="1"/>
                                <Tab label="Campaign Information" value="2" disabled={!campaign}/>
                                <Tab label="Party Information" value="3" disabled={!campaign}/>
                                <Tab label="Session Management" value="4" disabled={!campaign}/>
                                <Tab label="Scene Management" value="5" disabled={!campaign}/>
                            </TabList>
                        </GridContainer>
                        <TabPanel value="1">
                            <GenesysSystemDashboard/>
                        </TabPanel>
                        <TabPanel value="2">
                            {campaign && <CampaignPage campaign={campaign}/>}
                        </TabPanel>
                        <TabPanel value="3">
                            <ViewAllPlayers/>
                        </TabPanel>
                        <TabPanel value="4">
                            {campaign && <ViewSessions camp={campaign}/>}
                        </TabPanel>
                        <TabPanel value="5">
                            <ViewScenes/>
                        </TabPanel>
                    </TabContext>
                </FullGrid>
            </CardContent>
            <CardActions>
                <GridContainer centered>
                    {renderButton()}
                    {campaign && <Button color='primary' variant='contained' onClick={startCampaign}>Start Campaign</Button>}
                </GridContainer>
            </CardActions>
            {openCampaignSelectionDialog && <CampaignSelectionDialog open={openCampaignSelectionDialog}
                                                                     onClose={(): void => setOpenCampaignSelectionDialog(false)}
                                                                     current={campaign}/>}
            {openCampaignCreationDialog && <CampaignDialog open={openCampaignCreationDialog}
                                                           onClose={(): void => setOpenCampaignCreationDialog(false)}/>}
        </Card>
    );
}