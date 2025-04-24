import {Card, CardContent} from "@mui/material";
import {useParams} from "react-router-dom";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import {ActorPath} from "../../../../services/RootPath";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {Fragment, useEffect, useState} from "react";
import RivalService from "../../../../services/actor/RivalService";
import {ActorSkill} from "../../../../models/actor/Actor";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import {ActorArmor} from "../../../../models/equipment/Armor";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import {ActorTalent} from "../../../../models/Talent";
import RivalCharacteristicTab from "./RivalCharacteristicTab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import GridContainer from "../../../common/grid/GridContainer";

export default function RivalPage() {
    const {id} = useParams<{ id: string }>();
    const [rival, setRival] = useState<Rival | null>(null);
    const [tab, setTab] = useState('1');

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setRival(await RivalService.getRival(id));
        })()
    }, [id, setRival])

    if (!rival) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleSkillChange = async (value: ActorSkill) => {
        if (rival) {
            setRival(await RivalService.updateRivalSkill(rival.id, value));
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, weapons: value}));
        }
    };

    const handleAbilityChange = async (values: Ability[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, abilities: values}));
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, talents: values}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={rival.name} path={ActorPath.Rival + rival.id}
                                          subheader={getRatings(rival)}/>
            <CardContent>
                <TabContext value={tab}>
                    <GridContainer centered>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Characteristics" value="1"/>
                                        <Tab label="Skills" value="2"/>
                                        <Tab label="Equipment" value="3"/>
                                        <Tab label="Abilities" value="4"/>
                                        <Tab label="Talents" value="5"/>
                        </TabList>
                    </GridContainer>
                    <TabPanel value="1">
                        <RivalCharacteristicTab rival={rival} updateRival={setRival}/>
                    </TabPanel>
                        <TabPanel value="2">
                            <SingleNonPlayerCharacterSkillCard actor={rival} onSkillChange={handleSkillChange}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <EquipmentCard actor={rival} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange}/>
                        </TabPanel>
                        <TabPanel value="4">
                            <AbilityTableCard abilities={rival.abilities} updateAbilities={handleAbilityChange}/>
                        </TabPanel>
                        <TabPanel value="5">
                            <SingleNonPlayerCharacterTalentCard talents={rival.talents} updateTalents={handleTalentChange}/>
                        </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
}
