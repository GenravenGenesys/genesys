import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import { ActorPath } from "../../../../services/RootPath";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import { Fragment, useEffect, useState, useCallback, useMemo } from "react";
import RivalService from "../../../../services/actor/RivalService";
import { ActorSkill } from "../../../../models/actor/Actor";
import { ActorWeapon } from "../../../../models/equipment/Weapon";
import { ActorArmor } from "../../../../models/equipment/Armor";
import AbilityTableCard from "../ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import { ActorTalent } from "../../../../models/Talent";
import RivalCharacteristicTab from "./RivalCharacteristicTab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import GridContainer from "../../../common/grid/GridContainer";

const RivalPage = React.memo(() => {
    const { id } = useParams<{ id: string }>();
    const [rival, setRival] = useState<Rival | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState('1');

    // Memoize the rival to prevent unnecessary re-renders
    const memoizedRival = useMemo(() => rival, [rival]);

    // Load rival data with proper cleanup
    useEffect(() => {
        if (!id) {
            setRival(null);
            setError(null);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setError(null);

        const loadRival = async (): Promise<void> => {
            try {
                const rivalData = await RivalService.getRival(id);
                if (isMounted) {
                    setRival(rivalData);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load rival');
                    setRival(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadRival();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        };
    }, [id]);

    // Memoize handlers to prevent unnecessary re-renders
    const handleChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    }, []);

    const handleSkillChange = useCallback(async (value: ActorSkill) => {
        if (memoizedRival) {
            try {
                const updatedRival = await RivalService.updateRivalSkill(memoizedRival.id, value);
                setRival(updatedRival);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update skill');
            }
        }
    }, [memoizedRival]);

    const handleArmorChange = useCallback(async (value: ActorArmor[]) => {
        if (memoizedRival) {
            try {
                const updatedRival = await RivalService.updateRival({ ...memoizedRival, armors: value });
                setRival(updatedRival);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update armor');
            }
        }
    }, [memoizedRival]);

    const handleWeaponChange = useCallback(async (value: ActorWeapon[]) => {
        if (memoizedRival) {
            try {
                const updatedRival = await RivalService.updateRival({ ...memoizedRival, weapons: value });
                setRival(updatedRival);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update weapon');
            }
        }
    }, [memoizedRival]);

    const handleAbilityChange = useCallback(async (values: Ability[]) => {
        if (memoizedRival) {
            try {
                const updatedRival = await RivalService.updateRival({ ...memoizedRival, abilities: values });
                setRival(updatedRival);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update abilities');
            }
        }
    }, [memoizedRival]);

    const handleTalentChange = useCallback(async (values: ActorTalent[]) => {
        if (memoizedRival) {
            try {
                const updatedRival = await RivalService.updateRival({ ...memoizedRival, talents: values });
                setRival(updatedRival);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update talents');
            }
        }
    }, [memoizedRival]);

    const handleRivalUpdate = useCallback((updatedRival: Rival) => {
        setRival(updatedRival);
    }, []);

    // Show loading state
    if (loading) {
        return <div>Loading rival...</div>;
    }

    // Show error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Show empty state
    if (!memoizedRival) {
        return <Fragment />;
    }

    return (
        <Card>
            <CenteredCardHeaderWithAction title={memoizedRival.name} path={ActorPath.Rival + memoizedRival.id}
                subheader={getRatings(memoizedRival)} />
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
                        <RivalCharacteristicTab rival={memoizedRival} updateRival={handleRivalUpdate} />
                    </TabPanel>
                    <TabPanel value="2">
                        <SingleNonPlayerCharacterSkillCard actor={memoizedRival} onSkillChange={handleSkillChange} />
                    </TabPanel>
                    <TabPanel value="3">
                        <EquipmentCard actor={memoizedRival} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange} />
                    </TabPanel>
                    <TabPanel value="4">
                        <AbilityTableCard abilities={memoizedRival.abilities} updateAbilities={handleAbilityChange} npc={memoizedRival} />
                    </TabPanel>
                    <TabPanel value="5">
                        <SingleNonPlayerCharacterTalentCard talents={memoizedRival.talents} updateTalents={handleTalentChange} />
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    )
});

export default RivalPage;
