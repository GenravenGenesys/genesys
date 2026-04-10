import {
    type Talent,
} from "../../../../../../api/model";
import * as React from "react";
import {
    Stack,
} from "@mui/material";
import CostLimitAccordion from "../../common/CostLimitAccordion.tsx";
import DiceModifierAccordion from "../../common/DiceModifierAccordion.tsx";
import DerivedStatsAccordion from "../../common/DerivedStatsAccordion.tsx";

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
}

const TalentModifyStatsTab: React.FC<Props> = ({talent, updateTalent}) => {
    const handleChange = <K extends keyof Talent>(field: K, value: Talent[K]) => {
        updateTalent({...talent, [field]: value});
    };

    return (
        <Stack spacing={3}>
            <CostLimitAccordion
                cost={talent.cost}
                limit={talent.limit}
                onCostChange={(updated) => handleChange('cost', updated)}
                onLimitChange={(updated) => handleChange('limit', updated)}
            />

            <DerivedStatsAccordion statModifiers={talent.statModifiers}
                                   updateStatModifiers={(updated) => handleChange('statModifiers', updated)}/>

            <DiceModifierAccordion
                modifiers={talent.diceModifiers}
                onChange={(updated) => handleChange('diceModifiers', updated)}
            />
        </Stack>
    );
};

export default TalentModifyStatsTab;

