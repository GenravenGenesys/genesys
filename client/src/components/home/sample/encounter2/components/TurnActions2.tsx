import React, {useState} from "react";
import {Paper, Typography, Box, Button, Grid, Card, CardContent, Chip, TextField, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CasinoIcon from "@mui/icons-material/Casino";
import {ActionType, StatusEffectType} from "../../../../../api/model";
import type {Action, Maneuver, GenesysSymbolResults} from "../../../../../api/model";
import type {TurnAction} from "../../test/TestEncounter.tsx";
import type {EncounterParticipant} from "../EncounterManager2.tsx";
import {STATUS_EFFECT_META} from "../EncounterManager2.tsx";
import {DiceRoller2} from "./DiceRoller2.tsx";
const actionRequiresDice = (a: Action) =>
    [ActionType.Combat_Check, ActionType.Skill_Check, ActionType.Cast_a_Spell].includes(a.type as any);
const actionLabel = (a: Action) => a.type;
const maneuverLabel = (m: Maneuver) => `${m.target} (${m.duration})`;
interface Props {
    currentParticipant: EncounterParticipant;
    slotId: string;
    round: number;
    availableActions: Action[];
    availableManeuvers: Maneuver[];
    onComplete: (t: TurnAction) => void;
    onSkip: () => void;
}
export const TurnActions2: React.FC<Props> = ({currentParticipant, slotId, round, availableActions, availableManeuvers, onComplete, onSkip}) => {
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const [actionDetails, setActionDetails] = useState("");
    const [selectedManeuvers, setSelectedManeuvers] = useState<Maneuver[]>([]);
    const [maneuverDetails, setManeuverDetails] = useState<Record<number, string>>({});
    const [strainForManeuver, setStrainForManeuver] = useState(0);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [maneuverDialogOpen, setManeuverDialogOpen] = useState(false);
    const [diceRollerOpen, setDiceRollerOpen] = useState(false);
    const [diceResult, setDiceResult] = useState<GenesysSymbolResults | null>(null);
    const isStaggered = currentParticipant.activeStatusEffects.some(e => e.type === StatusEffectType.Staggered);
    const isImmobilized = currentParticipant.activeStatusEffects.some(e => e.type === StatusEffectType.Immobilized);
    const handleSelectAction = (a: Action) => {
        setSelectedAction(a);
        setActionDialogOpen(false);
        if (actionRequiresDice(a)) setDiceRollerOpen(true);
    };
    const handleDiceRolled = (r: GenesysSymbolResults) => {
        setDiceResult(r);
        setDiceRollerOpen(false);
    };
    const handleAddManeuver = (m: Maneuver) => {
        if (selectedManeuvers.length < 2) {
            setSelectedManeuvers(prev => {
                const next = [...prev, m];
                if (next.length === 2) setStrainForManeuver(2);
                return next;
            });
        }
        setManeuverDialogOpen(false);
    };
    const handleRemoveManeuver = (idx: number) => {
        setSelectedManeuvers(prev => {
            const next = prev.filter((_, i) => i !== idx);
            if (next.length < 2) setStrainForManeuver(0);
            return next;
        });
    };
    const handleComplete = () => {
        const t: TurnAction = {
            id: `turn-${Date.now()}`,
            slotId,
            round,
            participantId: currentParticipant.data.id,
            participantType: currentParticipant.participantType,
            actionTaken: selectedAction ? {action: selectedAction, details: actionDetails || undefined, diceResult: diceResult || undefined} : undefined,
            maneuversTaken: selectedManeuvers.map((m, idx) => ({maneuver: m, details: maneuverDetails[idx] || undefined})),
            strainSpentForManeuver: strainForManeuver,
        };
        onComplete(t);
    };
    const hasActivity = selectedAction !== null || selectedManeuvers.length > 0;
    const canAddManeuver = selectedManeuvers.length < 2;
    // Group actions by type category
    const combatActions = availableActions.filter(a => [ActionType.Combat_Check].includes(a.type as any));
    const skillActions = availableActions.filter(a => [ActionType.Skill_Check, ActionType.Cast_a_Spell].includes(a.type as any));
    const otherActions = availableActions.filter(a => ![ActionType.Combat_Check, ActionType.Skill_Check, ActionType.Cast_a_Spell].includes(a.type as any));
    return (
        <Paper sx={{p: 3, mb: 3}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2}}>
                <Typography variant="h6">{currentParticipant.data.name}'s Turn</Typography>
                <Chip label={`Round ${round}`} color="primary" sx={{fontWeight: "bold"}}/>
            </Box>
            {currentParticipant.activeStatusEffects.map(e => (
                <Alert key={e.id} severity="warning" sx={{mb: 1}}>
                    <strong>{STATUS_EFFECT_META[e.type].label}:</strong> {STATUS_EFFECT_META[e.type].description}
                </Alert>
            ))}
            {!isStaggered && (
                <Alert severity="info" sx={{mb: 2}}>
                    Each turn you get <strong>1 Action</strong> and <strong>1 Maneuver</strong>. A second maneuver costs 2 strain.
                </Alert>
            )}
            <Grid container spacing={2}>
                {!isStaggered && (
                    <Grid size={{xs: 12, md: 6}} sx={{mt: 2}}>
                        <Card variant="outlined" sx={{height: "100%"}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">Action</Typography>
                                {selectedAction ? (
                                    <Box>
                                        <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                                            <Box>
                                                <Typography variant="body1" fontWeight="bold">{actionLabel(selectedAction)}</Typography>
                                                <Chip label={`Target: ${selectedAction.target}`} size="small" sx={{mt: 0.5, mr: 0.5}}/>
                                                {selectedAction.range && <Chip label={`Range: ${selectedAction.range}`} size="small" sx={{mt: 0.5}}/>}
                                            </Box>
                                            <IconButton size="small" onClick={() => { setSelectedAction(null); setActionDetails(""); setDiceResult(null); }}><ClearIcon/></IconButton>
                                        </Box>
                                        {diceResult && (
                                            <Alert severity={diceResult.success + diceResult.triumph > diceResult.failure + diceResult.despair ? "success" : "error"} sx={{mt: 1, mb: 1}}>
                                                <Typography variant="body2" fontWeight="bold">Net Success: {diceResult.success + diceResult.triumph - diceResult.failure - diceResult.despair} | Net Adv: {diceResult.advantage - diceResult.threat}</Typography>
                                            </Alert>
                                        )}
                                        <TextField fullWidth size="small" label="Additional Details (optional)" value={actionDetails}
                                                   onChange={e => setActionDetails(e.target.value)} placeholder="e.g., Target: Stormtrooper" sx={{mt: 1}}/>
                                        {actionRequiresDice(selectedAction) && (
                                            <Button fullWidth variant="outlined" startIcon={<CasinoIcon/>} onClick={() => setDiceRollerOpen(true)} sx={{mt: 1}}>
                                                {diceResult ? "Reroll Dice" : "Roll Dice"}
                                            </Button>
                                        )}
                                    </Box>
                                ) : (
                                    <Box sx={{textAlign: "center", py: 3}}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>No action selected</Typography>
                                        <Button variant="contained" startIcon={<AddCircleOutlineIcon/>} onClick={() => setActionDialogOpen(true)}>Select Action</Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                <Grid size={{xs: 12, md: isStaggered ? 12 : 6}} sx={{mt: 2}}>
                    <Card variant="outlined" sx={{height: "100%"}}>
                        <CardContent>
                            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2}}>
                                <Typography variant="h6" color="secondary">Maneuvers ({selectedManeuvers.length}/2)</Typography>
                                {strainForManeuver > 0 && <Chip label={`-${strainForManeuver} Strain`} color="warning" size="small"/>}
                            </Box>
                            {selectedManeuvers.length === 0 ? (
                                <Box sx={{textAlign: "center", py: 3}}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>No maneuvers selected</Typography>
                                    <Button variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon/>} onClick={() => setManeuverDialogOpen(true)}>Add Maneuver</Button>
                                </Box>
                            ) : (
                                <Box>
                                    {selectedManeuvers.map((m, idx) => (
                                        <Box key={idx} sx={{mb: 2}}>
                                            <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                                                <Box sx={{flexGrow: 1}}>
                                                    <Typography variant="body1" fontWeight="bold">{idx + 1}. {maneuverLabel(m)}</Typography>
                                                    <Typography variant="body2" color="text.secondary">Duration: {m.duration}</Typography>
                                                </Box>
                                                <IconButton size="small" onClick={() => handleRemoveManeuver(idx)}><ClearIcon/></IconButton>
                                            </Box>
                                            <TextField fullWidth size="small" label="Details (optional)"
                                                       value={maneuverDetails[idx] || ""} placeholder="e.g., Move to Long range"
                                                       onChange={e => setManeuverDetails(prev => ({...prev, [idx]: e.target.value}))}/>
                                        </Box>
                                    ))}
                                    {canAddManeuver && (
                                        <>
                                            <Divider sx={{my: 2}}/>
                                            <Button fullWidth variant="outlined" color="secondary" startIcon={<AddCircleOutlineIcon/>} onClick={() => setManeuverDialogOpen(true)}>
                                                Add Second Maneuver (-2 Strain)
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{display: "flex", justifyContent: "space-between", mt: 3}}>
                <Button variant="outlined" onClick={onSkip}>Skip Turn</Button>
                <Button variant="contained" size="large" startIcon={<CheckCircleIcon/>} onClick={handleComplete} disabled={!hasActivity}>Complete Turn</Button>
            </Box>
            {/* Action selection dialog */}
            <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Select Action</DialogTitle>
                <DialogContent>
                    {[{label: "Combat", items: combatActions}, {label: "Skill / Spell", items: skillActions}, {label: "Other", items: otherActions}].map(group => group.items.length > 0 && (
                        <Box key={group.label} sx={{mb: 3}}>
                            <Typography variant="h6" gutterBottom>{group.label} Actions</Typography>
                            <Grid container spacing={1}>
                                {group.items.map((a, i) => (
                                    <Grid key={i} size={{xs: 12, sm: 6}} sx={{mt: 1}}>
                                        <Card sx={{cursor: "pointer", "&:hover": {backgroundColor: "action.hover"}}} onClick={() => handleSelectAction(a)}>
                                            <CardContent>
                                                <Typography variant="body1" fontWeight="bold">{actionLabel(a)}</Typography>
                                                <Box sx={{mt: 0.5, display: "flex", gap: 0.5, flexWrap: "wrap"}}>
                                                    <Chip label={`Target: ${a.target}`} size="small"/>
                                                    {a.range && <Chip label={`Max: ${a.range}`} size="small"/>}
                                                    {a.opposed && <Chip label="Opposed" size="small" color="warning"/>}
                                                    {actionRequiresDice(a) && <Chip label="Requires Roll" size="small" icon={<CasinoIcon/>}/>}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions><Button onClick={() => setActionDialogOpen(false)}>Cancel</Button></DialogActions>
            </Dialog>
            {/* Maneuver selection dialog */}
            <Dialog open={maneuverDialogOpen} onClose={() => setManeuverDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Add Maneuver</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        {availableManeuvers.map((m, i) => {
                            const blocked = isImmobilized && m.target === "Self";
                            return (
                                <Grid key={i} size={{xs: 12, sm: 6}} sx={{mt: 2}}>
                                    <Card sx={{cursor: blocked ? "not-allowed" : "pointer", opacity: blocked ? 0.5 : 1, "&:hover": {backgroundColor: blocked ? "inherit" : "action.hover"}}}
                                          onClick={() => !blocked && handleAddManeuver(m)}>
                                        <CardContent>
                                            <Typography variant="body1" fontWeight="bold">{maneuverLabel(m)}{blocked ? " (Blocked)" : ""}</Typography>
                                            <Chip label={`Duration: ${m.duration}`} size="small" sx={{mt: 0.5}}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions><Button onClick={() => setManeuverDialogOpen(false)}>Cancel</Button></DialogActions>
            </Dialog>
            {diceRollerOpen && selectedAction && (
                <DiceRoller2 open={diceRollerOpen} participantName={currentParticipant.data.name} rollType="action"
                             onClose={() => setDiceRollerOpen(false)} onRollComplete={handleDiceRolled}/>
            )}
        </Paper>
    );
};
