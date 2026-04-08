import {
    CheckContext,
    type DiceModifier, DiceType, type QualityStats, type Skill, SkillType,
    type StatModifiers,
    type Talent, Target,
} from "../../../../../../api/model";
import * as React from "react";
import GridContainer from "../../../../../common/grid/GridContainer.tsx";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Grid,
    Stack,
    Typography
} from "@mui/material";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import {StatsType} from "../../../../../../models/StatsType.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GenesysSelectField from "../../../../common/field/GenesysSelectField.tsx";
import SelectSkillAutocomplete from "../../../../common/SelectSkillAutocomplete.tsx";

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
}

const TalentModifyStatsTab: React.FC<Props> = ({talent, updateTalent}) => {
    const stats = talent.statModifiers;
    const ability = talent.abilityModifiers;

    const handleChange = <K extends keyof Talent>(field: K, value: Talent[K]) => {
        updateTalent({
            ...talent,
            [field]: value,
        });
    };

    const handleWoundsChange = async (value: number) => {
        handleChange("statModifiers", {...stats, wounds: value} as StatModifiers);
    };

    const handleStrainChange = async (value: number) => {
        handleChange("statModifiers", {...stats, strain: value} as StatModifiers);
    };

    const handleSoakChange = async (value: number) => {
        handleChange("statModifiers", {...stats, soak: value} as StatModifiers);
    };

    const handleDefenseChange = async (value: number) => {
        handleChange("statModifiers", {...stats, defense: value} as StatModifiers);
    };

    const hasStatsModifier = stats.wounds > 0 || stats.strain > 0 || stats.soak > 0 || stats.defense > 0 || stats.encumbranceThreshold > 0;
    const hasDiceModifier = ability.diceModifiers.length > 0;
    const hadAbilityModifier = ability.resultsModifiers.length > 0 || ability.environmentModifiers.length > 0 || ability.healEffects.length > 0;

    return (
        <Stack spacing={3}>
            <Accordion defaultExpanded={hasStatsModifier} disableGutters sx={{bgcolor: "background.paper"}}>
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

            <Accordion defaultExpanded={hasStatsModifier} disableGutters sx={{bgcolor: "background.paper"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                        DICE MODIFIER
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <GridContainer spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={dm.diceType}
                                    label="Dice Type"
                                    onChange={(v) => updateDiceModifier({diceType: v as DiceModifier["diceType"]})}
                                    options={DiceType}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysNumberField
                                    value={dm.amount}
                                    fullwidth
                                    label="Amount"
                                    min={0}
                                    onChange={(v) => updateDiceModifier({amount: v})}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={dm.checkContext}
                                    label="Check Context"
                                    onChange={(v) => updateDiceModifier({checkContext: v as DiceModifier["checkContext"]})}
                                    options={CheckContext}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={dm.checkTarget}
                                    label="Check Target"
                                    onChange={(v) => updateDiceModifier({checkTarget: v as DiceModifier["checkTarget"]})}
                                    options={Target}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={dm.skillType ?? ""}
                                    label="Skill Type Filter (optional)"
                                    onChange={(v) => updateDiceModifier({skillType: v ? v as DiceModifier["skillType"] : undefined})}
                                    options={{Any: "", ...SkillType}}
                                />
                            </Grid>
                        </GridContainer>
                        {dm.skillType && (
                            <SelectSkillAutocomplete
                                currentSkill={dm.skill as Skill}
                                handleSkillSelect={(skill: Skill) => updateDiceModifier({skill})}
                                filterByType={dm.skillType}
                            />
                        )}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
};

export default TalentModifyStatsTab;

