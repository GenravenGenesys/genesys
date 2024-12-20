import {Card, CardContent, Divider, Grid} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";
import {StatsType} from "../../../../models/actor/Stats";
import * as React from "react";
import {getRatings, RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import {ActorPath} from "../../../../services/RootPath";
import CharacteristicRow, {ActorCharacteristicRow} from "../../actor/common/CharacteristicRow";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import {Fragment, useEffect, useState} from "react";
import MinionService from "../../../../services/actor/MinionService";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {DefenseType} from "../../../../models/actor/Defense";
import RatingCard from "../RatingCard";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import {ActorArmor} from "../../../../models/equipment/Armor";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import Minion, {GroupSkill} from "../../../../models/actor/npc/Minion";
import MinionSkillCard from "./skill/MinionSkillCard";
import MinionTalentCard from "./talent/MinionTalentCard";
import {ActorTalent} from "../../../../models/Talent";

export default function MinionPage() {
    const {id} = useParams<{ id: string }>();
    const [minion, setMinion] = useState<Minion | null>(null);
    let pathname = useLocation().pathname;

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

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (minion) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    setMinion(await MinionService.updateMinion({...minion, brawn: {...minion.brawn, current: value}}));
                    break;
                case CharacteristicType.Agility:
                    setMinion(await MinionService.updateMinion({...minion, agility: {...minion.agility, current: value}}));
                    break;
                case CharacteristicType.Intellect:
                    setMinion(await MinionService.updateMinion({...minion, intellect: {...minion.intellect, current: value}}));
                    break;
                case CharacteristicType.Cunning:
                    setMinion(await MinionService.updateMinion({...minion, cunning: {...minion.cunning, current: value}}));
                    break;
                case CharacteristicType.Willpower:
                    setMinion(await MinionService.updateMinion({...minion, willpower: {...minion.willpower, current: value}}));
                    break;
                case CharacteristicType.Presence:
                    setMinion(await MinionService.updateMinion({...minion, presence: {...minion.presence, current: value}}));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (minion) {
            setMinion(await MinionService.updateMinion({...minion, wounds: value}));
        }
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (minion) {
            switch (type) {
                case RatingType.Combat:
                    setMinion(await MinionService.updateMinion({...minion, combat: value}));
                    break;
                case RatingType.Social:
                    setMinion(await MinionService.updateMinion({...minion, social: value}));
                    break;
                case RatingType.General:
                    setMinion(await MinionService.updateMinion({...minion, general: value}));
                    break;
            }
        }
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

    const renderRatingRow = () => {
        if (pathname.endsWith(minion.id + '/edit')) {
            return (
                <Grid container spacing={2}>
                    <RatingCard type={RatingType.Combat} value={minion.combat}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(minion.id + '/edit')}/>
                    <RatingCard type={RatingType.Social} value={minion.social}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(minion.id + '/edit')}/>
                    <RatingCard type={RatingType.General} value={minion.general}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(minion.id + '/edit')}/>
                </Grid>
            )
        }
        return <Fragment/>
    };

    const renderCharacteristicRow = () => {
        return pathname.endsWith(minion.id + '/edit') ?
            <ActorCharacteristicRow actor={minion} handleCharacteristicChange={handleCharacteristicChange}/> :
            <CharacteristicRow actor={minion}/>;
    };

    const renderWoundsCard = () => {
        return pathname.endsWith(minion.id + '/edit') ?
            <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={minion.wounds}
                                 onChange={handleWoundsChange} min={1} max={20}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(minion.wounds)}/>
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={minion.name} path={ActorPath.Minion + minion.id}
                                          subheader={getRatings(minion)}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {renderCharacteristicRow()}
                    <Divider/>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Soak'} value={String(minion.soak)}/>
                        {renderWoundsCard()}
                        <ViewFieldCard name={DefenseType.Melee} value={String(minion.melee)}/>
                        <ViewFieldCard name={DefenseType.Ranged} value={String(minion.ranged)}/>
                    </Grid>
                    {renderRatingRow()}
                    <Divider/>
                    <MinionSkillCard minion={minion} onGroupSkillChange={handleSkillChange}/>
                    <Divider/>
                    <EquipmentCard actor={minion} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange}/>
                    <Divider/>
                    <AbilityTableCard abilities={minion.abilities} updateAbilities={handleAbilityChange}/>
                    <Divider/>
                    <MinionTalentCard talents={minion.talents} updateTalents={handleTalentChange}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
