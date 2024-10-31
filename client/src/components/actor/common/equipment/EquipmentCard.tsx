import {Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useState} from "react";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import ArmorTable from "./armor/ArmorTable";
import {ActorArmor} from "../../../../models/equipment/Armor";
import Actor from "../../../../models/actor/Actor";
import WeaponTable from "./weapon/WeaponTable";
import {ActorWeapon} from "../../../../models/equipment/Weapon";

interface Props {
    actor: Actor
    updateArmors: (armors: ActorArmor[]) => void
    updateWeapons: (weapons: ActorWeapon[]) => void
}

export default function EquipmentCard(props: Props) {
    const {actor, updateArmors, updateWeapons} = props;
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Weapons" value="1"/>
                                <Tab label="Armor" value="2"/>
                                <Tab label="Gear" value="3"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">
                            <WeaponTable actor={actor} updateWeapons={updateWeapons}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <ArmorTable armors={actor.armors} updateArmors={updateArmors}/>
                        </TabPanel>
                        {/*<TabPanel value="3">{renderGearTab()}</TabPanel>*/}
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    );
}