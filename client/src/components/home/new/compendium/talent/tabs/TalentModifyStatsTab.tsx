import {
    type StatModifiers,
    type Talent,
} from "../../../../../../api/model";
import * as React from "react";
import GridContainer from "../../../../../common/grid/GridContainer.tsx";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography
} from "@mui/material";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import {StatsType} from "../../../../../../models/StatsType.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CostLimitAccordion from "../../common/CostLimitAccordion.tsx";
import DiceModifierAccordion from "../../common/DiceModifierAccordion.tsx";

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
}

const TalentModifyStatsTab: React.FC<Props> = ({talent, updateTalent}) => {
    const stats = talent.statModifiers;

    const handleChange = <K extends keyof Talent>(field: K, value: Talent[K]) => {
        updateTalent({...talent, [field]: value});
    };

    const hasStatsModifier = stats.wounds > 0 || stats.strain > 0 || stats.soak > 0 || stats.defense > 0 || stats.encumbranceThreshold > 0;

    return (
        <Stack spacing={3}>
            <CostLimitAccordion
                cost={talent.cost}
                limit={talent.limit}
                onCostChange={(updated) => handleChange('cost', updated)}
                onLimitChange={(updated) => handleChange('limit', updated)}
            />

            <Accordion defaultExpanded={hasStatsModifier} disableGutters sx={{bgcolor: "background.paper"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                        STATS MODIFIER
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GridContainer spacing={2}>
                        <GenesysNumberField value={stats.wounds}
                                            label={'Increase ' + StatsType.Wounds + ' Threshold'}
                                            onChange={(v) => handleChange("statModifiers", {...stats, wounds: v} as StatModifiers)}
                                            min={0} max={5} fullwidth/>
                        <GenesysNumberField value={stats.strain}
                                            label={'Increase ' + StatsType.Strain + ' Threshold'}
                                            onChange={(v) => handleChange("statModifiers", {...stats, strain: v} as StatModifiers)}
                                            min={0} max={5} fullwidth/>
                        <GenesysNumberField value={stats.soak} label={'Increase Soak'}
                                            onChange={(v) => handleChange("statModifiers", {...stats, soak: v} as StatModifiers)}
                                            min={0} max={5} fullwidth/>
                        <GenesysNumberField value={stats.defense} label={'Increase Defense'}
                                            onChange={(v) => handleChange("statModifiers", {...stats, defense: v} as StatModifiers)}
                                            min={0} max={5} fullwidth/>
                    </GridContainer>
                </AccordionDetails>
            </Accordion>

            <DiceModifierAccordion
                modifiers={talent.diceModifiers}
                onChange={(updated) => handleChange('diceModifiers', updated)}
            />
        </Stack>
    );
};

export default TalentModifyStatsTab;

