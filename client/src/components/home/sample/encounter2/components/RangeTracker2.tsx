import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Chip, Alert, Paper, Divider} from "@mui/material";
import {RangeBand} from "../../../../../api/model";
import type {EncounterParticipant, EncounterState2} from "../EncounterManager2.tsx";
import type {EncounterRangeBand} from "../../test/TestEncounter.tsx";
import {InitiativeSlotType} from "../../../../../api/model";
const RANGE_META: {value: RangeBand; label: string; description: string; color: string}[] = [
    {value: RangeBand.Engaged, label: "Engaged", description: "In melee range", color: "#d32f2f"},
    {value: RangeBand.Short, label: "Short", description: "Up to several meters", color: "#f57c00"},
    {value: RangeBand.Medium, label: "Medium", description: "Several meters to several dozen", color: "#fbc02d"},
    {value: RangeBand.Long, label: "Long", description: "Several dozen to several hundred meters", color: "#388e3c"},
    {value: RangeBand.Extreme, label: "Extreme", description: "Several hundred meters+", color: "#1976d2"},
];
interface Props {
    open: boolean;
    participants: EncounterParticipant[];
    rangeBands: EncounterRangeBand[];
    onClose: () => void;
    onUpdateRange: (from: string, to: string, range: RangeBand) => void;
}
export const RangeTracker2: React.FC<Props> = ({open, participants, rangeBands, onClose, onUpdateRange}) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const getRange = (a: string, b: string): RangeBand | null => {
        const rb = rangeBands.find(r => (r.participantId === a && r.targetId === b) || (r.participantId === b && r.targetId === a));
        return rb ? rb.range : null;
    };
    const currentRange = from && to ? getRange(from, to) : null;
    const pcs = participants.filter(p => p.participantType === InitiativeSlotType.Player);
    const npcs = participants.filter(p => p.participantType === InitiativeSlotType.NPC);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Range Tracker</DialogTitle>
            <DialogContent>
                <Alert severity="info" sx={{mb: 3}}>Track the distance between participants. Ranges affect difficulty and weapon effectiveness.</Alert>
                <Grid container spacing={2} sx={{mb: 3}}>
                    <Grid size={{xs: 12, sm: 6}} sx={{mt: 2}}>
                        <FormControl fullWidth>
                            <InputLabel>From</InputLabel>
                            <Select value={from} onChange={e => { setFrom(e.target.value); setTo(""); }} label="From">
                                <MenuItem value=""><em>Select participant</em></MenuItem>
                                {participants.map(p => <MenuItem key={p.data.id} value={p.data.id}>{p.data.name} ({p.participantType})</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}} sx={{mt: 2}}>
                        <FormControl fullWidth disabled={!from}>
                            <InputLabel>To</InputLabel>
                            <Select value={to} onChange={e => setTo(e.target.value)} label="To">
                                <MenuItem value=""><em>Select target</em></MenuItem>
                                {participants.filter(p => p.data.id !== from).map(p => <MenuItem key={p.data.id} value={p.data.id}>{p.data.name} ({p.participantType})</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {from && to && (
                    <Paper sx={{p: 2, mb: 3, backgroundColor: "grey.50"}}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>Current Range:</Typography>
                        {currentRange ? (
                            <Chip label={RANGE_META.find(r => r.value === currentRange)?.label} sx={{backgroundColor: RANGE_META.find(r => r.value === currentRange)?.color, color: "white", fontSize: "1.2rem", fontWeight: "bold"}}/>
                        ) : (
                            <Chip label="Not Set" color="default"/>
                        )}
                    </Paper>
                )}
                {from && to && (
                    <Box sx={{mb: 3}}>
                        <Typography variant="h6" gutterBottom>Set Range</Typography>
                        <Grid container spacing={1}>
                            {RANGE_META.map(opt => (
                                <Grid key={opt.value} size={{xs: 12, sm: 6}} sx={{mt: 2}}>
                                    <Card sx={{cursor: "pointer", border: currentRange === opt.value ? 3 : 1, borderColor: currentRange === opt.value ? opt.color : "divider", "&:hover": {backgroundColor: "action.hover"}}}
                                          onClick={() => onUpdateRange(from, to, opt.value)}>
                                        <CardContent>
                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
                                                <Box sx={{width: 16, height: 16, borderRadius: "50%", backgroundColor: opt.color}}/>
                                                <Typography variant="body1" fontWeight="bold">{opt.label}</Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">{opt.description}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                <Divider sx={{my: 2}}/>
                <Typography variant="h6" gutterBottom>All Ranges</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>Players → NPCs</Typography>
                <Grid container spacing={1}>
                    {pcs.map(pc => (
                        <Grid key={pc.data.id} size={{xs: 12}} sx={{mt: 2}}>
                            <Card variant="outlined">
                                <CardContent sx={{p: 1.5}}>
                                    <Typography variant="body2" fontWeight="bold" gutterBottom>{pc.data.name}</Typography>
                                    <Box sx={{display: "flex", gap: 0.5, flexWrap: "wrap"}}>
                                        {npcs.map(npc => {
                                            const r = getRange(pc.data.id, npc.data.id);
                                            const meta = RANGE_META.find(m => m.value === r);
                                            return <Chip key={npc.data.id} label={`${npc.data.name}: ${meta?.label || "Not Set"}`} size="small" sx={{backgroundColor: meta?.color || undefined, color: r ? "white" : "text.primary"}}/>;
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions><Button onClick={onClose}>Close</Button></DialogActions>
        </Dialog>
    );
};
