import Campaign from "../../models/campaign/Campaign";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import PartyCard from "./party/PartyCard";
import {useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ViewCampaignTalents from "./talent/ViewCampaignTalents";

interface Props {
    campaign: Campaign
}

export default function CampaignPage(props: Props) {
    const {campaign} = props;
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const renderDefaultDashboard = () => {
        return <PartyCard party={campaign.party}/>
    }

    // const renderActorDashboard = () => {
    //     return <ViewAllSessions campaign={campaign}/>
    // }

    const renderEquipmentDashboard = () => {
        return <ViewCampaignTalents campaign_id={String(campaign.campaign_id)}/>
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={campaign.name}>
            </CardHeader>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Party" value="1"/>
                                <Tab label="Talents" value="3"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderDefaultDashboard()}</TabPanel>
                        <TabPanel value="3">{renderEquipmentDashboard()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}