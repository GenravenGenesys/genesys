import MainDashboard from "./MainDashboard"
import {useState} from "react";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import LoreDashboard from "./LoreDashboard";
import HomeCampaignDashboard from "./HomeCampaignDashboard";
import ActorDashboard from "./ActorDashboard";
import EquipmentDashboard from "./EquipmentDashboard";
import * as React from "react";

export default function HomeDashboard() {
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
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

    const renderCampaignDashboard = () => {
        return <HomeCampaignDashboard/>
    }

    return (
        <Card sx={{width: 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Dashboard'}>
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
                        <TabPanel value="5">{renderCampaignDashboard()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}