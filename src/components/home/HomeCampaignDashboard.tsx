import {Button, Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {useFetchCurrentCampaign} from "../campaign/CampaignWorkflow";
import {useState} from "react";
import CampaignSelectionDialog from "../campaign/selection/CampaignSelectionDialog";
import MainDashboard from "./MainDashboard";
import ActorDashboard from "./ActorDashboard";
import EquipmentDashboard from "./EquipmentDashboard";
import LoreDashboard from "./LoreDashboard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import CampaignDialog from "../campaign/CampaignDialog";
import CampaignPage from "../campaign/CampaignPage";

export default function HomeCampaignDashboard() {
    const campaign = useFetchCurrentCampaign();
    const [value, setValue] = useState('1');
    const [openCampaignSelectionDialog, setOpenCampaignSelectionDialog] = useState(false);
    const [openCampaignCreationDialog, setOpenCampaignCreationDialog] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const renderDefaultDashboard = () => {
        return <MainDashboard/>
    }

    const renderActorDashboard = () => {
        return <ActorDashboard/>
    }

    const renderEquipmentDashboard = () => {
        return <EquipmentDashboard/>
    }

    const renderLoreDashboard = () => {
        return <LoreDashboard/>
    }

    const renderCampaignPage = () => {
        return <CampaignPage campaign={campaign}/>
    }

    const getSubHeader = () => {
        return campaign ? campaign?.name! : 'No Campaign Selected';
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
                subheader={getSubHeader()}>
            </CardHeader>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Default" value="1"/>
                                <Tab label="Actor" value="2"/>
                                <Tab label="Equipment" value="3"/>
                                <Tab label="Lore" value="4"/>
                                <Tab label="Campaign" value="5"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderDefaultDashboard()}</TabPanel>
                        <TabPanel value="2">{renderActorDashboard()}</TabPanel>
                        <TabPanel value="3">{renderEquipmentDashboard()}</TabPanel>
                        <TabPanel value="4">{renderLoreDashboard()}</TabPanel>
                        <TabPanel value="5">{renderCampaignPage()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justifyContent={'center'}>
                    {renderButton()}
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