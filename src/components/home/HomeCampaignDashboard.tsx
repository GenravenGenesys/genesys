import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
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

export default function HomeCampaignDashboard() {
    const campaign = useFetchCurrentCampaign();
    const [value, setValue] = useState('1');
    const [openCampaignSelectionDialog, setOpenCampaignSelectionDialog] = useState(false);

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

    const getSubHeader = () => {
        return campaign?.name!
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Dashboard'}>
                subheader={getSubHeader()}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenCampaignSelectionDialog(true)}>Change Campaign</Button>}
                {openCampaignSelectionDialog && <CampaignSelectionDialog open={openCampaignSelectionDialog}
                                                                         onClose={(): void => setOpenCampaignSelectionDialog(false)}
                                                                         current={campaign}/>}
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
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderDefaultDashboard()}</TabPanel>
                        <TabPanel value="2">{renderActorDashboard()}</TabPanel>
                        <TabPanel value="3">{renderEquipmentDashboard()}</TabPanel>
                        <TabPanel value="4">{renderLoreDashboard()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    );
}