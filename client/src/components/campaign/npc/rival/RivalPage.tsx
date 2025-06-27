import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import { ActorPath } from "../../../../services/RootPath";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import RivalService from "../../../../services/actor/RivalService";
import { ActorSkill } from "../../../../models/actor/Actor";
import { ActorWeapon } from "../../../../models/equipment/Weapon";
import { ActorArmor } from "../../../../models/equipment/Armor";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import { ActorTalent } from "../../../../models/Talent";
import RivalCharacteristicTab from "./RivalCharacteristicTab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import GridContainer from "../../../common/grid/GridContainer";

const RivalPage = () => {
    const { id } = useParams<{ id: string }>();
    const [tab, setTab] = React.useState("1");

    const {
        data: rival,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["rival", id],
        queryFn: () => RivalService.getRival(id!),
        enabled: !!id,
    });

    const handleChange = React.useCallback(
        (_: React.SyntheticEvent, newValue: string) => {
            setTab(newValue);
        },
        []
    );

    const handleSkillChange = async (value: ActorSkill) => {
        if (rival) {
            await RivalService.updateRivalSkill(rival.id, value);
            refetch();
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (rival) {
            await RivalService.updateRival({ ...rival, armors: value });
            refetch();
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (rival) {
            await RivalService.updateRival({ ...rival, weapons: value });
            refetch();
        }
    };

    const handleAbilityChange = async (values: Ability[]) => {
        if (rival) {
            await RivalService.updateRival({ ...rival, abilities: values });
            refetch();
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (rival) {
            await RivalService.updateRival({ ...rival, talents: values });
            refetch();
        }
    };

    if (isLoading || !rival) return <React.Fragment />;
    if (error) return <div>Failed to load rival data.</div>;

    return (
        <Card>
            <CenteredCardHeaderWithAction
                title={rival.name}
                path={ActorPath.Rival + rival.id}
                subheader={getRatings(rival)}
            />
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
                        <RivalCharacteristicTab rival={rival} updateRival={() => refetch()} />
                    </TabPanel>
                    <TabPanel value="2">
                        <SingleNonPlayerCharacterSkillCard actor={rival} onSkillChange={handleSkillChange} />
                    </TabPanel>
                    <TabPanel value="3">
                        <EquipmentCard
                            actor={rival}
                            updateArmors={handleArmorChange}
                            updateWeapons={handleWeaponChange}
                        />
                    </TabPanel>
                    <TabPanel value="4">
                        <AbilityTableCard abilities={rival.abilities} updateAbilities={handleAbilityChange} />
                    </TabPanel>
                    <TabPanel value="5">
                        <SingleNonPlayerCharacterTalentCard
                            talents={rival.talents}
                            updateTalents={handleTalentChange}
                        />
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
};

export default RivalPage;