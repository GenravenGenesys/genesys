import {
    type DiceModifier,
    type GearModifiers,
    type ResultsModifier,
    type Skill,
    type UpgradeModifier,
    CheckContext,
    CheckTarget,
    DiceType,
    Duration,
    SkillType,
    UpgradeType,
} from "../../../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridContainer from "../../../../../common/grid/GridContainer.tsx";
import GenesysNumberField from "../../../../common/field/GenesysNumberField.tsx";
import GenesysSelectField from "../../../../common/field/GenesysSelectField.tsx";
import SelectSkillField from "../../SelectSkillField.tsx";

interface Props {
    gearModifiers: GearModifiers;
    updateGearModifiers: (gearModifiers: GearModifiers) => void;
}

const defaultDiceModifier = (): DiceModifier => ({
    diceType: DiceType.Boost,
    amount: 1,
    checkContext: CheckContext.All,
    checkTarget: CheckTarget.Self,
});

const defaultResultsModifier = (): ResultsModifier => ({
    results: {success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0},
    checkContext: CheckContext.All,
    checkTarget: CheckTarget.Self,
});

const defaultUpgradeModifier = (): UpgradeModifier => ({
    upgradeType: UpgradeType.Ability_to_Proficiency,
    amount: 1,
    checkContext: CheckContext.All,
    checkTarget: CheckTarget.Self,
    duration: Duration.Permanent,
});

export default function GearModifiersTab(props: Props) {
    const {gearModifiers, updateGearModifiers} = props;

    // ── Stat Modifiers ────────────────────────────────────────────────────────
    const handleStatModifier = <K extends keyof GearModifiers["statModifiers"]>(
        field: K,
        value: GearModifiers["statModifiers"][K]
    ) => {
        updateGearModifiers({
            ...gearModifiers,
            statModifiers: {...gearModifiers.statModifiers, [field]: value},
        });
    };

    const handleEncumbranceOverride = (value: number) => {
        updateGearModifiers({
            ...gearModifiers,
            equippedEncumbranceOverride: value >= 0 ? value : undefined,
        });
    };

    // ── Dice Modifiers ────────────────────────────────────────────────────────
    const updateDiceModifier = (index: number, updated: DiceModifier) => {
        const updated_list = gearModifiers.diceModifiers.map((m, i) => (i === index ? updated : m));
        updateGearModifiers({...gearModifiers, diceModifiers: updated_list});
    };

    const addDiceModifier = () => {
        updateGearModifiers({
            ...gearModifiers,
            diceModifiers: [...gearModifiers.diceModifiers, defaultDiceModifier()],
        });
    };

    const removeDiceModifier = (index: number) => {
        updateGearModifiers({
            ...gearModifiers,
            diceModifiers: gearModifiers.diceModifiers.filter((_, i) => i !== index),
        });
    };

    // ── Results Modifiers ─────────────────────────────────────────────────────
    const updateResultsModifier = (index: number, updated: ResultsModifier) => {
        const updated_list = gearModifiers.resultsModifiers.map((m, i) => (i === index ? updated : m));
        updateGearModifiers({...gearModifiers, resultsModifiers: updated_list});
    };

    const addResultsModifier = () => {
        updateGearModifiers({
            ...gearModifiers,
            resultsModifiers: [...gearModifiers.resultsModifiers, defaultResultsModifier()],
        });
    };

    const removeResultsModifier = (index: number) => {
        updateGearModifiers({
            ...gearModifiers,
            resultsModifiers: gearModifiers.resultsModifiers.filter((_, i) => i !== index),
        });
    };

    // ── Upgrade Modifiers ─────────────────────────────────────────────────────
    const updateUpgradeModifier = (index: number, updated: UpgradeModifier) => {
        const updated_list = gearModifiers.upgradeModifiers.map((m, i) => (i === index ? updated : m));
        updateGearModifiers({...gearModifiers, upgradeModifiers: updated_list});
    };

    const addUpgradeModifier = () => {
        updateGearModifiers({
            ...gearModifiers,
            upgradeModifiers: [...gearModifiers.upgradeModifiers, defaultUpgradeModifier()],
        });
    };

    const removeUpgradeModifier = (index: number) => {
        updateGearModifiers({
            ...gearModifiers,
            upgradeModifiers: gearModifiers.upgradeModifiers.filter((_, i) => i !== index),
        });
    };

    return (
        <Stack spacing={2}>
            {/* ── Stat Modifiers ─────────────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    STAT MODIFIERS
                </Typography>
            </Divider>

            <GridContainer spacing={2}>
                <Grid size={6}>
                    <GenesysNumberField
                        value={gearModifiers.statModifiers.wounds}
                        fullwidth
                        label="Wounds Threshold"
                        onChange={(v) => handleStatModifier("wounds", v)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={gearModifiers.statModifiers.strain}
                        fullwidth
                        label="Strain Threshold"
                        onChange={(v) => handleStatModifier("strain", v)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={gearModifiers.statModifiers.soak}
                        fullwidth
                        label="Soak"
                        onChange={(v) => handleStatModifier("soak", v)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={gearModifiers.statModifiers.defense}
                        fullwidth
                        label="Defense"
                        onChange={(v) => handleStatModifier("defense", v)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={gearModifiers.statModifiers.encumbranceThreshold}
                        fullwidth
                        label="Encumbrance Threshold"
                        onChange={(v) => handleStatModifier("encumbranceThreshold", v)}
                    />
                </Grid>
                <Grid size={6}>
                    <GenesysNumberField
                        value={gearModifiers.equippedEncumbranceOverride ?? -1}
                        fullwidth
                        label="Equipped Encumbrance Override (−1 = none)"
                        onChange={handleEncumbranceOverride}
                        min={-1}
                    />
                </Grid>
            </GridContainer>

            {/* ── Dice Modifiers ────────────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    DICE MODIFIERS
                </Typography>
            </Divider>

            {gearModifiers.diceModifiers.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                {mod.amount}× {mod.diceType} — {mod.checkContext} / {mod.checkTarget}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeDiceModifier(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2}>
                            <GridContainer spacing={2}>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.diceType}
                                        label="Dice Type"
                                        onChange={(v) => updateDiceModifier(index, {...mod, diceType: v as DiceModifier["diceType"]})}
                                        options={DiceType}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={mod.amount}
                                        fullwidth
                                        label="Amount"
                                        min={1}
                                        onChange={(v) => updateDiceModifier(index, {...mod, amount: v})}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkContext}
                                        label="Check Context"
                                        onChange={(v) => updateDiceModifier(index, {...mod, checkContext: v as DiceModifier["checkContext"]})}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => updateDiceModifier(index, {...mod, checkTarget: v as DiceModifier["checkTarget"]})}
                                        options={CheckTarget}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => updateDiceModifier(index, {...mod, skillType: v ? v as DiceModifier["skillType"] : undefined})}
                                        options={{Any: "", ...SkillType}}
                                    />
                                </Grid>
                            </GridContainer>
                            {mod.skillType && (
                                <SelectSkillField
                                    currentSkill={mod.skill as Skill}
                                    handleSkillSelect={(skill: Skill) => updateDiceModifier(index, {...mod, skill})}
                                    filterByType={mod.skillType}
                                />
                            )}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box>
                <IconButton color="primary" onClick={addDiceModifier} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Dice Modifier
                </Typography>
            </Box>

            {/* ── Results Modifiers ─────────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    RESULTS MODIFIERS
                </Typography>
            </Divider>

            {gearModifiers.resultsModifiers.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                Results Modifier #{index + 1} — {mod.checkContext} / {mod.checkTarget}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeResultsModifier(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2}>
                            <GridContainer spacing={2}>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkContext}
                                        label="Check Context"
                                        onChange={(v) => updateResultsModifier(index, {...mod, checkContext: v as ResultsModifier["checkContext"]})}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => updateResultsModifier(index, {...mod, checkTarget: v as ResultsModifier["checkTarget"]})}
                                        options={CheckTarget}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => updateResultsModifier(index, {...mod, skillType: v ? v as ResultsModifier["skillType"] : undefined})}
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
                                            value={mod.results[symbol]}
                                            fullwidth
                                            label={symbol.charAt(0).toUpperCase() + symbol.slice(1)}
                                            onChange={(v) =>
                                                updateResultsModifier(index, {
                                                    ...mod,
                                                    results: {...mod.results, [symbol]: v},
                                                })
                                            }
                                        />
                                    </Grid>
                                ))}
                            </GridContainer>

                            {mod.skillType && (
                                <SelectSkillField
                                    currentSkill={mod.skill as Skill}
                                    handleSkillSelect={(skill: Skill) => updateResultsModifier(index, {...mod, skill})}
                                    filterByType={mod.skillType}
                                />
                            )}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box>
                <IconButton color="primary" onClick={addResultsModifier} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Results Modifier
                </Typography>
            </Box>

            {/* ── Upgrade Modifiers ─────────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    UPGRADE MODIFIERS
                </Typography>
            </Divider>

            {gearModifiers.upgradeModifiers.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                {mod.amount}× {mod.upgradeType} — {mod.duration} / {mod.checkTarget}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeUpgradeModifier(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2}>
                            <GridContainer spacing={2}>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.upgradeType}
                                        label="Upgrade Type"
                                        onChange={(v) => updateUpgradeModifier(index, {...mod, upgradeType: v as UpgradeModifier["upgradeType"]})}
                                        options={UpgradeType}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={mod.amount}
                                        fullwidth
                                        label="Amount"
                                        min={1}
                                        onChange={(v) => updateUpgradeModifier(index, {...mod, amount: v})}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkContext}
                                        label="Check Context"
                                        onChange={(v) => updateUpgradeModifier(index, {...mod, checkContext: v as UpgradeModifier["checkContext"]})}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => updateUpgradeModifier(index, {...mod, checkTarget: v as UpgradeModifier["checkTarget"]})}
                                        options={CheckTarget}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.duration}
                                        label="Duration"
                                        onChange={(v) => updateUpgradeModifier(index, {...mod, duration: v as UpgradeModifier["duration"]})}
                                        options={Duration}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => updateUpgradeModifier(index, {...mod, skillType: v ? v as UpgradeModifier["skillType"] : undefined})}
                                        options={{Any: "", ...SkillType}}
                                    />
                                </Grid>
                            </GridContainer>
                            {mod.skillType && (
                                <SelectSkillField
                                    currentSkill={mod.skill as Skill}
                                    handleSkillSelect={(skill: Skill) => updateUpgradeModifier(index, {...mod, skill})}
                                    filterByType={mod.skillType}
                                />
                            )}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box>
                <IconButton color="primary" onClick={addUpgradeModifier} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Upgrade Modifier
                </Typography>
            </Box>
        </Stack>
    );
}

