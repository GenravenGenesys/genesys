import Campaign from "../../models/campaign/Campaign";
import {Card, CardContent} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ViewCampaignTalents from "./talents/ViewCampaignTalents";
import ViewCampaignSkills from "./skill/ViewCampaignSkills";
import CampaignCareers from "./career/CampaignCareers";
import CampaignArchetypes from "./archetype/CampaignArchetypes";
import CampaignWeapon from "./equipment/weapon/CampaignWeapon";
import CampaignArmor from "./equipment/armor/CampaignArmor";
import CampaignGear from "./equipment/gear/CampaignGear";
import CampaignMinion from "./npc/minion/CampaignMinion";
import CampaignRivals from "./npc/rival/CampaignRivals";
import CampaignNemeses from "./npc/nemesis/CampaignNemeses";
import LoreDashboard from "../home/LoreDashboard";
import GridContainer from "../common/grid/GridContainer";
import CenteredCardHeader from "../common/card/header/CenteredCardHeader";
import FullGrid from "../common/grid/FullGrid";

interface Props {
    campaign: Campaign
}

export default function CampaignPage(props: Props) {
    const {campaign} = props;
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    return (
        <Card>
            <CenteredCardHeader title={campaign.name}/>
            <CardContent>
                <FullGrid>
                    <TabContext value={value}>
                        <GridContainer centered>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Lore" value="1"/>
                                <Tab label="Talents" value="2"/>
                                <Tab label="Skills" value="3"/>
                                <Tab label='Archetypes' value='4'/>
                                <Tab label='Careers' value='5'/>
                                <Tab label='Weapons' value='6'/>
                                <Tab label='Armors' value='7'/>
                                <Tab label='Gear' value='8'/>
                                <Tab label='Nemesis' value='9'/>
                                <Tab label='Rival' value='10'/>
                                <Tab label='Minion' value='11'/>
                            </TabList>
                        </GridContainer>
                        <TabPanel value="1">
                            <LoreDashboard/>
                        </TabPanel>
                        <TabPanel value="2">
                            <ViewCampaignTalents/>
                        </TabPanel>
                        <TabPanel value="3">
                            <ViewCampaignSkills/>
                        </TabPanel>
                        <TabPanel value="4">
                            <CampaignArchetypes/>
                        </TabPanel>
                        <TabPanel value="5">
                            <CampaignCareers/>
                        </TabPanel>
                        <TabPanel value="6">
                            <CampaignWeapon/>
                        </TabPanel>
                        <TabPanel value="7">
                            <CampaignArmor/>
                        </TabPanel>
                        <TabPanel value="8">
                            <CampaignGear/>
                        </TabPanel>
                        <TabPanel value="9">
                            <CampaignNemeses/>
                        </TabPanel>
                        <TabPanel value="10">
                            <CampaignRivals/>
                        </TabPanel>
                        <TabPanel value="11">
                            <CampaignMinion/>
                        </TabPanel>
                    </TabContext>
                </FullGrid>
            </CardContent>
        </Card>
    )
}