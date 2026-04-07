import * as React from 'react';
import {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    IconButton,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type {
    CheckContext,
    DefenseModifier,
    DiceModifier,
    ManeuverData,
    ResultsModifier,
    Skill,
    SkillType,
    Talent,
} from '../../../../../../api/model';
import {
    CheckContext as CheckContextEnum,
    CheckTarget,
    DefenseType,
    DiceType,
    ManeuverDuration,
    ManeuverTarget,
} from '../../../../../../api/model';
import {useFetchAllSkills} from '../../../../../../hooks/useFetchAllSkills.ts';
import SkillAutocompleteCard from '../../../../../common/card/SkillAutocompleteCard.tsx';
import GenesysNumberField from '../../../../common/field/GenesysNumberField.tsx';
import GenesysSelectField from '../../../../common/field/GenesysSelectField.tsx';
import GridContainer from '../../../../../common/grid/GridContainer.tsx';
import GridItem from '../../../../../common/grid/GridItem.tsx';

const emptyManeuverData = (): ManeuverData => ({
    target: ManeuverTarget.Self,
    duration: ManeuverDuration['End_of_Next_Turn'],
    stackable: false,
    maxTargets: 1,
    rangeScalesWithRank: false,
    diceModifiers: [],
    resultsModifiers: [],
    defenseModifiers: [],
});

const emptyDiceModifier = (): DiceModifier => ({
    diceType: DiceType.Boost,
    amount: 1,
    checkContext: CheckContextEnum.All,
    checkTarget: CheckTarget.Opponent,
});

const emptyResultsModifier = (): ResultsModifier => ({
    results: {success: 0, advantage: 1, triumph: 0, failure: 0, threat: 0, despair: 0},
    checkContext: CheckContextEnum.All,
    checkTarget: CheckTarget.Opponent,
});

const emptyDefenseModifier = (): DefenseModifier => ({
    defenseType: DefenseType.Melee,
    amount: 1,
    appliesTo: CheckTarget.Self,
});

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
}

const TalentManeuverTab: React.FC<Props> = ({talent, updateTalent}) => {
    const {skills} = useFetchAllSkills();
    const data: ManeuverData = talent.maneuverData ?? emptyManeuverData();
    const [useSkillForCount, setUseSkillForCount] = useState<boolean>(!!data.targetCountSkill);

    const patch = (updates: Partial<ManeuverData>) => {
        updateTalent({...talent, maneuverData: {...data, ...updates}});
    };

    // ── Dice modifiers ────────────────────────────────────────────────────────
    const updateDice = (idx: number, updates: Partial<DiceModifier>) => {
        const next = data.diceModifiers.map((m, i) => i === idx ? {...m, ...updates} : m);
        patch({diceModifiers: next});
    };
    const removeDice = (idx: number) => patch({diceModifiers: data.diceModifiers.filter((_, i) => i !== idx)});

    // ── Results modifiers ─────────────────────────────────────────────────────
    const updateResult = (idx: number, updates: Partial<ResultsModifier>) => {
        const next = data.resultsModifiers.map((m, i) => i === idx ? {...m, ...updates} : m);
        patch({resultsModifiers: next});
    };
    const removeResult = (idx: number) => patch({resultsModifiers: data.resultsModifiers.filter((_, i) => i !== idx)});

    // ── Defense modifiers ─────────────────────────────────────────────────────
    const updateDefense = (idx: number, updates: Partial<DefenseModifier>) => {
        const next = data.defenseModifiers.map((m, i) => i === idx ? {...m, ...updates} : m);
        patch({defenseModifiers: next});
    };
    const removeDefense = (idx: number) =>
        patch({defenseModifiers: data.defenseModifiers.filter((_, i) => i !== idx)});

    return (
        <Stack spacing={3}>
            {/* ── Core settings ─────────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <Typography variant="subtitle2"
                                sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>General</Typography>
                    <Stack spacing={2}>
                        <GridContainer spacing={2}>
                            <GridItem>
                                <GenesysSelectField value={data.target} label="Target" options={ManeuverTarget}
                                                    onChange={(v) => patch({target: v})}/>
                            </GridItem>
                            <GridItem>
                                <GenesysSelectField value={data.duration} label="Duration"
                                                    options={ManeuverDuration}
                                                    onChange={(v) => patch({duration: v})}/>
                            </GridItem>
                        </GridContainer>
                        <GridContainer spacing={2}>
                            <GridItem>
                                <FormControlLabel
                                    control={<Switch checked={data.stackable}
                                                     onChange={(e) => patch({stackable: e.target.checked})}/>}
                                    label="Stackable (multiple uses accumulate)"/>
                            </GridItem>
                            <GridItem>
                                <FormControlLabel
                                    control={<Switch checked={data.rangeScalesWithRank}
                                                     onChange={(e) => patch({rangeScalesWithRank: e.target.checked})}/>}
                                    label="Range scales with rank"/>
                            </GridItem>
                        </GridContainer>
                    </Stack>
                </CardContent>
            </Card>

            {/* ── Target count ──────────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <Typography variant="subtitle2"
                                sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>Target Count</Typography>
                    <Stack spacing={2}>
                        <FormControlLabel
                            control={
                                <Switch checked={useSkillForCount} onChange={(e) => {
                                    setUseSkillForCount(e.target.checked);
                                    if (!e.target.checked) patch({targetCountSkill: undefined});
                                }}/>
                            }
                            label="Count equals a skill's rank (e.g., Leadership for Coordinated Assault)"/>
                        {useSkillForCount ? (
                            <GridContainer spacing={2}>
                                <SkillAutocompleteCard
                                    title="Skill (rank = target count)"
                                    disabled={false}
                                    skills={skills}
                                    startingSkill={data.targetCountSkill as unknown as Skill}
                                    handleSkillChange={(v: Skill) =>
                                        patch({targetCountSkill: v as ManeuverData['targetCountSkill']})}
                                />
                            </GridContainer>
                        ) : (
                            <Box sx={{maxWidth: 200}}>
                                <GenesysNumberField value={data.maxTargets} label="Max Targets" min={1} max={99}
                                                    onChange={(v) => patch({maxTargets: v})}/>
                            </Box>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            {/* ── Dice modifiers ────────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <Typography variant="subtitle2"
                                sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>Dice Modifiers</Typography>
                    <Stack spacing={2} divider={<Divider/>}>
                        {data.diceModifiers.map((mod, idx) => (
                            <Stack key={idx} spacing={1}>
                                <GridContainer spacing={2}>
                                    <GridItem>
                                        <TextField select fullWidth label="Die Type" value={mod.diceType}
                                                   onChange={(e) => updateDice(idx, {diceType: e.target.value as DiceModifier['diceType']})}>
                                            {Object.values(DiceType).map((t) => (
                                                <MenuItem key={t} value={t}>{t}</MenuItem>))}
                                        </TextField>
                                    </GridItem>
                                    <GridItem>
                                        <GenesysNumberField value={mod.amount} label="Amount" min={1} max={10}
                                                            onChange={(v) => updateDice(idx, {amount: v})}/>
                                    </GridItem>
                                    <GridItem>
                                        <TextField select fullWidth label="Check Type" value={mod.checkContext}
                                                   onChange={(e) => updateDice(idx, {checkContext: e.target.value as CheckContext})}>
                                            {Object.values(CheckContextEnum).map((t) => (
                                                <MenuItem key={t} value={t}>{t}</MenuItem>))}
                                        </TextField>
                                    </GridItem>
                                    <GridItem>
                                        <TextField select fullWidth label="Applies To" value={mod.checkTarget}
                                                   onChange={(e) => updateDice(idx, {checkTarget: e.target.value as DiceModifier['checkTarget']})}>
                                            <MenuItem value={CheckTarget.Self}>Performer (Self)</MenuItem>
                                            <MenuItem value={CheckTarget.Opponent}>Target (Opponent)</MenuItem>
                                        </TextField>
                                    </GridItem>
                                    <GridItem>
                                        <TextField select fullWidth label="Skill Type (optional)"
                                                   value={mod.skillType ?? ''}
                                                   onChange={(e) => updateDice(idx, {skillType: e.target.value as SkillType || undefined})}>
                                            <MenuItem value="">— Any —</MenuItem>
                                            {['General', 'Magic', 'Combat', 'Social', 'Knowledge'].map((t) => (
                                                <MenuItem key={t} value={t}>{t}</MenuItem>))}
                                        </TextField>
                                    </GridItem>
                                    <GridItem sx={{display: 'flex', alignItems: 'center'}}>
                                        <IconButton color="error" onClick={() => removeDice(idx)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </GridItem>
                                </GridContainer>
                            </Stack>
                        ))}
                    </Stack>
                    <Button startIcon={<AddIcon/>} sx={{mt: 2}}
                            onClick={() => patch({diceModifiers: [...data.diceModifiers, emptyDiceModifier()]})}>
                        Add Dice Modifier
                    </Button>
                </CardContent>
            </Card>

            {/* ── Results modifiers ─────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <Typography variant="subtitle2"
                                sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>Results Modifiers
                        (Symbols)</Typography>
                    <Stack spacing={2} divider={<Divider/>}>
                        {data.resultsModifiers.map((mod, idx) => (
                            <Stack key={idx} spacing={1}>
                                <GridContainer spacing={2}>
                                    {(
                                        ['advantage', 'success', 'triumph', 'threat', 'failure', 'despair'] as const
                                    ).map((symbol) => (
                                        <GridItem key={symbol}>
                                            <GenesysNumberField
                                                value={mod.results[symbol] ?? 0}
                                                label={symbol.charAt(0).toUpperCase() + symbol.slice(1)}
                                                min={0} max={10}
                                                onChange={(v) =>
                                                    updateResult(idx, {results: {...mod.results, [symbol]: v}})}/>
                                        </GridItem>
                                    ))}
                                </GridContainer>
                                <GridContainer spacing={2}>
                                    <GridItem>
                                        <TextField select fullWidth label="Check Type" value={mod.checkContext}
                                                   onChange={(e) => updateResult(idx, {checkContext: e.target.value as CheckContext})}>
                                            {Object.values(CheckContextEnum).map((t) => (
                                                <MenuItem key={t} value={t}>{t}</MenuItem>))}
                                        </TextField>
                                    </GridItem>
                                    <GridItem>
                                        <TextField select fullWidth label="Applies To" value={mod.checkTarget}
                                                   onChange={(e) => updateResult(idx, {checkTarget: e.target.value as ResultsModifier['checkTarget']})}>
                                            <MenuItem value={CheckTarget.Self}>Performer (Self)</MenuItem>
                                            <MenuItem value={CheckTarget.Opponent}>Target (Opponent)</MenuItem>
                                        </TextField>
                                    </GridItem>
                                    <GridItem>
                                        <TextField select fullWidth label="Skill Type (optional)"
                                                   value={mod.skillType ?? ''}
                                                   onChange={(e) => updateResult(idx, {skillType: e.target.value as SkillType || undefined})}>
                                            <MenuItem value="">— Any —</MenuItem>
                                            {['General', 'Magic', 'Combat', 'Social', 'Knowledge'].map((t) => (
                                                <MenuItem key={t} value={t}>{t}</MenuItem>))}
                                        </TextField>
                                    </GridItem>
                                    <GridItem sx={{display: 'flex', alignItems: 'center'}}>
                                        <IconButton color="error" onClick={() => removeResult(idx)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </GridItem>
                                </GridContainer>
                            </Stack>
                        ))}
                    </Stack>
                    <Button startIcon={<AddIcon/>} sx={{mt: 2}}
                            onClick={() => patch({resultsModifiers: [...data.resultsModifiers, emptyResultsModifier()]})}>
                        Add Results Modifier
                    </Button>
                </CardContent>
            </Card>

            {/* ── Defense modifiers ─────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <Typography variant="subtitle2"
                                sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>Defense
                        Modifiers</Typography>
                    <Stack spacing={2} divider={<Divider/>}>
                        {data.defenseModifiers.map((mod, idx) => (
                            <GridContainer key={idx} spacing={2}>
                                <GridItem>
                                    <TextField select fullWidth label="Defense Type" value={mod.defenseType}
                                               onChange={(e) => updateDefense(idx, {defenseType: e.target.value as DefenseModifier['defenseType']})}>
                                        {Object.values(DefenseType).map((t) => (
                                            <MenuItem key={t} value={t}>{t}</MenuItem>))}
                                    </TextField>
                                </GridItem>
                                <GridItem>
                                    <GenesysNumberField value={mod.amount} label="Amount" min={-5} max={5}
                                                        onChange={(v) => updateDefense(idx, {amount: v})}/>
                                </GridItem>
                                <GridItem>
                                    <TextField select fullWidth label="Applies To" value={mod.appliesTo}
                                               onChange={(e) => updateDefense(idx, {appliesTo: e.target.value as DefenseModifier['appliesTo']})}>
                                        <MenuItem value={CheckTarget.Self}>Performer (Self)</MenuItem>
                                        <MenuItem value={CheckTarget.Opponent}>Target (Opponent)</MenuItem>
                                    </TextField>
                                </GridItem>
                                <GridItem sx={{display: 'flex', alignItems: 'center'}}>
                                    <IconButton color="error" onClick={() => removeDefense(idx)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </GridItem>
                            </GridContainer>
                        ))}
                    </Stack>
                    <Button startIcon={<AddIcon/>} sx={{mt: 2}}
                            onClick={() => patch({defenseModifiers: [...data.defenseModifiers, emptyDefenseModifier()]})}>
                        Add Defense Modifier
                    </Button>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default TalentManeuverTab;
