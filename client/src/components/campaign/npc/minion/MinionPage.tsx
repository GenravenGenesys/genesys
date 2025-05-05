import {Card, CardContent} from "@mui/material";
import {useParams} from "react-router";
import * as React from "react";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import {ActorPath} from "../../../../services/RootPath";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {Fragment, useEffect, useState} from "react";
import MinionService from "../../../../services/actor/MinionService";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import {ActorArmor} from "../../../../models/equipment/Armor";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import Minion, {GroupSkill} from "../../../../models/actor/npc/Minion";
import MinionSkillCard from "./skill/MinionSkillCard";
import MinionTalentCard from "./talent/MinionTalentCard";
import {ActorTalent} from "../../../../models/Talent";
import MinionCharacteristicTab from "./MinionCharacteristicTab";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import GridContainer from "../../../common/grid/GridContainer";

export default function MinionPage() {
    const {id} = useParams<{ id: string }>();
    const [minion, setMinion] = useState<Minion | null>(null);
    const [tab, setTab] = useState('1');

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setMinion(await MinionService.getMinion(id));
        })()
    }, [id, setMinion])

    if (!minion) {
        return <Fragment/>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleSkillChange = async (value: GroupSkill) => {
        if (minion) {
            setMinion(await MinionService.updateMinionSkill(minion.id, value));
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (minion) {
            setMinion(await MinionService.updateMinion({...minion, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (minion) {
            setMinion(await MinionService.updateMinion({...minion, weapons: value}));
        }
    };

    const handleAbilityChange = async (values: Ability[]) => {
        if (minion) {
            setMinion(await MinionService.updateMinion({...minion, abilities: values}));
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (minion) {
            setMinion(await MinionService.updateMinion({...minion, talents: values}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={minion.name} path={ActorPath.Minion + minion.id}
                                          subheader={getRatings(minion)}/>
            <CardContent>
                <TabContext value={tab}>
                    <GridContainer>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Characteristics" value="1"/>
                            <Tab label="Skills" value="2"/>
                            <Tab label="Equipment" value="3"/>
                            <Tab label="Abilities" value="4"/>
                            <Tab label="Talents" value="5"/>
                        </TabList>
                    </GridContainer>
                    <TabPanel value="1">
                        <MinionCharacteristicTab minion={minion} updateMinion={setMinion}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <MinionSkillCard minion={minion} onGroupSkillChange={handleSkillChange}/>
                    </TabPanel>
                    <TabPanel value="3">
                        <EquipmentCard actor={minion} updateArmors={handleArmorChange}
                                       updateWeapons={handleWeaponChange}/>
                    </TabPanel>
                    <TabPanel value="4">
                        <AbilityTableCard abilities={minion.abilities} updateAbilities={handleAbilityChange}/>
                    </TabPanel>
                    <TabPanel value="5">
                        <MinionTalentCard talents={minion.talents} updateTalents={handleTalentChange}/>
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
}
