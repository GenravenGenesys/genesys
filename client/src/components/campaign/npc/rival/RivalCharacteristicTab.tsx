import { Divider } from "@mui/material";
import ViewFieldCard from "../../../common/ViewFieldCard";
import { DefenseType } from "../../../../models/actor/Defense";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import RatingCard from "../RatingCard";
import { RatingType } from "../../../../models/actor/npc/NonPlayerActor";
import { Fragment, useEffect } from "react";
import CharacteristicRow from "../../actor/common/CharacteristicRow";
import NumberTextFieldCard from "../../../common/card/NumberTextFieldCard";
import { StatsType } from "../../../../models/actor/Stats";
import { CharacteristicType } from "../../../../models/actor/Characteristic";
import RivalService from "../../../../services/actor/RivalService";
import { useLocation } from "react-router";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    rival: Rival;
    refetch: () => void;
}

const RivalCharacteristicTab: React.FC<Props> = ({ rival, refetch }) => {
    let pathname = useLocation().pathname;
    const isEdit = pathname.endsWith(`${rival.id}/edit`);

    useEffect(() => {
        console.log("RivalCharacteristicTab mounted with rival:", rival);
    }, [rival]);

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (!rival) return;

        const updated = { ...rival };

        switch (characteristic) {
            case CharacteristicType.Brawn:
                updated.brawn.current = value;
                break;
            case CharacteristicType.Agility:
                updated.agility.current = value;
                break;
            case CharacteristicType.Intellect:
                updated.intellect.current = value;
                break;
            case CharacteristicType.Cunning:
                updated.cunning.current = value;
                break;
            case CharacteristicType.Willpower:
                updated.willpower.current = value;
                break;
            case CharacteristicType.Presence:
                updated.presence.current = value;
                break;
        }

        await RivalService.updateRival(updated);
        refetch();
    };

    const handleWoundsChange = async (value: number) => {
        if (!rival) return;

        const updated = {
            ...rival,
            wounds: { ...rival.wounds, threshold: value }
        };

        await RivalService.updateRival(updated);
        refetch();
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (!rival) return;

        const updated = { ...rival };

        switch (type) {
            case RatingType.Combat:
                updated.combat = value;
                break;
            case RatingType.Social:
                updated.social = value;
                break;
            case RatingType.General:
                updated.general = value;
                break;
        }

        await RivalService.updateRival(updated);
        refetch();
    };

    return (
        <GridContainer centered>
            <CharacteristicRow actor={rival} handleCharacteristicChange={handleCharacteristicChange} />
            <Divider />
            <GridContainer spacing={2}>
                <ViewFieldCard name={'Soak'} value={String(rival.soak)} />
                <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={rival.wounds.threshold}
                    onChange={handleWoundsChange} min={1} max={20}
                    disabled={!isEdit} />
                <ViewFieldCard name={DefenseType.Melee} value={String(rival.melee)} />
                <ViewFieldCard name={DefenseType.Ranged} value={String(rival.ranged)} />
            </GridContainer>
            {isEdit && <GridContainer spacing={2}>
                <RatingCard type={RatingType.Combat} value={rival.combat}
                    onChange={handleRatingsChange}
                    disabled={!isEdit} />
                <RatingCard type={RatingType.Social} value={rival.social}
                    onChange={handleRatingsChange}
                    disabled={!isEdit} />
                <RatingCard type={RatingType.General} value={rival.general}
                    onChange={handleRatingsChange}
                    disabled={!isEdit} />
            </GridContainer>}
        </GridContainer>
    );
};

export default RivalCharacteristicTab;