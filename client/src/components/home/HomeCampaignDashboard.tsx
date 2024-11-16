import {Button, Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {useFetchCurrentCampaign} from "../campaign/CampaignWorkflow";
import {useState} from "react";
import GenesysSystemDashboard from "./MainDashboard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import CampaignDialog from "../campaign/CampaignDialog";
import CampaignPage from "../campaign/CampaignPage";
import CampaignSelectionDialog from "../campaign/selection/CampaignSelectionDialog";
import ViewSessions from "../campaign/session/ViewSessions";
import PartyCard from "../campaign/party/PartyCard";
import CampaignService from "../../services/CampaignService";

export default function HomeCampaignDashboard() {
    const campaign = useFetchCurrentCampaign();
    const [value, setValue] = useState('1');
    const [openCampaignSelectionDialog, setOpenCampaignSelectionDialog] = useState(false);
    const [openCampaignCreationDialog, setOpenCampaignCreationDialog] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
        <Card  sx={{width: 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Dashboard'}
                subheader={campaign ? campaign?.name! : 'No Campaign Selected'}>
            </CardHeader>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Genesys System Defaults" value="1"/>
                                <Tab label="Campaign Information" value="2"/>
                                <Tab label="Party Information" value="3"/>
                                <Tab label="Session Management" value="4"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">
                            <GenesysSystemDashboard/>
                        </TabPanel>
                        <TabPanel value="2">
                            <CampaignPage campaign={campaign}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <PartyCard campaign={campaign}/>
                        </TabPanel>
                        <TabPanel value="4">
                            <ViewSessions camp={campaign}/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justifyContent={'center'}>
                    {renderButton()}
                    {campaign && <Button color='primary' variant='contained' onClick={startCampaign}>Start Campaign</Button>}
                </Grid>
            </CardActions>
            {openCampaignSelectionDialog && <CampaignSelectionDialog open={openCampaignSelectionDialog}
                                                                     onClose={(): void => setOpenCampaignSelectionDialog(false)}
                                                                     current={campaign}/>}
            {openCampaignCreationDialog && <CampaignDialog open={openCampaignCreationDialog}
                                                           onClose={(): void => setOpenCampaignCreationDialog(false)}/>}
        </Card>
    );
}