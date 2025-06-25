import {Divider} from "@mui/material";
import ViewFieldCard from "../../../common/ViewFieldCard";
import {DefenseType} from "../../../../models/actor/Defense";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import RatingCard from "../RatingCard";
import {RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import {Fragment, useCallback, useMemo} from "react";
import CharacteristicRow from "../../actor/common/CharacteristicRow";
import NumberTextFieldCard from "../../../common/card/NumberTextFieldCard";
import {StatsType} from "../../../../models/actor/Stats";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import RivalService from "../../../../services/actor/RivalService";
import {useLocation} from "react-router";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    rival: Rival;
    updateRival: (rival: Rival) => void;
}

const RivalCharacteristicTab: React.FC<Props> = React.memo(({rival, updateRival})=> {
    const location = useLocation();
    const pathname = location.pathname;

    console.log(rival)

    // Memoize the pathname check to prevent unnecessary re-renders
    const isEditMode = useMemo(() => pathname.endsWith(rival.id + '/edit'), [pathname, rival.id]);

    const handleCharacteristicChange = useCallback(async (characteristic: CharacteristicType, value: number) => {
        if (rival) {
            try {
                let updatedRival: Rival;
                
                switch (characteristic) {
                    case CharacteristicType.Brawn:
                        updatedRival = await RivalService.updateRival({...rival, brawn: {...rival.brawn, current: value}});
                        break;
                    case CharacteristicType.Agility:
                        updatedRival = await RivalService.updateRival({
                            ...rival,
                            agility: {...rival.agility, current: value}
                        });
                        break;
                    case CharacteristicType.Intellect:
                        updatedRival = await RivalService.updateRival({
                            ...rival,
                            intellect: {...rival.intellect, current: value}
                        });
                        break;
                    case CharacteristicType.Cunning:
                        updatedRival = await RivalService.updateRival({
                            ...rival,
                            cunning: {...rival.cunning, current: value}
                        });
                        break;
                    case CharacteristicType.Willpower:
                        updatedRival = await RivalService.updateRival({
                            ...rival,
                            willpower: {...rival.willpower, current: value}
                        });
                        break;
                    case CharacteristicType.Presence:
                        updatedRival = await RivalService.updateRival({
                            ...rival,
                            presence: {...rival.presence, current: value}
                        });
                        break;
                    default:
                        return;
                }
                
                updateRival(updatedRival);
            } catch (error) {
                console.error('Failed to update characteristic:', error);
                // You might want to show a toast notification here
            }
        }
    }, [rival, updateRival]);

    const handleWoundsChange = useCallback(async (value: number) => {
        if (rival) {
            try {
                const updatedRival = await RivalService.updateRival({
                    ...rival,
                    wounds: {current: rival.wounds.current, threshold: value, type: rival.wounds.type}
                });
                updateRival(updatedRival);
            } catch (error) {
                console.error('Failed to update wounds:', error);
                // You might want to show a toast notification here
            }
        }
    }, [rival, updateRival]);

    const handleRatingsChange = useCallback(async (value: number, type: RatingType) => {
        if (rival) {
            try {
                let updatedRival: Rival;
                
                switch (type) {
                    case RatingType.Combat:
                        updatedRival = await RivalService.updateRival({...rival, combat: value});
                        break;
                    case RatingType.Social:
                        updatedRival = await RivalService.updateRival({...rival, social: value});
                        break;
                    case RatingType.General:
                        updatedRival = await RivalService.updateRival({...rival, general: value});
                        break;
                    default:
                        return;
                }
                
                updateRival(updatedRival);
            } catch (error) {
                console.error('Failed to update rating:', error);
                // You might want to show a toast notification here
            }
        }
    }, [rival, updateRival]);

    // Memoize the rating row to prevent unnecessary re-renders
    const ratingRow = useMemo(() => {
        if (isEditMode) {
            return (
                <GridContainer spacing={2}>
                    <RatingCard type={RatingType.Combat} value={rival.combat}
                                onChange={handleRatingsChange}
                                disabled={!isEditMode}/>
                    <RatingCard type={RatingType.Social} value={rival.social}
                                onChange={handleRatingsChange}
                                disabled={!isEditMode}/>
                    <RatingCard type={RatingType.General} value={rival.general}
                                onChange={handleRatingsChange}
                                disabled={!isEditMode}/>
                </GridContainer>
            )
        }
        return <Fragment/>
    }, [isEditMode, rival.combat, rival.social, rival.general, handleRatingsChange]);

    return (
        <GridContainer centered>
            <CharacteristicRow actor={rival} handleCharacteristicChange={handleCharacteristicChange}/>
            {/* <GridContainer spacing={2}>
                <ViewFieldCard name={'Soak'} value={String(rival.soak)}/>
                <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={rival.wounds.threshold}
                                     onChange={handleWoundsChange} min={1} max={20}
                                     disabled={!isEditMode}/>
                <ViewFieldCard name={DefenseType.Melee} value={String(rival.melee)}/>
                <ViewFieldCard name={DefenseType.Ranged} value={String(rival.ranged)}/>
            </GridContainer> */}
            {ratingRow}
        </GridContainer>
    );
});

export default RivalCharacteristicTab;