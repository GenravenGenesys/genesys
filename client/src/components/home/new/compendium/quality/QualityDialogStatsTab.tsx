import {
    type DiceModifier,
    type QualityStats,
    type ResultsModifier,
    type Skill,
    CheckContext,
    CheckTarget,
    DiceType,
    SkillType,
} from "../../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import SelectSkillAutocomplete from "../../../common/SelectSkillAutocomplete.tsx";

interface Props {
    stats: QualityStats;
    updateStats: (updatedStats: QualityStats) => void;
}

export default function QualityDialogStatsTab(props: Props) {
    const {stats, updateStats} = props;

    const handleChange = <K extends keyof QualityStats>(field: K, value: QualityStats[K]) => {
        updateStats({...stats, [field]: value});
    };

    const defaultDiceModifier: DiceModifier = {
        diceType: DiceType.Boost,
        amount: 0,
        checkContext: CheckContext.All,
        checkTarget: CheckTarget.Self,
    };

    const defaultResultsModifier: ResultsModifier = {
        results: {success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0},
        checkContext: CheckContext.All,
        checkTarget: CheckTarget.Self,
    };

    const dm: DiceModifier = stats.diceModifier ?? defaultDiceModifier;
    const rm: ResultsModifier = stats.resultsModifier ?? defaultResultsModifier;

    const hadDefenseModifier = stats.rangedDefense > 0 || stats.meleeDefense > 0;
    const hasCriticalInjuryData = stats.criticalInjury > 0;
    const hasDiceData = dm.amount > 0;
    const hasResultsData = Object.values(rm.results ?? {}).some((v) => v !== 0);

    const updateDiceModifier = (updated: Partial<DiceModifier>) => {
        updateStats({...stats, diceModifier: {...dm, ...updated}});
    };

    const updateResultsModifier = (updated: Partial<ResultsModifier>) => {
        updateStats({...stats, resultsModifier: {...rm, ...updated}});
    };

    return (
        <Stack spacing={3}>
            <Accordion defaultExpanded={hadDefenseModifier} disableGutters sx={{bgcolor: "background.paper"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                        DEFENSE MODIFIER
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GridContainer spacing={2}>
                        <Grid size={6}>
                            <GenesysNumberField value={stats.meleeDefense} fullwidth
                                                label="Increase Melee Defense by amount"
                                                onChange={(e) => handleChange('meleeDefense', e)}
                            />
                        </Grid>
                        <Grid size={6}>
                            <GenesysNumberField value={stats.rangedDefense} fullwidth
                                                label="Increase Ranged Defense by amount"
                                                onChange={(e) => handleChange('rangedDefense', e)}
                            />
                        </Grid>
                    </GridContainer>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded={hasCriticalInjuryData} disableGutters sx={{bgcolor: "background.paper"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                        CRITICAL INJURY MODIFIER
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GridContainer spacing={2}>
                        <GenesysNumberField value={stats.criticalInjury} fullwidth
                                            label="Increase Critical Injury roll by amount"
                                            onChange={(e) => handleChange('criticalInjury', e)}
                        />
                    </GridContainer>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded={hasDiceData} disableGutters sx={{bgcolor: "background.paper"}}>
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
                                    options={CheckTarget}
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

            <Accordion defaultExpanded={hasResultsData} disableGutters sx={{bgcolor: "background.paper"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                        RESULTS MODIFIER
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <GridContainer spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={rm.checkContext}
                                    label="Check Context"
                                    onChange={(v) => updateResultsModifier({checkContext: v as ResultsModifier["checkContext"]})}
                                    options={CheckContext}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={rm.checkTarget}
                                    label="Check Target"
                                    onChange={(v) => updateResultsModifier({checkTarget: v as ResultsModifier["checkTarget"]})}
                                    options={CheckTarget}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={rm.skillType ?? ""}
                                    label="Skill Type Filter (optional)"
                                    onChange={(v) => updateResultsModifier({skillType: v ? v as ResultsModifier["skillType"] : undefined})}
                                    options={{Any: "", ...SkillType}}
                                />
                            </Grid>
                        </GridContainer>

                        <Divider>
                            <Typography variant="caption" color="text.secondary">
                                SYMBOL RESULTS
                            </Typography>
                        </Divider>

                        <GridContainer spacing={2}>
                            {(["success", "advantage", "triumph", "failure", "threat", "despair"] as const).map((symbol) => (
                                <Grid size={4} key={symbol}>
                                    <GenesysNumberField
                                        value={rm.results[symbol]}
                                        fullwidth
                                        label={symbol.charAt(0).toUpperCase() + symbol.slice(1)}
                                        onChange={(v) =>
                                            updateResultsModifier({results: {...rm.results, [symbol]: v}})
                                        }
                                    />
                                </Grid>
                            ))}
                        </GridContainer>

                        {rm.skillType && (
                            <SelectSkillAutocomplete
                                currentSkill={rm.skill as Skill}
                                handleSkillSelect={(skill: Skill) => updateResultsModifier({skill})}
                                filterByType={rm.skillType}
                            />
                        )}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}