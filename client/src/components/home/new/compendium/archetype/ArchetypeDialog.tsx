import {type Archetype, type ArchetypeSkill, CharacteristicType, type Skill, SkillType} from "../../../../../api/model";
import {useEffect, useState} from "react";
import {
    Autocomplete,
    Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControlLabel, Grid,
    MenuItem, Stack, Switch,
    Tabs, TextField, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {emptyArchetype} from "../../../../../models/Template.ts";
import Tab from "@mui/material/Tab";
import GenesysTextField from "../../../common/field/GenesysTextField.tsx";
import SaveIcon from "@mui/icons-material/Save";
import GenesysNumberField from "../../../common/field/GenesysNumberField.tsx";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {StatsType} from "../../../../../models/StatsType.ts";

// ─── Condition catalogue ────────────────────────────────────────────────────

const ANY_SKILL_TYPE = 'Any' as const;

const SkillCondition = {
    TwoNonCareerOneRank:  'Two non-career skills of choice (1 rank each)',
    OneSkill:             'One specific skill',
    TwoSkills:            'Two specific skills',
    OneSkillTypeChoice:   'One skill of choice',
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

// ─── Component ──────────────────────────────────────────────────────────────

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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (archetype) {
            setFormData(archetype);
            setSelectedCondition(detectCondition(archetype.skills ?? []));
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

    const handleSave = () => {
        onSave(formData);
        setFormData(emptyArchetype);
        setSelectedCondition('');
        onClose();
    };

    const handleClose = () => {
        setFormData(emptyArchetype);
        setSelectedCondition('');
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

    const slotWasOriginallyPlayerChoice = (index: number): boolean =>
        selectedCondition
            ? (getSkillsForCondition(selectedCondition)[index]?.playerChoice ?? false)
            : false;

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
                            const originalWasPlayerChoice = slotWasOriginallyPlayerChoice(index);
                            const availableSkills = getAvailableSkills(entry);

                            return (
                                <Card key={index} variant="outlined">
                                    <CardContent>
                                        <Stack spacing={2}>

                                            {/* Slot header + metadata chips */}
                                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1}}>
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
                                                                <MenuItem value={1}>1 rank — max rank 2 during character creation</MenuItem>
                                                                <MenuItem value={2}>2 ranks — max rank 3 during character creation</MenuItem>
                                                            </TextField>
                                                        </>
                                                    )}

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={false}
                                                                size="small"
                                                                onChange={() => handleSkillEntryChange(index, {
                                                                    ...entry,
                                                                    playerChoice: false,
                                                                })}
                                                            />
                                                        }
                                                        label={
                                                            <Typography variant="body2">
                                                                Override: assign a specific skill instead
                                                            </Typography>
                                                        }
                                                    />
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
                                                            <MenuItem value={1}>1 rank — max rank 2 during character creation</MenuItem>
                                                            <MenuItem value={2}>2 ranks — max rank {maxRankLabelForTwoRanks} during character creation</MenuItem>
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
                                                            <TextField {...params} label="Skill" size="small" fullWidth/>
                                                        )}
                                                    />

                                                    {/* Revert toggle — only for slots that were originally player-choice */}
                                                    {originalWasPlayerChoice && (
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={true}
                                                                    size="small"
                                                                    onChange={() => handleSkillEntryChange(index, {
                                                                        ...entry,
                                                                        playerChoice: true,
                                                                        skill: undefined,
                                                                    })}
                                                                />
                                                            }
                                                            label={
                                                                <Typography variant="body2">
                                                                    Specific skill assigned — toggle off to restore player choice
                                                                </Typography>
                                                            }
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            );
                        })}
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
