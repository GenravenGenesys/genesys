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

interface Props {
    talent: Talent;
    updateTalentStats: (stats: StatModifiers) => void;
}

const TalentModifyStatsTab: React.FC<Props> = ({talent, updateTalentStats}) => {
    const stats = talent.statModifiers;

    const handleWoundsChange = async (value: number) => {
        if (talent) {
            updateTalentStats({
                ...talent.statModifiers,
                wounds: value,
            });
        }
    };

    const handleStrainChange = async (value: number) => {
        if (talent) {
            updateTalentStats({
                ...talent.statModifiers,
                strain: value,
            });
        }
    };

    const handleSoakChange = async (value: number) => {
        if (talent) {
            updateTalentStats({
                ...talent.statModifiers,
                soak: value,
            });
        }
    };

    const handleDefenseChange = async (value: number) => {
        if (talent) {
            updateTalentStats({
                ...talent.statModifiers,
                defense: value,
            });
        }
    };

    const hadStatsModifier = stats.wounds > 0 || stats.strain > 0 || stats.soak > 0 || stats.defense > 0 || stats.encumbranceThreshold > 0;

    return (
        <Stack spacing={3}>
            <Accordion defaultExpanded={hadStatsModifier} disableGutters sx={{bgcolor: "background.paper"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                        STATS MODIFIER
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GridContainer spacing={2}>
                        <GenesysNumberField value={talent.statModifiers.wounds}
                                            label={'Increase ' + StatsType.Wounds + ' Threshold'}
                                            onChange={handleWoundsChange} min={0} max={5} fullwidth/>
                        <GenesysNumberField value={talent.statModifiers.strain}
                                            label={'Increase ' + StatsType.Strain + ' Threshold'}
                                            onChange={handleStrainChange} min={0} max={5} fullwidth/>
                        <GenesysNumberField value={talent.statModifiers.soak} label={'Increase Soak'}
                                            onChange={handleSoakChange} min={0} max={5} fullwidth/>
                        <GenesysNumberField value={talent.statModifiers.defense} label={'Increase Defense'}
                                            onChange={handleDefenseChange} min={0} max={5} fullwidth/>
                    </GridContainer>
                </AccordionDetails>
            </Accordion>


        </Stack>
    );
};

export default TalentModifyStatsTab;

