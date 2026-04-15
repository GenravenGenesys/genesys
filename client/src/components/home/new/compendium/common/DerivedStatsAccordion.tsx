import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import {StatsType} from "../../../../../models/StatsType.ts";
import type {StatModifiers} from "../../../../../api/model";

interface Props {
    statModifiers: StatModifiers;
    updateStatModifiers: (statModifiers: StatModifiers) => void;
}

export default function DerivedStatsAccordion({statModifiers, updateStatModifiers}: Props) {
    const hasData = statModifiers.wounds > 0 ||
        statModifiers.strain > 0 ||
        statModifiers.soak > 0 ||
        statModifiers.defense > 0 ||
        statModifiers.encumbranceThreshold > 0;

    const handleStatModifier = <K extends keyof StatModifiers>(field: K, value: StatModifiers[K]) => {
        updateStatModifiers({...statModifiers, [field]: value});
    };

    return (
        <Stack spacing={2}>
            <Accordion defaultExpanded={hasData} disableGutters sx={{bgcolor: 'background.paper'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                        STAT MODIFIERS
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GridContainer spacing={2}>
                        <GenesysNumberField
                            value={statModifiers.wounds}
                            label={'Increase ' + StatsType.Wounds + ' Threshold'}
                            onChange={(value) => handleStatModifier('wounds', value)}
                            min={0} max={5} fullwidth
                        />
                        <GenesysNumberField
                            value={statModifiers.strain}
                            label={'Increase ' + StatsType.Strain + ' Threshold'}
                            onChange={(value) => handleStatModifier( 'strain', value)}
                            min={0} max={5} fullwidth
                        />
                        <GenesysNumberField
                            value={statModifiers.soak}
                            label="Increase Soak"
                            onChange={(value) => handleStatModifier( 'soak', value)}
                            min={0} max={5} fullwidth
                        />
                        <GenesysNumberField
                            value={statModifiers.defense}
                            label="Increase Defense"
                            onChange={(value) => handleStatModifier( 'defense', value)}
                            min={0} max={5} fullwidth
                        />
                        <GenesysNumberField
                            value={statModifiers.encumbranceThreshold}
                            label="Increase Encumbrance Threshold"
                            onChange={(value) => handleStatModifier( 'encumbranceThreshold', value)}
                            min={0} max={5} fullwidth
                        />
                    </GridContainer>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}