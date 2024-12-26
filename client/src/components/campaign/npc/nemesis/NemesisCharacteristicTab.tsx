import Nemesis from "../../../../models/actor/npc/Nemesis";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import NemesisService from "../../../../services/actor/NemesisService";
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
import {useLocation} from "react-router-dom";

interface Props {
    nemesis: Nemesis
    updateNemesis: (nemesis: Nemesis) => void
}

export default function NemesisCharacteristicTab(props: Props) {
    const {nemesis, updateNemesis} = props;
    let pathname = useLocation().pathname;

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (nemesis) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, brawn: {...nemesis.brawn, current: value}}));
                    break;
                case CharacteristicType.Agility:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, agility: {...nemesis.agility, current: value}}));
                    break;
                case CharacteristicType.Intellect:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, intellect: {...nemesis.intellect, current: value}}));
                    break;
                case CharacteristicType.Cunning:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, cunning: {...nemesis.cunning, current: value}}));
                    break;
                case CharacteristicType.Willpower:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, willpower: {...nemesis.willpower, current: value}}));
                    break;
                case CharacteristicType.Presence:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, presence: {...nemesis.presence, current: value}}));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (nemesis) {
            updateNemesis(await NemesisService.updateNemesis({...nemesis, wounds: value}));
        }
    };

    const handleStrainChange = async (value: number) => {
        if (nemesis) {
            updateNemesis(await NemesisService.updateNemesis({...nemesis, strain: value}));
        }
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (nemesis) {
            switch (type) {
                case RatingType.Combat:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, combat: value}));
                    break;
                case RatingType.Social:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, social: value}));
                    break;
                case RatingType.General:
                    updateNemesis(await NemesisService.updateNemesis({...nemesis, general: value}));
                    break;
            }
        }
    };

    const renderRatingRow = () => {
        if (pathname.endsWith(nemesis.id + '/edit')) {
            return (
                <Grid container spacing={2}>
                    <RatingCard type={RatingType.Combat} value={nemesis.combat}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(nemesis.id + '/edit')}/>
                    <RatingCard type={RatingType.Social} value={nemesis.social}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(nemesis.id + '/edit')}/>
                    <RatingCard type={RatingType.General} value={nemesis.general}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(nemesis.id + '/edit')}/>
                </Grid>
            )
        }
        return <Fragment/>
    };

    const renderCharacteristicRow = () => {
        return pathname.endsWith(nemesis.id + '/edit') ?
            <ActorCharacteristicRow actor={nemesis} handleCharacteristicChange={handleCharacteristicChange}/> :
            <CharacteristicRow actor={nemesis}/>;
    };

    const renderWoundsCard = () => {
        return pathname.endsWith(nemesis.id + '/edit') ?
            <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={nemesis.wounds}
                                 onChange={handleWoundsChange} min={1} max={35}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(nemesis.wounds)}/>
    };

    const renderStrainCard = () => {
        return pathname.endsWith(nemesis.id + '/edit') ?
            <NumberTextFieldCard title={StatsType.Strain + ' Threshold'} value={nemesis.strain}
                                 onChange={handleStrainChange} min={1} max={35}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(nemesis.strain)}/>
    };

    return (
        <Grid container justifyContent={'center'}>
            {renderCharacteristicRow()}
            <Grid container spacing={2}>
                <ViewFieldCard name={'Soak'} value={String(nemesis.soak)}/>
                {renderWoundsCard()}
                {renderStrainCard()}
                <ViewFieldCard name={DefenseType.Melee} value={String(nemesis.melee)}/>
                <ViewFieldCard name={DefenseType.Ranged} value={String(nemesis.ranged)}/>
            </Grid>
            {renderRatingRow()}
        </Grid>
    );
}