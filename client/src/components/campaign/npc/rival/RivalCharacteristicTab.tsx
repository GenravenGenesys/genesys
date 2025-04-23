import {Divider, Grid} from "@mui/material";
import ViewFieldCard from "../../../common/ViewFieldCard";
import {DefenseType} from "../../../../models/actor/Defense";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import RatingCard from "../RatingCard";
import {RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import {Fragment} from "react";
import CharacteristicRow from "../../actor/common/CharacteristicRow";
import NumberTextFieldCard from "../../../common/card/NumberTextField";
import {StatsType} from "../../../../models/actor/Stats";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import RivalService from "../../../../services/actor/RivalService";
import {useLocation} from "react-router-dom";

interface Props {
    rival: Rival;
    updateRival: (rival: Rival) => void;
}

const RivalCharacteristicTab: React.FC<Props> = ({rival, updateRival})=> {
    let pathname = useLocation().pathname;

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (rival) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    updateRival(await RivalService.updateRival({...rival, brawn: {...rival.brawn, current: value}}));
                    break;
                case CharacteristicType.Agility:
                    updateRival(await RivalService.updateRival({
                        ...rival,
                        agility: {...rival.agility, current: value}
                    }));
                    break;
                case CharacteristicType.Intellect:
                    updateRival(await RivalService.updateRival({
                        ...rival,
                        intellect: {...rival.intellect, current: value}
                    }));
                    break;
                case CharacteristicType.Cunning:
                    updateRival(await RivalService.updateRival({
                        ...rival,
                        cunning: {...rival.cunning, current: value}
                    }));
                    break;
                case CharacteristicType.Willpower:
                    updateRival(await RivalService.updateRival({
                        ...rival,
                        willpower: {...rival.willpower, current: value}
                    }));
                    break;
                case CharacteristicType.Presence:
                    updateRival(await RivalService.updateRival({
                        ...rival,
                        presence: {...rival.presence, current: value}
                    }));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (rival) {
            updateRival(await RivalService.updateRival({
                ...rival,
                wounds: {current: rival.wounds.current, threshold: value, type: rival.wounds.type}
            }));
        }
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (rival) {
            switch (type) {
                case RatingType.Combat:
                    updateRival(await RivalService.updateRival({...rival, combat: value}));
                    break;
                case RatingType.Social:
                    updateRival(await RivalService.updateRival({...rival, social: value}));
                    break;
                case RatingType.General:
                    updateRival(await RivalService.updateRival({...rival, general: value}));
                    break;
            }
        }
    };

    const renderRatingRow = () => {
        if (pathname.endsWith(rival.id + '/edit')) {
            return (
                <Grid container spacing={2}>
                    <RatingCard type={RatingType.Combat} value={rival.combat}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(rival.id + '/edit')}/>
                    <RatingCard type={RatingType.Social} value={rival.social}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(rival.id + '/edit')}/>
                    <RatingCard type={RatingType.General} value={rival.general}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(rival.id + '/edit')}/>
                </Grid>
            )
        }
        return <Fragment/>
    };

    return (
        <Grid container sx={{
            justifyContent: 'center'
        }}>
            <CharacteristicRow actor={rival} handleCharacteristicChange={handleCharacteristicChange}/>
            <Divider/>
            <Grid container spacing={2}>
                <ViewFieldCard name={'Soak'} value={String(rival.soak)}/>
                <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={rival.wounds.threshold}
                                     onChange={handleWoundsChange} min={1} max={20}
                                     disabled={pathname.endsWith(rival.id + '/edit')}/>
                <ViewFieldCard name={DefenseType.Melee} value={String(rival.melee)}/>
                <ViewFieldCard name={DefenseType.Ranged} value={String(rival.ranged)}/>
            </Grid>
            {renderRatingRow()}
        </Grid>
    );
};

export default RivalCharacteristicTab;