import React, {useState} from "react";
import {Box, Paper, Typography, Button, Grid, Card, CardContent, Chip, LinearProgress, IconButton, Alert, Select, MenuItem, FormControl, InputLabel, Drawer, List, ListItem, ListItemText, Divider} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import StopIcon from "@mui/icons-material/Stop";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import {InitiativeSlotType, StatusEffectType} from "../../../../../api/model";
import type {Action, Maneuver, StatusEffect, RangeBand} from "../../../../../api/model";
import type {TurnAction, CombatLogEntry, EncounterRangeBand} from "../../test/TestEncounter.tsx";
import type {EncounterState2, EncounterParticipant} from "../EncounterManager2.tsx";
import {isDefeated, getParticipantLabel, STATUS_EFFECT_META} from "../EncounterManager2.tsx";
import {TurnActions2} from "./TurnActions2.tsx";
import {RangeTracker2} from "./RangeTracker2.tsx";
import {StatusEffectsManager2} from "./StatusEffectsManager2.tsx";
interface Props {
    encounter: EncounterState2;
    availableActions: Action[];
    availableManeuvers: Maneuver[];
    availableStatusEffects: StatusEffect[];
    onUpdateParticipant: (id: string, updates: Partial<EncounterParticipant>) => void;
    onAssignSlot: (slotId: string, participantId: string | null) => void;
    onRecordTurnAction: (t: TurnAction) => void;
    onUpdateRange: (from: string, to: string, range: RangeBand) => void;
    onNextSlot: () => void;
    onPreviousSlot: () => void;
    onAddLogEntry: (entry: Omit<CombatLogEntry, "id" | "timestamp">) => void;
    onEndEncounter: () => void;
}
export const EncounterActive2: React.FC<Props> = ({encounter, availableActions, availableManeuvers, availableStatusEffects, onUpdateParticipant, onAssignSlot, onRecordTurnAction, onUpdateRange, onNextSlot, onPreviousSlot, onAddLogEntry, onEndEncounter}) => {
    const [logOpen, setLogOpen] = useState(false);
    const [rangeOpen, setRangeOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [statusTarget, setStatusTarget] = useState<string | null>(null);
    const currentSlot = encounter.slots[encounter.currentSlotIndex];
    const currentParticipant = currentSlot?.assignedParticipantId
        ? encounter.participants.find(p => p.data.id === currentSlot.assignedParticipantId) ?? null
        : null;
    const handleWound = (ep: EncounterParticipant, delta: number) => {
        const next = Math.max(0, Math.min(ep.data.derivedStats.woundThreshold.total, ep.woundsCurrent + delta));
        onUpdateParticipant(ep.data.id, {woundsCurrent: next});
        onAddLogEntry({round: encounter.currentRound, participantId: ep.data.id, participantName: ep.data.name,
            action: delta > 0 ? "Damage Taken" : "Healing", details: delta > 0 ? `Suffered ${delta} wounds` : `Recovered ${Math.abs(delta)} wounds`});
    };
    const handleStrain = (ep: EncounterParticipant, delta: number) => {
        const next = Math.max(0, Math.min(ep.data.derivedStats.strainThreshold.total, ep.strainCurrent + delta));
        onUpdateParticipant(ep.data.id, {strainCurrent: next});
        onAddLogEntry({round: encounter.currentRound, participantId: ep.data.id, participantName: ep.data.name,
            action: delta > 0 ? "Strain Taken" : "Strain Recovered", details: delta > 0 ? `Suffered ${delta} strain` : `Recovered ${Math.abs(delta)} strain`});
    };
    const handleAssign = (slotId: string, participantId: string | null) => {
        onAssignSlot(slotId, participantId);
        if (participantId) {
            const p = encounter.participants.find(ep => ep.data.id === participantId);
            if (p) onAddLogEntry({round: encounter.currentRound, participantId, participantName: p.data.name, action: "Turn Started", details: `Acting in slot #${encounter.currentSlotIndex + 1}`});
        }
    };
    const handleCompleteTurn = (t: TurnAction) => {
        onRecordTurnAction(t);
        if (t.strainSpentForManeuver > 0 && currentParticipant) {
            const next = Math.min(currentParticipant.data.derivedStats.strainThreshold.total, currentParticipant.strainCurrent + t.strainSpentForManeuver);
            onUpdateParticipant(currentParticipant.data.id, {strainCurrent: next});
        }
        if (currentParticipant) onAddLogEntry({round: encounter.currentRound, participantId: currentParticipant.data.id, participantName: currentParticipant.data.name, action: "Turn Ended"});
        onNextSlot();
    };
    const handleSkipTurn = () => {
        if (currentParticipant) onAddLogEntry({round: encounter.currentRound, participantId: currentParticipant.data.id, participantName: currentParticipant.data.name, action: "Turn Skipped"});
        onNextSlot();
    };
    const handleAddStatusEffect = (participantId: string, type: typeof StatusEffectType[keyof typeof StatusEffectType], rounds: number) => {
        const ep = encounter.participants.find(p => p.data.id === participantId);
        if (!ep) return;
        const newEffect = {id: `eff-${Date.now()}`, type, rounds, appliedRound: encounter.currentRound};
        onUpdateParticipant(participantId, {activeStatusEffects: [...ep.activeStatusEffects, newEffect]});
        onAddLogEntry({round: encounter.currentRound, participantId, participantName: ep.data.name, action: `Status Applied: ${STATUS_EFFECT_META[type].label}`});
    };
    const handleRemoveStatusEffect = (participantId: string, effectId: string) => {
        const ep = encounter.participants.find(p => p.data.id === participantId);
        if (!ep) return;
        const effect = ep.activeStatusEffects.find(e => e.id === effectId);
        onUpdateParticipant(participantId, {activeStatusEffects: ep.activeStatusEffects.filter(e => e.id !== effectId)});
        if (effect) onAddLogEntry({round: encounter.currentRound, participantId, participantName: ep.data.name, action: `Status Removed: ${STATUS_EFFECT_META[effect.type].label}`});
    };
    const availableForSlot = encounter.participants.filter(p => p.participantType === currentSlot?.type);
    const pcSlots = encounter.slots.filter(s => s.type === InitiativeSlotType.Player);
    const npcSlots = encounter.slots.filter(s => s.type === InitiativeSlotType.NPC);
    return (
        <Box>
            {/* Header */}
            <Paper sx={{p: 2, mb: 3}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2}}>
                    <Typography variant="h5" fontWeight="bold">{encounter.name}</Typography>
                    <Chip label={`Round ${encounter.currentRound}`} color="primary" sx={{fontSize: "1.2rem", fontWeight: "bold", px: 2}}/>
                    <Box sx={{display: "flex", gap: 1}}>
                        <Button variant="outlined" color="primary" startIcon={<SettingsIcon/>} onClick={() => setRangeOpen(true)}>Range</Button>
                        <Button variant="outlined" color="secondary" startIcon={<HistoryIcon/>} onClick={() => setLogOpen(true)}>Log</Button>
                        <Button variant="outlined" color="error" startIcon={<StopIcon/>} onClick={onEndEncounter}>End</Button>
                    </Box>
                </Box>
            </Paper>
            {/* Current slot */}
            <Paper sx={{p: 3, mb: 3}}>
                <Typography variant="h6" gutterBottom>Current Slot: #{encounter.currentSlotIndex + 1}</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{xs: 12, md: 4}} sx={{mt: 2}}>
                        <Paper sx={{p: 2, backgroundColor: currentSlot?.type === InitiativeSlotType.Player ? "primary.light" : "error.light"}}>
                            <Typography variant="body2" color="text.secondary">Slot Type</Typography>
                            <Typography variant="h5" fontWeight="bold">{currentSlot?.type === InitiativeSlotType.Player ? "PLAYER SLOT" : "NPC SLOT"}</Typography>
                            <Typography variant="body2">{currentSlot?.results.success}S &nbsp; {currentSlot?.results.advantage}A</Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{xs: 12, md: 5}} sx={{mt: 2}}>
                        <FormControl fullWidth>
                            <InputLabel>Assign Participant</InputLabel>
                            <Select value={currentSlot?.assignedParticipantId || ""} onChange={e => handleAssign(currentSlot?.id || "", e.target.value || null)} label="Assign Participant">
                                <MenuItem value=""><em>None (Skip Slot)</em></MenuItem>
                                {availableForSlot.map(ep => (
                                    <MenuItem key={ep.data.id} value={ep.data.id} disabled={isDefeated(ep)}>
                                        {ep.data.name} — Wounds: {ep.woundsCurrent}/{ep.data.derivedStats.woundThreshold.total}{isDefeated(ep) ? " (DEFEATED)" : ""}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, md: 3}} sx={{mt: 2}}>
                        {currentParticipant ? (
                            <Alert severity="success"><Typography variant="body2" fontWeight="bold">{currentParticipant.data.name} is acting</Typography></Alert>
                        ) : (
                            <Alert severity="warning"><Typography variant="body2">No one assigned to this slot</Typography></Alert>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            {/* Turn actions */}
            {currentParticipant && (
                <TurnActions2
                    currentParticipant={currentParticipant}
                    slotId={currentSlot.id}
                    round={encounter.currentRound}
                    availableActions={availableActions}
                    availableManeuvers={availableManeuvers}
                    onComplete={handleCompleteTurn}
                    onSkip={handleSkipTurn}
                />
            )}
            {/* Navigation */}
            <Paper sx={{p: 2, mb: 3}}>
                <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
                    <Button variant="outlined" startIcon={<NavigateBeforeIcon/>} onClick={onPreviousSlot} disabled={encounter.currentSlotIndex === 0}>Previous</Button>
                    <Button variant="contained" endIcon={<NavigateNextIcon/>} onClick={() => { if (currentParticipant) onAddLogEntry({round: encounter.currentRound, participantId: currentParticipant.data.id, participantName: currentParticipant.data.name, action: "Turn Ended"}); onNextSlot(); }} size="large">
                        {encounter.currentSlotIndex === encounter.slots.length - 1 ? "Start Next Round" : "Next Slot"}
                    </Button>
                </Box>
            </Paper>
            <Grid container spacing={3}>
                {/* Initiative order sidebar */}
                <Grid size={{xs: 12, md: 4}} sx={{mt: 2}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>Initiative Order</Typography>
                        <List dense>
                            {encounter.slots.map((slot, idx) => {
                                const assigned = slot.assignedParticipantId ? encounter.participants.find(p => p.data.id === slot.assignedParticipantId) : null;
                                const isCurrent = idx === encounter.currentSlotIndex;
                                return (
                                    <ListItem key={slot.id} sx={{border: isCurrent ? 2 : 1, borderColor: isCurrent ? "primary.main" : "divider", backgroundColor: isCurrent ? "primary.light" : slot.type === InitiativeSlotType.Player ? "rgba(25,118,210,0.08)" : "rgba(211,47,47,0.08)", borderRadius: 1, mb: 0.5}}>
                                        <ListItemText
                                            primary={<Box sx={{display: "flex", alignItems: "center", gap: 1}}><Typography variant="body2" fontWeight="bold">#{idx + 1}</Typography><Chip label={slot.type} size="small" color={slot.type === InitiativeSlotType.Player ? "primary" : "error"}/></Box>}
                                            secondary={assigned ? assigned.data.name : "Unassigned"}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Typography variant="caption" color="text.secondary">Player Slots: {pcSlots.length} | NPC Slots: {npcSlots.length}</Typography>
                    </Paper>
                </Grid>
                {/* Participant cards */}
                <Grid size={{xs: 12, md: 8}} sx={{mt: 2}}>
                    <Typography variant="h6" gutterBottom>Participants</Typography>
                    <Grid container spacing={2}>
                        {encounter.participants.map(ep => {
                            const wPct = (ep.woundsCurrent / ep.data.derivedStats.woundThreshold.total) * 100;
                            const sPct = (ep.strainCurrent / ep.data.derivedStats.strainThreshold.total) * 100;
                            const defeated = isDefeated(ep);
                            return (
                                <Grid key={ep.data.id} size={{xs: 12, lg: 6}} sx={{mt: 2}}>
                                    <Card sx={{opacity: defeated ? 0.6 : 1, backgroundColor: ep.participantType === InitiativeSlotType.Player ? "rgba(25,118,210,0.05)" : "rgba(211,47,47,0.05)"}}>
                                        <CardContent>
                                            <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                                                <Box>
                                                    <Typography variant="h6">{ep.data.name}</Typography>
                                                    <Chip label={getParticipantLabel(ep)} size="small" color={ep.participantType === InitiativeSlotType.Player ? "primary" : "default"}/>
                                                </Box>
                                                <Button size="small" variant="outlined" onClick={() => { setStatusTarget(ep.data.id); setStatusOpen(true); }}>Status</Button>
                                            </Box>
                                            {defeated && <Alert severity="error" sx={{mb: 2}}>DEFEATED</Alert>}
                                            {ep.activeStatusEffects.length > 0 && (
                                                <Box sx={{mb: 2, display: "flex", gap: 0.5, flexWrap: "wrap"}}>
                                                    {ep.activeStatusEffects.map(e => (
                                                        <Chip key={e.id} label={`${STATUS_EFFECT_META[e.type].icon} ${STATUS_EFFECT_META[e.type].label}`} size="small"
                                                              onDelete={() => handleRemoveStatusEffect(ep.data.id, e.id)} color="warning"/>
                                                    ))}
                                                </Box>
                                            )}
                                            {/* Wounds */}
                                            <Box sx={{mb: 2}}>
                                                <Box sx={{display: "flex", justifyContent: "space-between", mb: 0.5}}>
                                                    <Typography variant="body2">Wounds</Typography>
                                                    <Typography variant="body2" fontWeight="bold">{ep.woundsCurrent} / {ep.data.derivedStats.woundThreshold.total}</Typography>
                                                </Box>
                                                <LinearProgress variant="determinate" value={wPct} sx={{height: 10, borderRadius: 5, "& .MuiLinearProgress-bar": {backgroundColor: wPct > 75 ? "error.main" : wPct > 50 ? "warning.main" : "success.main"}}}/>
                                                <Box sx={{display: "flex", gap: 1, mt: 1}}>
                                                    <IconButton size="small" color="error" onClick={() => handleWound(ep, 1)}><AddCircleIcon/></IconButton>
                                                    <IconButton size="small" color="success" onClick={() => handleWound(ep, -1)} disabled={ep.woundsCurrent === 0}><RemoveCircleIcon/></IconButton>
                                                </Box>
                                            </Box>
                                            {/* Strain */}
                                            <Box sx={{mb: 2}}>
                                                <Box sx={{display: "flex", justifyContent: "space-between", mb: 0.5}}>
                                                    <Typography variant="body2">Strain</Typography>
                                                    <Typography variant="body2" fontWeight="bold">{ep.strainCurrent} / {ep.data.derivedStats.strainThreshold.total}</Typography>
                                                </Box>
                                                <LinearProgress variant="determinate" value={sPct} sx={{height: 10, borderRadius: 5, backgroundColor: "grey.300", "& .MuiLinearProgress-bar": {backgroundColor: "info.main"}}}/>
                                                <Box sx={{display: "flex", gap: 1, mt: 1}}>
                                                    <IconButton size="small" color="error" onClick={() => handleStrain(ep, 1)}><AddCircleIcon/></IconButton>
                                                    <IconButton size="small" color="success" onClick={() => handleStrain(ep, -1)} disabled={ep.strainCurrent === 0}><RemoveCircleIcon/></IconButton>
                                                </Box>
                                            </Box>
                                            {/* Defense / Soak stat chips */}
                                            <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                                                <Chip label={`Soak: ${ep.data.derivedStats.soak.current}`} size="small"/>
                                                <Chip label={`Defense: ${ep.data.derivedStats.defense.current}`} size="small"/>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            {/* Combat Log Drawer */}
            <Drawer anchor="right" open={logOpen} onClose={() => setLogOpen(false)}>
                <Box sx={{width: 400, p: 2}}>
                    <Typography variant="h6" gutterBottom>Combat Log</Typography>
                    <List>
                        {encounter.combatLog.map((entry, idx) => (
                            <React.Fragment key={entry.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={<Box><Chip label={`Round ${entry.round}`} size="small" sx={{mr: 1}}/><Typography component="span" variant="body2" fontWeight="bold">{entry.participantName}</Typography></Box>}
                                        secondary={<Box><Typography variant="body2" color="text.primary">{entry.action}</Typography>{entry.details && <Typography variant="caption" color="text.secondary">{entry.details}</Typography>}<Typography variant="caption" color="text.secondary" display="block">{entry.timestamp.toLocaleTimeString()}</Typography></Box>}
                                    />
                                </ListItem>
                                {idx < encounter.combatLog.length - 1 && <Divider/>}
                            </React.Fragment>
                        ))}
                    </List>
                    {encounter.combatLog.length === 0 && <Alert severity="info">No combat log entries yet</Alert>}
                </Box>
            </Drawer>
            {/* Status effects manager */}
            {statusTarget && (
                <StatusEffectsManager2
                    open={statusOpen}
                    participant={encounter.participants.find(p => p.data.id === statusTarget)!}
                    onClose={() => { setStatusOpen(false); setStatusTarget(null); }}
                    onAddEffect={(type, rounds) => handleAddStatusEffect(statusTarget, type, rounds)}
                    onRemoveEffect={effectId => handleRemoveStatusEffect(statusTarget, effectId)}
                />
            )}
            {/* Range tracker */}
            <RangeTracker2
                open={rangeOpen}
                participants={encounter.participants}
                rangeBands={encounter.rangeBands}
                onClose={() => setRangeOpen(false)}
                onUpdateRange={onUpdateRange}
            />
        </Box>
    );
};
