import Minion from "../../../../models/actor/npc/Minion";
import {useLocation} from "react-router-dom";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import MinionService from "../../../../services/actor/MinionService";
import {RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import {Grid} from "@mui/material";
import RatingCard from "../RatingCard";
import {Fragment} from "react";
import CharacteristicRow, {ActorCharacteristicRow} from "../../actor/common/CharacteristicRow";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {StatsType} from "../../../../models/actor/Stats";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import * as React from "react";
import {DefenseType} from "../../../../models/actor/Defense";

interface Props {
    minion: Minion
    updateMinion: (minion: Minion) => void
}

export default function MinionCharacteristicTab(props: Props) {
    const {minion, updateMinion} = props;
    let pathname = useLocation().pathname;

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (minion) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    updateMinion(await MinionService.updateMinion({
                        ...minion,
                        brawn: {...minion.brawn, current: value}
                    }));
                    break;
                case CharacteristicType.Agility:
                    updateMinion(await MinionService.updateMinion({
                        ...minion,
                        agility: {...minion.agility, current: value}
                    }));
                    break;
                case CharacteristicType.Intellect:
                    updateMinion(await MinionService.updateMinion({
                        ...minion,
                        intellect: {...minion.intellect, current: value}
                    }));
                    break;
                case CharacteristicType.Cunning:
                    updateMinion(await MinionService.updateMinion({
                        ...minion,
                        cunning: {...minion.cunning, current: value}
                    }));
                    break;
                case CharacteristicType.Willpower:
                    updateMinion(await MinionService.updateMinion({
                        ...minion,
                        willpower: {...minion.willpower, current: value}
                    }));
                    break;
                case CharacteristicType.Presence:
                    updateMinion(await MinionService.updateMinion({
                        ...minion,
                        presence: {...minion.presence, current: value}
                    }));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (minion) {
            updateMinion(await MinionService.updateMinion({
                ...minion,
                wounds: {current: minion.wounds.current, threshold: value, type: minion.wounds.type}
            }));
        }
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (minion) {
            switch (type) {
                case RatingType.Combat:
                    updateMinion(await MinionService.updateMinion({...minion, combat: value}));
                    break;
                case RatingType.Social:
                    updateMinion(await MinionService.updateMinion({...minion, social: value}));
                    break;
                case RatingType.General:
                    updateMinion(await MinionService.updateMinion({...minion, general: value}));
                    break;
            }
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
            <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={minion.wounds.threshold}
                                 onChange={handleWoundsChange} min={1} max={20}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(minion.wounds.threshold)}/>
    };

    return (
        <Grid container justifyContent={'center'}>
            {renderCharacteristicRow()}
            <Grid container spacing={2}>
                <ViewFieldCard name={'Soak'} value={String(minion.soak)}/>
                {renderWoundsCard()}
                <ViewFieldCard name={DefenseType.Melee} value={String(minion.melee)}/>
                <ViewFieldCard name={DefenseType.Ranged} value={String(minion.ranged)}/>
            </Grid>
            {renderRatingRow()}
        </Grid>
    )
}