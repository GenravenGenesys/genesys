import {useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {ActorPath} from "../../../../services/RootPath";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import AbilityTableCard from "../ability/AbilityTableCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import {ActorSkill} from "../../../../models/actor/Actor";
import {ActorArmor} from "../../../../models/equipment/Armor";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import Ability from "../../../../models/Ability";
import {ActorTalent} from "../../../../models/Talent";
import NemesisService from "../../../../services/actor/NemesisService";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import NemesisCharacteristicTab from "./NemesisCharacteristicTab";
import GridContainer from "../../../common/grid/GridContainer";

export default function NemesisPage() {
    const {id} = useParams<{ id: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);
    const [tab, setTab] = useState('1');

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setNemesis(await NemesisService.getNemesis(id));
        })()
    }, [id, setNemesis])

    if (!nemesis) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleSkillChange = async (value: ActorSkill) => {
        if (nemesis) {
            setNemesis(await NemesisService.updateNemesisSkill(nemesis.id, value));
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (nemesis) {
            setNemesis(await NemesisService.updateNemesis({...nemesis, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (nemesis) {
            setNemesis(await NemesisService.updateNemesis({...nemesis, weapons: value}));
        }
    };

    const handleAbilityChange = async (values: Ability[]) => {
        if (nemesis) {
            setNemesis(await NemesisService.updateNemesis({...nemesis, abilities: values}));
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (nemesis) {
            setNemesis(await NemesisService.updateNemesis({...nemesis, talents: values}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={nemesis.name} path={ActorPath.Nemesis + nemesis.id}
                                          subheader={getRatings(nemesis)}/>
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
                        <NemesisCharacteristicTab nemesis={nemesis} updateNemesis={setNemesis}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <SingleNonPlayerCharacterSkillCard actor={nemesis} onSkillChange={handleSkillChange}/>
                    </TabPanel>
                    <TabPanel value="3">
                        <EquipmentCard actor={nemesis} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange}/>
                    </TabPanel>
                    <TabPanel value="4">
                        <AbilityTableCard abilities={nemesis.abilities} updateAbilities={handleAbilityChange}/>
                    </TabPanel>
                    <TabPanel value="5">
                        <SingleNonPlayerCharacterTalentCard talents={nemesis.talents} updateTalents={handleTalentChange}/>
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
}