import React, {useState} from "react";
import {Box, Paper, Typography, Button, Grid, Card, CardContent, IconButton, Chip, Alert, List, ListItem, ListItemText, ListItemSecondaryAction} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CasinoIcon from "@mui/icons-material/Casino";
import {InitiativeSlotType} from "../../../../../api/model";
import type {EncounterState2, EncounterParticipant, EncounterSlot} from "../EncounterManager2.tsx";
import {getParticipantLabel} from "../EncounterManager2.tsx";
import {DiceRoller2} from "./DiceRoller2.tsx";
interface Props {
    encounter: EncounterState2;
    onRemoveParticipant: (id: string) => void;
    onAddSlot: (slot: Omit<EncounterSlot, "id" | "assignedParticipantId">) => void;
    onRemoveSlot: (slotId: string) => void;
    onStartEncounter: () => void;
}
export const EncounterSetup2: React.FC<Props> = ({encounter, onRemoveParticipant, onAddSlot, onRemoveSlot, onStartEncounter}) => {
    const [rollerOpen, setRollerOpen] = useState(false);
    const [rollingFor, setRollingFor] = useState<EncounterParticipant | null>(null);
    const hasSlot = (id: string) => encounter.slots.some(s => s.rolledBy === id);
    const handleRollInitiative = (ep: EncounterParticipant) => {
        setRollingFor(ep);
        setRollerOpen(true);
    };
    const handleInitiativeRolled = (result: {success: number; advantage: number; triumph: number; failure: number; threat: number; despair: number}) => {
        if (rollingFor) {
            onAddSlot({type: rollingFor.participantType, results: result, rolledBy: rollingFor.data.id});
        }
        setRollerOpen(false);
        setRollingFor(null);
    };
    const allRolled = encounter.participants.length >= 2 && encounter.slots.length === encounter.participants.length;
    const pcSlots = encounter.slots.filter(s => s.type === InitiativeSlotType.Player);
    const npcSlots = encounter.slots.filter(s => s.type === InitiativeSlotType.NPC);
    return (
        <Box>
            <Grid container spacing={3}>
                {/* Initiative order panel */}
                <Grid size={{xs: 12, md: 5}} sx={{mt: 2}}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>Initiative Order</Typography>
                        <Alert severity="info" sx={{mb: 2}}>
                            Each participant rolls initiative once. Players choose which PC acts in PC slots; GM chooses for NPC slots.
                        </Alert>
                        {encounter.slots.length === 0 ? (
                            <Alert severity="warning">No initiative rolled yet. Roll for each participant.</Alert>
                        ) : (
                            <List>
                                {encounter.slots.map((slot, idx) => {
                                    const roller = encounter.participants.find(p => p.data.id === slot.rolledBy);
                                    return (
                                        <ListItem key={slot.id} sx={{border: 2, borderColor: slot.type === InitiativeSlotType.Player ? "primary.main" : "error.main", backgroundColor: slot.type === InitiativeSlotType.Player ? "primary.light" : "error.light", borderRadius: 1, mb: 1}}>
                                            <Box sx={{mr: 2, textAlign: "center", minWidth: 40}}>
                                                <Typography variant="h6" fontWeight="bold">#{idx + 1}</Typography>
                                            </Box>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                                        <Chip label={slot.type} size="small" color={slot.type === InitiativeSlotType.Player ? "primary" : "error"} sx={{fontWeight: "bold"}}/>
                                                        <Typography variant="body2">Rolled by: {roller?.data.name}</Typography>
                                                    </Box>
                                                }
                                                secondary={<Typography variant="h6" component="span">{slot.results.success}S &nbsp; {slot.results.advantage}A</Typography>}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" color="error" onClick={() => onRemoveSlot(slot.id)}><DeleteIcon/></IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                        <Box sx={{mt: 2, p: 2, backgroundColor: "grey.50", borderRadius: 1}}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Summary:</strong><br/>
                                Player Slots: {pcSlots.length}<br/>
                                NPC Slots: {npcSlots.length}<br/>
                                Total: {encounter.slots.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                {/* Participant list */}
                <Grid size={{xs: 12, md: 7}} sx={{mt: 2}}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>Participants ({encounter.participants.length})</Typography>
                        {encounter.participants.length === 0 ? (
                            <Alert severity="info">No participants available in template</Alert>
                        ) : (
                            <Grid container spacing={2}>
                                {encounter.participants.map(ep => {
                                    const rolled = hasSlot(ep.data.id);
                                    return (
                                        <Grid key={ep.data.id} size={{xs: 12}} sx={{mt: 2}}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                        <Box>
                                                            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                                                                <Typography variant="h6">{ep.data.name}</Typography>
                                                                <Chip label={getParticipantLabel(ep)} size="small" color={ep.participantType === InitiativeSlotType.Player ? "primary" : "default"}/>
                                                                {rolled && <Chip label="Initiative Rolled" size="small" color="success" icon={<CasinoIcon/>}/>}
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Wounds: {ep.data.derivedStats.woundThreshold.total} |
                                                                Strain: {ep.data.derivedStats.strainThreshold.total} |
                                                                Soak: {ep.data.derivedStats.soak.current}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{display: "flex", gap: 1}}>
                                                            <Button variant="contained" size="small" startIcon={<CasinoIcon/>}
                                                                    onClick={() => handleRollInitiative(ep)} disabled={rolled}>
                                                                {rolled ? "Rolled" : "Roll Initiative"}
                                                            </Button>
                                                            <IconButton size="small" color="error" onClick={() => onRemoveParticipant(ep.data.id)}><DeleteIcon/></IconButton>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            <Paper sx={{p: 3, mt: 3, textAlign: "center"}}>
                {!allRolled && (
                    <Alert severity="warning" sx={{mb: 2}}>
                        {encounter.participants.length < 2
                            ? "Need at least 2 participants to start"
                            : "All participants must roll initiative before starting"}
                    </Alert>
                )}
                <Button variant="contained" size="large" onClick={onStartEncounter} disabled={!allRolled}>
                    Start Encounter
                </Button>
            </Paper>
            {rollerOpen && rollingFor && (
                <DiceRoller2 open={rollerOpen} participantName={rollingFor.data.name} rollType="initiative"
                             onClose={() => { setRollerOpen(false); setRollingFor(null); }}
                             onRollComplete={handleInitiativeRolled}/>
            )}
        </Box>
    );
};
