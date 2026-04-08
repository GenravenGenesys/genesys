import {
    type AfterEncounterEffect,
    type CharacteristicModifier,
    type DiceModifier,
    type GearModifiers,
    type HealEffect,
    type ResultsModifier,
    type Skill,
    type SkillRankModifier,
    type UpgradeModifier,
    CharacteristicType,
    CheckContext,
    Target,
    DiceType,
    Duration,
    HealSource,
    HealTarget,
    RangeBand,
    SkillType,
    StatusEffectType,
    UpgradeType,
} from "../../../../../../api/model";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
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
import SelectSkillAutocomplete from "../../../../common/SelectSkillAutocomplete.tsx";
import SelectSkillField from "../../../../common/SelectSkillField.tsx";

interface Props {
    gearModifiers: GearModifiers;
    updateGearModifiers: (gearModifiers: GearModifiers) => void;
}

const defaultDiceModifier = (): DiceModifier => ({
    diceType: DiceType.Boost,
    amount: 1,
    checkContext: CheckContext.All,
    checkTarget: Target.Self,
});

const defaultResultsModifier = (): ResultsModifier => ({
    results: {success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0},
    checkContext: CheckContext.All,
    checkTarget: Target.Self,
});

const defaultUpgradeModifier = (): UpgradeModifier => ({
    upgradeType: UpgradeType.Ability_to_Proficiency,
    amount: 1,
    checkContext: CheckContext.All,
    checkTarget: Target.Self,
    duration: Duration.Permanent,
});

const defaultCharacteristicModifier = (): CharacteristicModifier => ({
    characteristic: CharacteristicType.Brawn,
    amount: 1,
});

const defaultSkillRankModifier = (): SkillRankModifier => ({
    skill: {id: '', name: '', characteristic: CharacteristicType.Brawn, type: SkillType.General, initiative: false},
    ranks: 1,
});

const defaultHealEffect = (): HealEffect => ({
    target: HealTarget.Strain,
    source: HealSource.Fixed,
    amount: 0,
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

    const handleRange = (value: string) => {
        updateGearModifiers({
            ...gearModifiers,
            range: value ? value as GearModifiers["range"] : undefined,
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

    // ── Characteristic Modifiers ──────────────────────────────────────────────
    const updateCharacteristicModifier = (index: number, updated: CharacteristicModifier) => {
        const updated_list = gearModifiers.characteristicModifiers.map((m, i) => (i === index ? updated : m));
        updateGearModifiers({...gearModifiers, characteristicModifiers: updated_list});
    };

    const addCharacteristicModifier = () => {
        updateGearModifiers({
            ...gearModifiers,
            characteristicModifiers: [...gearModifiers.characteristicModifiers, defaultCharacteristicModifier()],
        });
    };

    const removeCharacteristicModifier = (index: number) => {
        updateGearModifiers({
            ...gearModifiers,
            characteristicModifiers: gearModifiers.characteristicModifiers.filter((_, i) => i !== index),
        });
    };

    // ── Skill Rank Modifiers ──────────────────────────────────────────────────
    const updateSkillRankModifier = (index: number, updated: SkillRankModifier) => {
        const updated_list = gearModifiers.skillRankModifiers.map((m, i) => (i === index ? updated : m));
        updateGearModifiers({...gearModifiers, skillRankModifiers: updated_list});
    };

    const addSkillRankModifier = () => {
        updateGearModifiers({
            ...gearModifiers,
            skillRankModifiers: [...gearModifiers.skillRankModifiers, defaultSkillRankModifier()],
        });
    };

    const removeSkillRankModifier = (index: number) => {
        updateGearModifiers({
            ...gearModifiers,
            skillRankModifiers: gearModifiers.skillRankModifiers.filter((_, i) => i !== index),
        });
    };

    // ── Heal Effects ──────────────────────────────────────────────────────────
    const updateHealEffect = (index: number, updated: HealEffect) => {
        const updated_list = (gearModifiers.healEffects ?? []).map((m, i) => (i === index ? updated : m));
        updateGearModifiers({...gearModifiers, healEffects: updated_list});
    };

    const addHealEffect = () => {
        updateGearModifiers({
            ...gearModifiers,
            healEffects: [...(gearModifiers.healEffects ?? []), defaultHealEffect()],
        });
    };

    const removeHealEffect = (index: number) => {
        updateGearModifiers({
            ...gearModifiers,
            healEffects: (gearModifiers.healEffects ?? []).filter((_, i) => i !== index),
        });
    };

    // ── Applied Status Effects ────────────────────────────────────────────────
    const toggleStatusEffect = (type: StatusEffectType) => {
        const current = gearModifiers.appliedStatusEffects ?? [];
        const updated = current.includes(type)
            ? current.filter((s) => s !== type)
            : [...current, type];
        updateGearModifiers({...gearModifiers, appliedStatusEffects: updated});
    };

    // ── After Encounter Effect ────────────────────────────────────────────────
    const handleAfterEncounterField = (field: keyof AfterEncounterEffect, value: number) => {
        const base = gearModifiers.afterEncounterEffect ?? {wounds: 0, strain: 0};
        updateGearModifiers({...gearModifiers, afterEncounterEffect: {...base, [field]: value}});
    };

    const clearAfterEncounterEffect = () => {
        updateGearModifiers({...gearModifiers, afterEncounterEffect: undefined});
    };

    const enableAfterEncounterEffect = () => {
        updateGearModifiers({...gearModifiers, afterEncounterEffect: {wounds: 0, strain: 0}});
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
                <Grid size={6}>
                    <GenesysSelectField
                        value={gearModifiers.range ?? ""}
                        label="Range (optional)"
                        onChange={handleRange}
                        options={{None: "", ...RangeBand}}
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
                                {mod.amount}× {mod.diceType} — {mod.checkContext} / {mod.checkTarget} — {mod.skillType || mod.skill?.name || "No Skill Filter"}
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
                                        onChange={(v) => updateDiceModifier(index, {
                                            ...mod,
                                            diceType: v as DiceModifier["diceType"]
                                        })}
                                        options={DiceType}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={mod.amount}
                                        fullwidth
                                        label="Amount"
                                        onChange={(v) => updateDiceModifier(index, {...mod, amount: v})}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkContext}
                                        label="Check Context"
                                        onChange={(v) => updateDiceModifier(index, {
                                            ...mod,
                                            checkContext: v as DiceModifier["checkContext"]
                                        })}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => updateDiceModifier(index, {
                                            ...mod,
                                            checkTarget: v as DiceModifier["checkTarget"]
                                        })}
                                        options={Target}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => updateDiceModifier(index, {
                                            ...mod,
                                            skillType: v ? v as DiceModifier["skillType"] : undefined
                                        })}
                                        options={{Any: "", ...SkillType}}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <SelectSkillField skill={mod.skill!}
                                                      updateSkill={(updatedSkill) => updateDiceModifier(index, {
                                                          ...mod, skill: updatedSkill
                                                      })}/>
                                </Grid>
                            </GridContainer>
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
                                        onChange={(v) => updateResultsModifier(index, {
                                            ...mod,
                                            checkContext: v as ResultsModifier["checkContext"]
                                        })}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => updateResultsModifier(index, {
                                            ...mod,
                                            checkTarget: v as ResultsModifier["checkTarget"]
                                        })}
                                        options={Target}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => updateResultsModifier(index, {
                                            ...mod,
                                            skillType: v ? v as ResultsModifier["skillType"] : undefined
                                        })}
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
                                <SelectSkillAutocomplete
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
                                        onChange={(v) => updateUpgradeModifier(index, {
                                            ...mod,
                                            upgradeType: v as UpgradeModifier["upgradeType"]
                                        })}
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
                                        onChange={(v) => updateUpgradeModifier(index, {
                                            ...mod,
                                            checkContext: v as UpgradeModifier["checkContext"]
                                        })}
                                        options={CheckContext}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.checkTarget}
                                        label="Check Target"
                                        onChange={(v) => updateUpgradeModifier(index, {
                                            ...mod,
                                            checkTarget: v as UpgradeModifier["checkTarget"]
                                        })}
                                        options={Target}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.duration}
                                        label="Duration"
                                        onChange={(v) => updateUpgradeModifier(index, {
                                            ...mod,
                                            duration: v as UpgradeModifier["duration"]
                                        })}
                                        options={Duration}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <GenesysSelectField
                                        value={mod.skillType ?? ""}
                                        label="Skill Type Filter (optional)"
                                        onChange={(v) => updateUpgradeModifier(index, {
                                            ...mod,
                                            skillType: v ? v as UpgradeModifier["skillType"] : undefined
                                        })}
                                        options={{Any: "", ...SkillType}}
                                    />
                                </Grid>
                            </GridContainer>
                            {mod.skillType && (
                                <SelectSkillAutocomplete
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

            {/* ── Characteristic Modifiers ──────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    CHARACTERISTIC MODIFIERS
                </Typography>
            </Divider>

            {gearModifiers.characteristicModifiers.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                {mod.characteristic} {mod.amount >= 0 ? `+${mod.amount}` : mod.amount}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeCharacteristicModifier(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GridContainer spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={mod.characteristic}
                                    label="Characteristic"
                                    onChange={(v) => updateCharacteristicModifier(index, {
                                        ...mod,
                                        characteristic: v as CharacteristicModifier["characteristic"]
                                    })}
                                    options={CharacteristicType}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysNumberField
                                    value={mod.amount}
                                    fullwidth
                                    label="Amount"
                                    onChange={(v) => updateCharacteristicModifier(index, {...mod, amount: v})}
                                />
                            </Grid>
                        </GridContainer>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box>
                <IconButton color="primary" onClick={addCharacteristicModifier} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Characteristic Modifier
                </Typography>
            </Box>

            {/* ── Skill Rank Modifiers ───────────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    SKILL RANK MODIFIERS
                </Typography>
            </Divider>

            {gearModifiers.skillRankModifiers.map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                {mod.skill?.name || "Select skill"} {mod.ranks >= 0 ? `+${mod.ranks}` : mod.ranks} rank{Math.abs(mod.ranks) !== 1 ? "s" : ""}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSkillRankModifier(index);
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
                                    <GenesysNumberField
                                        value={mod.ranks}
                                        fullwidth
                                        label="Ranks"
                                        onChange={(v) => updateSkillRankModifier(index, {...mod, ranks: v})}
                                    />
                                </Grid>
                            </GridContainer>
                            <SelectSkillAutocomplete
                                currentSkill={mod.skill as Skill}
                                handleSkillSelect={(skill: Skill) => updateSkillRankModifier(index, {...mod, skill})}
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box>
                <IconButton color="primary" onClick={addSkillRankModifier} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Skill Rank Modifier
                </Typography>
            </Box>

            {/* ── Drug / Consumable Effects ──────────────────────────── */}
            <Divider>
                <Typography variant="caption" sx={{fontWeight: "bold", color: "primary.main"}}>
                    DRUG / CONSUMABLE EFFECTS
                </Typography>
            </Divider>

            {/* Heal Effects */}
            {(gearModifiers.healEffects ?? []).map((mod, index) => (
                <Accordion key={index} disableGutters sx={{bgcolor: "background.paper"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%", gap: 1}}>
                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                Heal {mod.target} — {mod.source}{mod.source === HealSource.Fixed ? ` (${mod.amount})` : ''}
                            </Typography>
                            <Tooltip title="Remove">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeHealEffect(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GridContainer spacing={2}>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={mod.target}
                                    label="Heal Target"
                                    onChange={(v) => updateHealEffect(index, {
                                        ...mod,
                                        target: v as HealEffect["target"]
                                    })}
                                    options={HealTarget}
                                />
                            </Grid>
                            <Grid size={6}>
                                <GenesysSelectField
                                    value={mod.source}
                                    label="Heal Source"
                                    onChange={(v) => updateHealEffect(index, {
                                        ...mod,
                                        source: v as HealEffect["source"]
                                    })}
                                    options={HealSource}
                                />
                            </Grid>
                            {mod.source === HealSource.Fixed && (
                                <Grid size={6}>
                                    <GenesysNumberField
                                        value={mod.amount ?? 0}
                                        fullwidth
                                        label="Amount"
                                        min={0}
                                        onChange={(v) => updateHealEffect(index, {...mod, amount: v})}
                                    />
                                </Grid>
                            )}
                        </GridContainer>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box>
                <IconButton color="primary" onClick={addHealEffect} size="small">
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                    Add Heal Effect
                </Typography>
            </Box>

            {/* Applied Status Effects */}
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{display: "block", mb: 0.5}}>
                    Applied Status Effects
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {Object.values(StatusEffectType).map((type) => (
                        <FormControlLabel
                            key={type}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={(gearModifiers.appliedStatusEffects ?? []).includes(type)}
                                    onChange={() => toggleStatusEffect(type)}
                                />
                            }
                            label={type}
                        />
                    ))}
                </Stack>
            </Box>

            {/* Ignore Critical Injury Penalties */}
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={gearModifiers.ignoreCriticalInjuryPenalties ?? false}
                            onChange={(e) => updateGearModifiers({
                                ...gearModifiers,
                                ignoreCriticalInjuryPenalties: e.target.checked,
                            })}
                        />
                    }
                    label="Ignore Critical Injury Penalties (for encounter)"
                />
            </Box>

            {/* Diminishing Returns Healing */}
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={gearModifiers.diminishingReturnsHealing ?? false}
                            onChange={(e) => updateGearModifiers({
                                ...gearModifiers,
                                diminishingReturnsHealing: e.target.checked,
                            })}
                        />
                    }
                    label="Diminishing Returns Healing (each use heals 1 fewer wounds)"
                />
            </Box>

            {/* After Encounter Effect */}
            <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{mb: 1}}>
                    <Typography variant="caption" color="text.secondary">
                        After Encounter Effect
                    </Typography>
                    {gearModifiers.afterEncounterEffect == null ? (
                        <IconButton color="primary" onClick={enableAfterEncounterEffect} size="small">
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    ) : (
                        <Tooltip title="Remove">
                            <IconButton color="error" onClick={clearAfterEncounterEffect} size="small">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
                {gearModifiers.afterEncounterEffect != null && (
                    <GridContainer spacing={2}>
                        <Grid size={6}>
                            <GenesysNumberField
                                value={gearModifiers.afterEncounterEffect.wounds}
                                fullwidth
                                label="Wounds Suffered"
                                min={0}
                                onChange={(v) => handleAfterEncounterField("wounds", v)}
                            />
                        </Grid>
                        <Grid size={6}>
                            <GenesysNumberField
                                value={gearModifiers.afterEncounterEffect.strain}
                                fullwidth
                                label="Strain Suffered"
                                min={0}
                                onChange={(v) => handleAfterEncounterField("strain", v)}
                            />
                        </Grid>
                    </GridContainer>
                )}
            </Box>
        </Stack>
    );
}

