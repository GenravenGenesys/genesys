import {Card, CardContent} from '@mui/material';
import {useParams} from 'react-router';
import Player from '../../../../models/actor/player/Player';
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {ActorPath} from "../../../../services/RootPath";
import PlayerSkillCard from "./skill/PlayerSkillCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import {ActorArmor} from "../../../../models/equipment/Armor";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import PlayerService from "../../../../services/actor/PlayerService";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import PlayerCharacteristicTab from "./PlayerCharacteristicTab";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import GridContainer from "../../../common/grid/GridContainer";

export default function PlayerPage() {
    const {id} = useParams<{ id: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [tab, setTab] = useState('1');

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setPlayer(await PlayerService.getPlayer(id));
        })()
    }, [id, setPlayer])

    if (!player) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (player) {
            setPlayer(await PlayerService.updatePlayer({...player, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (player) {
            setPlayer(await PlayerService.updatePlayer({...player, weapons: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={player.name} path={ActorPath.Player + player.id}/>
            <CardContent>
                <TabContext value={tab}>
                    <GridContainer centered>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Characteristics" value="1"/>
                            <Tab label="Skills" value="2"/>
                            <Tab label="Equipment" value="3"/>
                            <Tab label="Talents" value="4"/>
                        </TabList>
                    </GridContainer>
                    <TabPanel value="1">
                        <PlayerCharacteristicTab player={player} updatePlayer={setPlayer}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <PlayerSkillCard player={player}/>
                    </TabPanel>
                    <TabPanel value="3">
                        <EquipmentCard actor={player} updateArmors={handleArmorChange}
                                       updateWeapons={handleWeaponChange}/>
                    </TabPanel>
                    <TabPanel value="4">
                        <PlayerTalentCard talents={player.talents} player={player}/>
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
}
