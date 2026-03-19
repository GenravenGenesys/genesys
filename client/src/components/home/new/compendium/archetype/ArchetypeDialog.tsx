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

const SkillCondition = {
    TwoNonCareerOneRank:      'Two non-career skills of choice (1 rank each)',
    OneSkillOneRank:          'One specific skill (1 rank)',
    OneSkillTwoRanks:         'One specific skill (2 ranks)',
    TwoSkillsOneRankEach:     'Two specific skills (1 rank each)',
    TwoSkillsTwoRanksEach:    'Two specific skills (2 ranks each, max rank 2)',
    OneKnowledgeChoiceTwoRanks: 'One knowledge skill of choice (2 ranks)',
} as const;

type SkillConditionType = typeof SkillCondition[keyof typeof SkillCondition];

const getSkillsForCondition = (condition: SkillConditionType): ArchetypeSkill[] => {
    switch (condition) {
        case SkillCondition.TwoNonCareerOneRank:
            return [
                {playerChoice: true, nonCareer: true, startingRanks: 1, maxRank: 2},
                {playerChoice: true, nonCareer: true, startingRanks: 1, maxRank: 2},
            ];
        case SkillCondition.OneSkillOneRank:
            return [{playerChoice: false, startingRanks: 1, maxRank: 2}];
        case SkillCondition.OneSkillTwoRanks:
            return [{playerChoice: false, startingRanks: 2, maxRank: 3}];
        case SkillCondition.TwoSkillsOneRankEach:
            return [
                {playerChoice: false, startingRanks: 1, maxRank: 2},
                {playerChoice: false, startingRanks: 1, maxRank: 2},
            ];
        case SkillCondition.TwoSkillsTwoRanksEach:
            return [
                {playerChoice: false, startingRanks: 2, maxRank: 2},
                {playerChoice: false, startingRanks: 2, maxRank: 2},
            ];
        case SkillCondition.OneKnowledgeChoiceTwoRanks:
            return [{playerChoice: true, requiredSkillType: SkillType.Knowledge, startingRanks: 2, maxRank: 3}];
    }
};

/** Best-effort reverse-mapping of a saved skills array back to a condition label. */
const detectCondition = (skills: ArchetypeSkill[]): SkillConditionType | '' => {
    if (!skills || skills.length === 0) return '';
    if (skills.length === 2 && skills.every(s => s.nonCareer && s.startingRanks === 1 && s.maxRank === 2))
        return SkillCondition.TwoNonCareerOneRank;
    if (skills.length === 1 && !skills[0].requiredSkillType && skills[0].startingRanks === 1 && skills[0].maxRank === 2)
        return SkillCondition.OneSkillOneRank;
    if (skills.length === 1 && !skills[0].requiredSkillType && skills[0].startingRanks === 2 && skills[0].maxRank === 3)
        return SkillCondition.OneSkillTwoRanks;
    if (skills.length === 2 && skills.every(s => !s.nonCareer && s.startingRanks === 1 && s.maxRank === 2))
        return SkillCondition.TwoSkillsOneRankEach;
    if (skills.length === 2 && skills.every(s => s.startingRanks === 2 && s.maxRank === 2))
        return SkillCondition.TwoSkillsTwoRanksEach;
    if (skills.length === 1 && skills[0].requiredSkillType === SkillType.Knowledge && skills[0].startingRanks === 2 && skills[0].maxRank === 3)
        return SkillCondition.OneKnowledgeChoiceTwoRanks;
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

    // Description shown inside a playerChoice=true card
    const getPlayerChoiceDescription = (entry: ArchetypeSkill): string => {
        const rankLabel = entry.startingRanks === 1 ? '1 starting rank' : '2 starting ranks';
        const maxLabel = `max rank ${entry.maxRank} during character creation`;
        if (entry.requiredSkillType) return `Player chooses a ${entry.requiredSkillType} skill — ${rankLabel}, ${maxLabel}`;
        if (entry.nonCareer) return `Player chooses a non-career skill — ${rankLabel}, ${maxLabel}`;
        return `Player chooses any skill — ${rankLabel}, ${maxLabel}`;
    };

    // Respect requiredSkillType when offering skills in the autocomplete
    const getAvailableSkills = (entry: ArchetypeSkill): Skill[] =>
        entry.requiredSkillType ? skills.filter(s => s.type === entry.requiredSkillType) : skills;

    // True when the original condition template for this slot had playerChoice=true
    const slotWasOriginallyPlayerChoice = (index: number): boolean =>
        selectedCondition
            ? (getSkillsForCondition(selectedCondition)[index]?.playerChoice ?? false)
            : false;

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

                {/* ── Tab 0: Basic Information (unchanged) ── */}
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

                        {/* One card per skill slot — only rendered once a condition is chosen */}
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
                                                    {/* Revert toggle — only shown when this slot was originally a player-choice */}
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
