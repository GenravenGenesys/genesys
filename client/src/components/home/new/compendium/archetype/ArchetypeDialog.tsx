import {
    Activation,
    type Ability,
    type AbilityModifiers,
    type Archetype,
    type ArchetypeSkill,
    CharacteristicType,
    CheckContext,
    CheckTarget,
    CostType,
    type DiceModifier,
    DiceType,
    LimitType,
    type Skill,
    SkillType,
    type Cost,
    type Limit,
    type StatModifiers
} from "../../../../../api/model";
import {useEffect, useState} from "react";
import {
    Autocomplete,
    Box, Button, Card, CardContent, Checkbox, Chip, Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControlLabel, Grid,
    MenuItem, Stack,
    Tabs, TextField, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import GenesysSelectField from "../../../common/field/GenesysSelectField.tsx";
import {emptyArchetype} from "../../../../../models/Template.ts";
import Tab from "@mui/material/Tab";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import SaveIcon from "@mui/icons-material/Save";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {StatsType} from "../../../../../models/StatsType.ts";

const ANY_SKILL_TYPE = 'Any' as const;

const SkillCondition = {
    TwoNonCareerOneRank: 'Two non-career skills of choice (1 rank each)',
    OneSkill: 'One specific skill',
    TwoSkills: 'Two specific skills',
    OneSkillTypeChoice: 'One skill of choice',
} as const;

type SkillConditionType = typeof SkillCondition[keyof typeof SkillCondition];

const getSkillsForCondition = (condition: SkillConditionType): ArchetypeSkill[] => {
    switch (condition) {
        case SkillCondition.TwoNonCareerOneRank:
            return [
                {playerChoice: true, nonCareer: true, startingRanks: 1, maxRank: 2},
                {playerChoice: true, nonCareer: true, startingRanks: 1, maxRank: 2},
            ];
        case SkillCondition.OneSkill:
            return [{playerChoice: false, startingRanks: 1, maxRank: 2}];
        case SkillCondition.TwoSkills:
            // Both slots default to 1 rank; maxRank is always 2 for two-skill grants
            return [
                {playerChoice: false, startingRanks: 1, maxRank: 2},
                {playerChoice: false, startingRanks: 1, maxRank: 2},
            ];
        case SkillCondition.OneSkillTypeChoice:
            // Default to Knowledge + 1 rank; admin can change both
            return [{playerChoice: true, requiredSkillType: SkillType.Knowledge, startingRanks: 1, maxRank: 2}];
    }
};

/**
 * Best-effort reverse-mapping of a saved skills array back to a condition label.
 * Two slots → TwoNonCareerOneRank (if nonCareer) else TwoSkills.
 * One slot with playerChoice or requiredSkillType → OneSkillTypeChoice (covers overrides).
 * One fixed slot → OneSkill.
 */
const detectCondition = (skills: ArchetypeSkill[]): SkillConditionType | '' => {
    if (!skills || skills.length === 0) return '';
    if (skills.length === 2) {
        return skills.every(s => s.nonCareer)
            ? SkillCondition.TwoNonCareerOneRank
            : SkillCondition.TwoSkills;
    }
    if (skills.length === 1) {
        const s = skills[0];
        return (s.playerChoice || s.requiredSkillType)
            ? SkillCondition.OneSkillTypeChoice
            : SkillCondition.OneSkill;
    }
    return '';
};

interface Props {
    open: boolean;
    archetype: Archetype;
    onClose: () => void;
    onSave: (data: Archetype) => void;
    isNew: boolean;
    skills: Skill[];
}

export default function ArchetypeDialog(props: Props) {
    const {open, archetype, onClose, onSave, isNew, skills} = props;
    const [formData, setFormData] = useState<Archetype>(archetype || {});
    const [tabValue, setTabValue] = useState(0);
    const [selectedCondition, setSelectedCondition] = useState<SkillConditionType | ''>('');
    const [abilityStatsEnabled, setAbilityStatsEnabled] = useState<boolean[]>([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (archetype) {
            setFormData(archetype);
            setSelectedCondition(detectCondition(archetype.skills ?? []));
            setAbilityStatsEnabled(
                (archetype.abilities ?? []).map(a =>
                    a.statModifiers.wounds > 0 || a.statModifiers.strain > 0 ||
                    a.statModifiers.soak > 0 || a.statModifiers.defense > 0 ||
                    a.statModifiers.encumbranceThreshold > 0
                )
            );
        }
    }, [archetype]);

    const handleChange = <K extends keyof Archetype>(field: K, value: Archetype[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleConditionChange = (condition: SkillConditionType) => {
        setSelectedCondition(condition);
        handleChange('skills', getSkillsForCondition(condition));
    };

    const handleSkillEntryChange = (index: number, updated: ArchetypeSkill) => {
        const newSkills = formData.skills.map((s, i) => i === index ? updated : s);
        handleChange('skills', newSkills);
    };

    /**
     * TwoSkills always caps maxRank at 2 regardless of startingRanks (rule: "may not be
     * increased higher than rank 2 during character creation" even when starting at rank 2).
     * All other conditions: 1 starting rank → maxRank 2, 2 starting ranks → maxRank 3.
     */
    const handleStartingRanksChange = (index: number, ranks: number) => {
        const maxRank = selectedCondition === SkillCondition.TwoSkills ? 2 : (ranks === 1 ? 2 : 3);
        handleSkillEntryChange(index, {
            ...formData.skills[index],
            startingRanks: ranks,
            maxRank,
        });
    };

    const emptyAbility = (): Ability => ({
        name: '',
        description: '',
        activation: Activation.Passive,
        cost: {type: CostType.None, amount: 0},
        limit: {type: LimitType.None, limit: 0},
        statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0},
        abilityModifiers: {
            diceModifiers: [],
            resultsModifiers: [],
            healEffects: [],
            environmentModifiers: [],
            freeMoveManeuver: false,
            criticalInjuryCountAsOne: false,
            moveStoryPoint: false,
        },
    });

    const handleAddAbility = () => {
        handleChange('abilities', [...(formData.abilities ?? []), emptyAbility()]);
        setAbilityStatsEnabled(prev => [...prev, false]);
    };

    const handleRemoveAbility = (index: number) => {
        const updated = (formData.abilities ?? []).filter((_, i) => i !== index);
        handleChange('abilities', updated);
        setAbilityStatsEnabled(prev => prev.filter((_, i) => i !== index));
    };

    const handleAbilityNameChange = (index: number, value: string) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, name: value} : a
        );
        handleChange('abilities', updated);
    };

    const handleAbilityDescriptionChange = (index: number, value: string) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, description: value} : a
        );
        handleChange('abilities', updated);
    };

    const handleAbilityActivationChange = (index: number, value: Activation) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, activation: value} : a
        );
        handleChange('abilities', updated);
    };

    const handleAbilityCostChange = (index: number, cost: Cost) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, cost} : a
        );
        handleChange('abilities', updated);
    };

    const handleAbilityLimitChange = (index: number, limit: Limit) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, limit} : a
        );
        handleChange('abilities', updated);
    };

    const handleAbilityStatChange = (index: number, field: keyof StatModifiers, value: number) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, statModifiers: {...a.statModifiers, [field]: value}} : a
        );
        handleChange('abilities', updated);
    };

    const toggleAbilityStats = (index: number, enabled: boolean) => {
        setAbilityStatsEnabled(prev => prev.map((v, i) => i === index ? enabled : v));
        if (!enabled) {
            const updated = (formData.abilities ?? []).map((a, i) =>
                i === index ? {
                    ...a,
                    statModifiers: {wounds: 0, strain: 0, soak: 0, defense: 0, encumbranceThreshold: 0}
                } : a
            );
            handleChange('abilities', updated);
        }
    };

    const handleAbilityModifierBoolChange = (index: number, field: keyof AbilityModifiers, value: boolean) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === index ? {...a, abilityModifiers: {...a.abilityModifiers, [field]: value}} : a
        );
        handleChange('abilities', updated);
    };

    const handleAddDiceModifier = (abilityIndex: number) => {
        const emptyDice: DiceModifier = {
            diceType: DiceType.Setback,
            amount: 1,
            checkContext: CheckContext.All,
            checkTarget: CheckTarget.Opponent,
        };
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === abilityIndex
                ? {
                    ...a,
                    abilityModifiers: {
                        ...a.abilityModifiers,
                        diceModifiers: [...a.abilityModifiers.diceModifiers, emptyDice]
                    }
                }
                : a
        );
        handleChange('abilities', updated);
    };

    const handleRemoveDiceModifier = (abilityIndex: number, diceIndex: number) => {
        const updated = (formData.abilities ?? []).map((a, i) =>
            i === abilityIndex
                ? {
                    ...a,
                    abilityModifiers: {
                        ...a.abilityModifiers,
                        diceModifiers: a.abilityModifiers.diceModifiers.filter((_, di) => di !== diceIndex),
                    },
                }
                : a
        );
        handleChange('abilities', updated);
    };

    const handleDiceModifierChange = (abilityIndex: number, diceIndex: number, field: keyof DiceModifier, value: DiceModifier[keyof DiceModifier]) => {
        const updated = (formData.abilities ?? []).map((a, i) => {
            if (i !== abilityIndex) return a;
            const diceModifiers = a.abilityModifiers.diceModifiers.map((dm, di) =>
                di === diceIndex ? {...dm, [field]: value} : dm
            );
            return {...a, abilityModifiers: {...a.abilityModifiers, diceModifiers}};
        });
        handleChange('abilities', updated);
    };

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyArchetype);
        setSelectedCondition('');
        setAbilityStatsEnabled([]);
        onClose();
    };

    const handleClose = () => {
        setFormData(emptyArchetype);
        setSelectedCondition('');
        setAbilityStatsEnabled([]);
        onClose();
    };

    const getPlayerChoiceDescription = (entry: ArchetypeSkill): string => {
        const rankLabel = entry.startingRanks === 1 ? '1 starting rank' : '2 starting ranks';
        const maxLabel = `max rank ${entry.maxRank} during character creation`;
        if (entry.requiredSkillType) return `Player chooses a ${entry.requiredSkillType} skill — ${rankLabel}, ${maxLabel}`;
        if (entry.nonCareer) return `Player chooses a non-career skill — ${rankLabel}, ${maxLabel}`;
        return `Player chooses any skill — ${rankLabel}, ${maxLabel}`;
    };

    const getAvailableSkills = (entry: ArchetypeSkill): Skill[] =>
        entry.requiredSkillType ? skills.filter(s => s.type === entry.requiredSkillType) : skills;

    // The "2 ranks" MenuItem shows a different maxRank label depending on the condition
    const maxRankLabelForTwoRanks = selectedCondition === SkillCondition.TwoSkills ? 2 : 3;

    // TwoNonCareerOneRank slots have fixed ranks (1); no rank selector needed there
    const showRankSelectorInFixedBranch = selectedCondition !== SkillCondition.TwoNonCareerOneRank;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            fullScreen={fullScreen}
            maxWidth="md"
            scroll="paper"
            slotProps={{paper: {sx: {borderRadius: 4, bgcolor: '#050c14', backgroundImage: 'none'}}}}
        >
            <DialogTitle>{isNew ? "Create Custom Archetype" : "Edit Archetype"}</DialogTitle>

            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                    <Tab label="Basic Information"/>
                    <Tab label="Starting Skills"/>
                    <Tab label="Abilities"/>
                </Tabs>
            </Box>

            <DialogContent sx={{minHeight: '500px', py: 3}} dividers>

                {/* ── Tab 0: Basic Information ── */}
                {tabValue === 0 && (
                    <Stack spacing={3}>
                        <GenesysTextField text={formData.name || ''} label={"Archetype Name"}
                                          onChange={(e) => handleChange("name", e)} fullwidth/>
                        <GenesysTextField text={formData.description || ''} label={"Description"}
                                          onChange={(e) => handleChange("description", e)} fullwidth rows={3}/>
                        <Divider sx={{my: 2}}>
                            <Typography variant="caption" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                Characteristics
                            </Typography>
                        </Divider>
                        <GridContainer>
                            <Grid size={4}>
                                <GenesysNumberField value={formData.brawn}
                                                    label={CharacteristicType.Brawn}
                                                    onChange={(e) => handleChange('brawn', e)} min={1} max={5}
                                                    fullwidth/>
                                <GenesysNumberField value={formData.cunning}
                                                    label={CharacteristicType.Cunning}
                                                    onChange={(e) => handleChange('cunning', e)} min={1} max={5}
                                                    fullwidth/>
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField value={formData.agility}
                                                    label={CharacteristicType.Agility}
                                                    onChange={(e) => handleChange('agility', e)} min={1} max={5}
                                                    fullwidth/>
                                <GenesysNumberField value={formData.willpower}
                                                    label={CharacteristicType.Willpower}
                                                    onChange={(e) => handleChange('willpower', e)} min={1} max={5}
                                                    fullwidth/>
                            </Grid>
                            <Grid size={4}>
                                <GenesysNumberField value={formData.intellect}
                                                    label={CharacteristicType.Intellect}
                                                    onChange={(e) => handleChange('intellect', e)} min={1} max={5}
                                                    fullwidth/>
                                <GenesysNumberField value={formData.presence}
                                                    label={CharacteristicType.Presence}
                                                    onChange={(e) => handleChange('presence', e)} min={1} max={5}
                                                    fullwidth/>
                            </Grid>
                        </GridContainer>
                        <GridContainer>
                            <Grid size={6}>
                                <GenesysNumberField value={formData.wounds || 0} fullwidth
                                                    label={StatsType.Wounds + ' Threshold'}
                                                    onChange={(e) => handleChange('wounds', e)}/>
                            </Grid>
                            <Grid size={6}>
                                <GenesysNumberField value={formData.strain || 0} fullwidth
                                                    label={StatsType.Strain + ' Threshold'}
                                                    onChange={(e) => handleChange('strain', e)}/>
                            </Grid>
                        </GridContainer>
                        <GridContainer>
                            <Grid size={12}>
                                <GenesysNumberField value={formData.experience || 0} fullwidth
                                                    label={'Starting Experience'}
                                                    onChange={(e) => handleChange('experience', e)}/>
                            </Grid>
                        </GridContainer>
                    </Stack>
                )}

                {/* ── Tab 1: Starting Skills ── */}
                {tabValue === 1 && (
                    <Stack spacing={3}>

                        {/* Condition picker */}
                        <TextField
                            select
                            fullWidth
                            label="Skill Grant Condition"
                            value={selectedCondition}
                            onChange={(e) => handleConditionChange(e.target.value as SkillConditionType)}
                        >
                            <MenuItem value="" disabled><em>Select a condition…</em></MenuItem>
                            {Object.entries(SkillCondition).map(([key, label]) => (
                                <MenuItem key={key} value={label}>{label}</MenuItem>
                            ))}
                        </TextField>

                        {/* One card per skill slot */}
                        {selectedCondition && formData.skills?.map((entry, index) => {
                            const availableSkills = getAvailableSkills(entry);

                            return (
                                <Card key={index} variant="outlined">
                                    <CardContent>
                                        <Stack spacing={2}>

                                            {/* Slot header + metadata chips */}
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: 1
                                            }}>
                                                <Typography variant="subtitle2" color="primary" fontWeight="bold">
                                                    Skill Slot {index + 1}
                                                </Typography>
                                                <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                                    <Chip size="small"
                                                          label={`${entry.startingRanks} starting rank${entry.startingRanks > 1 ? 's' : ''}`}/>
                                                    <Chip size="small" label={`Max rank ${entry.maxRank}`}/>
                                                    {entry.nonCareer && (
                                                        <Chip size="small" label="Non-Career Only" color="warning"/>
                                                    )}
                                                </Box>
                                            </Box>

                                            {entry.playerChoice ? (
                                                /* ── Player-choice slot ── */
                                                <>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {getPlayerChoiceDescription(entry)}
                                                    </Typography>

                                                    {/* Type + rank selectors — only for OneSkillTypeChoice */}
                                                    {selectedCondition === SkillCondition.OneSkillTypeChoice && (
                                                        <>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                size="small"
                                                                label="Required Skill Type"
                                                                value={entry.requiredSkillType ?? ANY_SKILL_TYPE}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    handleSkillEntryChange(index, {
                                                                        ...entry,
                                                                        requiredSkillType: val === ANY_SKILL_TYPE
                                                                            ? undefined
                                                                            : val as SkillType,
                                                                    });
                                                                }}
                                                            >
                                                                <MenuItem value={ANY_SKILL_TYPE}>Any</MenuItem>
                                                                {Object.values(SkillType).map(type => (
                                                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                                                ))}
                                                            </TextField>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                size="small"
                                                                label="Starting Ranks"
                                                                value={entry.startingRanks}
                                                                onChange={(e) => handleStartingRanksChange(index, Number(e.target.value))}
                                                            >
                                                                <MenuItem value={1}>1 rank — max rank 2 during character
                                                                    creation</MenuItem>
                                                                <MenuItem value={2}>2 ranks — max rank 3 during
                                                                    character creation</MenuItem>
                                                            </TextField>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                /* ── Fixed-skill slot ── */
                                                <>
                                                    {/* Rank selector hidden for TwoNonCareerOneRank (ranks are rule-fixed at 1) */}
                                                    {showRankSelectorInFixedBranch && (
                                                        <TextField
                                                            select
                                                            fullWidth
                                                            size="small"
                                                            label="Starting Ranks"
                                                            value={entry.startingRanks}
                                                            onChange={(e) => handleStartingRanksChange(index, Number(e.target.value))}
                                                        >
                                                            <MenuItem value={1}>1 rank — max rank 2 during character
                                                                creation</MenuItem>
                                                            <MenuItem value={2}>2 ranks — max
                                                                rank {maxRankLabelForTwoRanks} during character
                                                                creation</MenuItem>
                                                        </TextField>
                                                    )}

                                                    <Autocomplete
                                                        options={availableSkills}
                                                        getOptionLabel={(option) => option.name}
                                                        value={entry.skill ?? null}
                                                        onChange={(_, newValue) =>
                                                            handleSkillEntryChange(index, {
                                                                ...entry,
                                                                skill: newValue ?? undefined,
                                                            })
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Skill" size="small"
                                                                       fullWidth/>
                                                        )}
                                                    />
                                                </>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Stack>
                )}
                {/* ── Tab 2: Abilities ── */}
                {tabValue === 2 && (
                    <Stack spacing={3}>
                        {(formData.abilities ?? []).map((ability, index) => (
                            <Card key={index} variant="outlined">
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Typography variant="subtitle2" color="primary" fontWeight="bold">
                                                Ability {index + 1}
                                            </Typography>
                                            <Button size="small" color="error"
                                                    onClick={() => handleRemoveAbility(index)}>
                                                Remove
                                            </Button>
                                        </Box>
                                        <GenesysTextField text={ability.name} label={"Ability Name"} fullwidth
                                                          onChange={(e) => handleAbilityNameChange(index, e)}/>
                                        <GenesysTextField text={ability.description} label={"Description"} fullwidth rows={3}
                                                          onChange={(e) => handleAbilityDescriptionChange(index, e)}/>
                                        <GenesysSelectField
                                            value={ability.activation}
                                            label="Activation"
                                            onChange={(value) => handleAbilityActivationChange(index, value as Activation)}
                                            options={Activation}
                                        />
                                        <Divider sx={{my: 1}}>
                                            <Typography variant="caption"
                                                        sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                                Cost &amp; Limit
                                            </Typography>
                                        </Divider>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <GenesysSelectField
                                                    value={ability.cost.type}
                                                    label="Cost Type"
                                                    onChange={(type) => handleAbilityCostChange(index, {
                                                        type: type as CostType,
                                                        amount: type === CostType.None ? 0 : ability.cost.amount,
                                                    })}
                                                    options={CostType}
                                                />
                                            </Grid>
                                            {ability.cost.type !== CostType.None && (
                                                <Grid size={6}>
                                                    <GenesysNumberField
                                                        value={ability.cost.amount}
                                                        label="Cost Amount"
                                                        onChange={(value) => handleAbilityCostChange(index, {
                                                            ...ability.cost,
                                                            amount: value,
                                                        })}
                                                        min={0}
                                                        max={ability.cost.type === CostType.Strain ? 5 : 1}
                                                        fullwidth
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <GenesysSelectField
                                                    value={ability.limit.type}
                                                    label="Limit Type"
                                                    onChange={(type) => handleAbilityLimitChange(index, {
                                                        type: type as LimitType,
                                                        limit: type === LimitType.None ? 0 : ability.limit.limit,
                                                    })}
                                                    options={LimitType}
                                                />
                                            </Grid>
                                            {ability.limit.type !== LimitType.None && (
                                                <Grid size={6}>
                                                    <GenesysNumberField
                                                        value={ability.limit.limit}
                                                        label="Limit Amount"
                                                        onChange={(value) => handleAbilityLimitChange(index, {
                                                            ...ability.limit,
                                                            limit: value,
                                                        })}
                                                        min={0}
                                                        max={1}
                                                        fullwidth
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Divider sx={{my: 1}}>
                                            <Typography variant="caption"
                                                        sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                                Stat Modifiers
                                            </Typography>
                                        </Divider>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={abilityStatsEnabled[index] ?? false}
                                                    onChange={(e) => toggleAbilityStats(index, e.target.checked)}
                                                />
                                            }
                                            label="Modify Stats"
                                        />
                                        {abilityStatsEnabled[index] && (
                                            <GridContainer spacing={2}>
                                                <GenesysNumberField
                                                    value={ability.statModifiers.wounds}
                                                    label={'Increase ' + StatsType.Wounds + ' Threshold'}
                                                    onChange={(value) => handleAbilityStatChange(index, 'wounds', value)}
                                                    min={0} max={5} fullwidth
                                                />
                                                <GenesysNumberField
                                                    value={ability.statModifiers.strain}
                                                    label={'Increase ' + StatsType.Strain + ' Threshold'}
                                                    onChange={(value) => handleAbilityStatChange(index, 'strain', value)}
                                                    min={0} max={5} fullwidth
                                                />
                                                <GenesysNumberField
                                                    value={ability.statModifiers.soak}
                                                    label="Increase Soak"
                                                    onChange={(value) => handleAbilityStatChange(index, 'soak', value)}
                                                    min={0} max={5} fullwidth
                                                />
                                                <GenesysNumberField
                                                    value={ability.statModifiers.defense}
                                                    label="Increase Defense"
                                                    onChange={(value) => handleAbilityStatChange(index, 'defense', value)}
                                                    min={0} max={5} fullwidth
                                                />
                                                <GenesysNumberField
                                                    value={ability.statModifiers.encumbranceThreshold}
                                                    label="Increase Encumbrance Threshold"
                                                    onChange={(value) => handleAbilityStatChange(index, 'encumbranceThreshold', value)}
                                                    min={0} max={5} fullwidth
                                                />
                                            </GridContainer>
                                        )}
                                        <Divider sx={{my: 1}}>
                                            <Typography variant="caption"
                                                        sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                                Ability Modifiers
                                            </Typography>
                                        </Divider>
                                        <Stack spacing={1}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={ability.abilityModifiers.criticalInjuryCountAsOne}
                                                        onChange={(e) => handleAbilityModifierBoolChange(index, 'criticalInjuryCountAsOne', e.target.checked)}
                                                    />
                                                }
                                                label="Critical Injury counts as 01"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={ability.abilityModifiers.freeMoveManeuver}
                                                        onChange={(e) => handleAbilityModifierBoolChange(index, 'freeMoveManeuver', e.target.checked)}
                                                    />
                                                }
                                                label="Free second move maneuver"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={ability.abilityModifiers.moveStoryPoint}
                                                        onChange={(e) => handleAbilityModifierBoolChange(index, 'moveStoryPoint', e.target.checked)}
                                                    />
                                                }
                                                label="Move Story Point to players"
                                            />
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary" sx={{mt: 1}}>
                                            Dice Modifiers
                                        </Typography>
                                        <Stack spacing={2}>
                                            {ability.abilityModifiers.diceModifiers.map((dm, diceIndex) => (
                                                <Card key={diceIndex} variant="outlined" sx={{p: 1}}>
                                                    <Stack spacing={1}>
                                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                            <Button size="small" color="error"
                                                                    onClick={() => handleRemoveDiceModifier(index, diceIndex)}>
                                                                Remove
                                                            </Button>
                                                        </Box>
                                                        <Grid container spacing={1}>
                                                            <Grid size={6}>
                                                                <GenesysSelectField
                                                                    value={dm.diceType}
                                                                    label="Dice Type"
                                                                    onChange={(value) => handleDiceModifierChange(index, diceIndex, 'diceType', value as DiceType)}
                                                                    options={DiceType}
                                                                />
                                                            </Grid>
                                                            <Grid size={6}>
                                                                <GenesysNumberField
                                                                    value={dm.amount}
                                                                    label="Amount"
                                                                    onChange={(value) => handleDiceModifierChange(index, diceIndex, 'amount', value)}
                                                                    min={1} max={5} fullwidth
                                                                />
                                                            </Grid>
                                                            <Grid size={6}>
                                                                <GenesysSelectField
                                                                    value={dm.checkContext}
                                                                    label="Check Context"
                                                                    onChange={(value) => handleDiceModifierChange(index, diceIndex, 'checkContext', value as CheckContext)}
                                                                    options={CheckContext}
                                                                />
                                                            </Grid>
                                                            <Grid size={6}>
                                                                <GenesysSelectField
                                                                    value={dm.checkTarget}
                                                                    label="Check Target"
                                                                    onChange={(value) => handleDiceModifierChange(index, diceIndex, 'checkTarget', value as CheckTarget)}
                                                                    options={CheckTarget}
                                                                />
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <GenesysSelectField
                                                                    value={dm.skillType ?? ''}
                                                                    label="Skill Type (optional)"
                                                                    onChange={(value) => handleDiceModifierChange(index, diceIndex, 'skillType', value === '' ? undefined : value as SkillType)}
                                                                    options={{None: '', ...SkillType}}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Stack>
                                                </Card>
                                            ))}
                                            <Button size="small" variant="outlined"
                                                    onClick={() => handleAddDiceModifier(index)}>
                                                Add Dice Modifier
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outlined" onClick={handleAddAbility}>
                            Add Ability
                        </Button>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{p: 3}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSave}>
                    Save Archetype
                </Button>
            </DialogActions>
        </Dialog>
    );
}
