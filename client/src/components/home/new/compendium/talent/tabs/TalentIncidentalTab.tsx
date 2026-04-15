import * as React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import type {HealEffect, Incidental, Talent} from '../../../../../../api/model';
import {HealSource, HealTarget} from '../../../../../../api/model';
import GenesysSelectField from '../../../../common/field/GenesysSelectField.tsx';
import GenesysNumberField from '../../../../common/field/GenesysNumberField.tsx';
import GridContainer from '../../../../../common/grid/GridContainer.tsx';
import DiceModifierAccordion from '../../common/DiceModifierAccordion.tsx';
import ResultsModifierAccordion from '../../common/ResultsModifierAccordion.tsx';
import CostLimitAccordion from '../../common/CostLimitAccordion.tsx';
import DerivedStatsAccordion from '../../common/DerivedStatsAccordion.tsx';
import {emptyIncidental} from '../../../../../../models/Template.ts';

const defaultHealEffect = (): HealEffect => ({
    target: HealTarget.Strain,
    source: HealSource.Fixed,
    amount: 0,
});

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    field: 'incidental' | 'incidentalOutOfTurn' | 'passive';
}

const TalentIncidentalTab: React.FC<Props> = ({talent, updateTalent, field}) => {
    const data: Incidental = talent[field] ?? emptyIncidental;

    const patch = (updates: Partial<Incidental>) => {
        updateTalent({...talent, [field]: {...data, ...updates}});
    };

    // ── Heal Effects ──────────────────────────────────────────────────────────
    const updateHealEffect = (index: number, updated: HealEffect) => {
        patch({healEffects: data.healEffects.map((m, i) => (i === index ? updated : m))});
    };

    const addHealEffect = () => {
        patch({healEffects: [...data.healEffects, defaultHealEffect()]});
    };

    const removeHealEffect = (index: number) => {
        patch({healEffects: data.healEffects.filter((_, i) => i !== index)});
    };

    return (
        <Stack spacing={3}>
            {/* ── Talent-level Stats ────────────────────────────────────────── */}
            <CostLimitAccordion
                cost={talent.cost}
                limit={talent.limit}
                onCostChange={(updated) => updateTalent({...talent, cost: updated})}
                onLimitChange={(updated) => updateTalent({...talent, limit: updated})}
            />
            <DerivedStatsAccordion
                statModifiers={talent.statModifiers}
                updateStatModifiers={(updated) => updateTalent({...talent, statModifiers: updated})}
            />
            <DiceModifierAccordion
                modifiers={talent.diceModifiers}
                onChange={(updated) => updateTalent({...talent, diceModifiers: updated})}
            />

            {/* ── Heal Effects ──────────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <Typography variant="subtitle2" sx={{mb: 2, fontWeight: 'bold', color: 'primary.main'}}>
                        Heal Effects
                    </Typography>
                    <Stack spacing={2}>
                        {data.healEffects.map((mod, index) => (
                            <Accordion key={index} disableGutters sx={{bgcolor: 'background.paper'}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Box sx={{display: 'flex', alignItems: 'center', width: '100%', gap: 1}}>
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
                                                    target: v as HealEffect['target'],
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
                                                    source: v as HealEffect['source'],
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
                    </Stack>
                    <Box sx={{mt: 2}}>
                        <IconButton color="primary" onClick={addHealEffect} size="small">
                            <AddIcon fontSize="small"/>
                        </IconButton>
                        <Typography variant="caption" color="text.secondary" sx={{ml: 1}}>
                            Add Heal Effect
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* ── Dice Modifiers ────────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <DiceModifierAccordion
                        modifiers={data.diceModifiers}
                        onChange={(updated) => patch({diceModifiers: updated})}
                    />
                </CardContent>
            </Card>

            {/* ── Results Modifiers ─────────────────────────────────────────── */}
            <Card>
                <CardContent>
                    <ResultsModifierAccordion
                        modifiers={data.resultsModifiers}
                        onChange={(updated) => patch({resultsModifiers: updated})}
                    />
                </CardContent>
            </Card>
        </Stack>
    );
};

export default TalentIncidentalTab;
