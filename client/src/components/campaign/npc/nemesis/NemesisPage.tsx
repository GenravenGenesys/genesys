import { useParams } from "react-router";
import { useState } from "react";
import * as React from "react";
import { Card, CardContent } from "@mui/material";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import { ActorPath } from "../../../../services/RootPath";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import AbilityTableCard from "../ability/AbilityTableCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import { ActorSkill } from "../../../../models/actor/Actor";
import { ActorArmor } from "../../../../models/equipment/Armor";
import { ActorWeapon } from "../../../../models/equipment/Weapon";
import Ability from "../../../../models/Ability";
import { ActorTalent } from "../../../../models/Talent";
import NemesisService from "../../../../services/actor/NemesisService";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import NemesisCharacteristicTab from "./NemesisCharacteristicTab";
import GridContainer from "../../../common/grid/GridContainer";
import { useQuery } from "@tanstack/react-query";

const NemesisPage = () => {
    const { id } = useParams<{ id: string }>();
    const [tab, setTab] = useState('1');

    const {
        data: nemesis,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["nemesis", id],
        queryFn: () => NemesisService.getNemesis(id!),
        enabled: !!id,
    });

    if (isLoading || !nemesis) return <React.Fragment />;
    if (error) return <div>Failed to load nemesis data.</div>;

    const handleChange = React.useCallback(
        (_: React.SyntheticEvent, newValue: string) => {
            setTab(newValue);
        },
        []
    );

    const handleSkillChange = async (value: ActorSkill) => {
        if (!nemesis) return;

        await NemesisService.updateNemesisSkill(nemesis.id, value);
        refetch();
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (!nemesis) return;

        await NemesisService.updateNemesis({ ...nemesis, armors: value });
        refetch();
    };


    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (!nemesis) return;

        await NemesisService.updateNemesis({ ...nemesis, weapons: value });
        refetch();
    };


    const handleAbilityChange = async (values: Ability[]) => {
        if (!nemesis) return;

        await NemesisService.updateNemesis({ ...nemesis, abilities: values });
        refetch();
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (!nemesis) return;

        await NemesisService.updateNemesis({ ...nemesis, talents: values });
        refetch();
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={nemesis.name} path={ActorPath.Nemesis + nemesis.id}
                subheader={getRatings(nemesis)} />
            <CardContent>
                <TabContext value={tab}>
                    <GridContainer centered>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Characteristics" value="1" />
                            <Tab label="Skills" value="2" />
                            <Tab label="Equipment" value="3" />
                            <Tab label="Abilities" value="4" />
                            <Tab label="Talents" value="5" />
                        </TabList>
                    </GridContainer>
                    <TabPanel value="1">
                        <NemesisCharacteristicTab nemesis={nemesis} updateNemesis={() => refetch} />
                    </TabPanel>
                    <TabPanel value="2">
                        <SingleNonPlayerCharacterSkillCard actor={nemesis} onSkillChange={handleSkillChange} />
                    </TabPanel>
                    <TabPanel value="3">
                        <EquipmentCard actor={nemesis} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange} />
                    </TabPanel>
                    <TabPanel value="4">
                        <AbilityTableCard abilities={nemesis.abilities} updateAbilities={handleAbilityChange} />
                    </TabPanel>
                    <TabPanel value="5">
                        <SingleNonPlayerCharacterTalentCard talents={nemesis.talents} updateTalents={handleTalentChange} refetch={refetch} />
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
};

export default NemesisPage;