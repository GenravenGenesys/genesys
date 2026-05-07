import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid, Card, CardContent, Chip, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Alert, Divider} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {StatusEffectType} from "../../../../../api/model";
import type {ActiveStatusEffect, EncounterParticipant} from "../EncounterManager2.tsx";
import {STATUS_EFFECT_META} from "../EncounterManager2.tsx";
interface Props {
    open: boolean;
    participant: EncounterParticipant;
    onClose: () => void;
    onAddEffect: (type: typeof StatusEffectType[keyof typeof StatusEffectType], rounds: number) => void;
    onRemoveEffect: (effectId: string) => void;
}
export const StatusEffectsManager2: React.FC<Props> = ({open, participant, onClose, onAddEffect, onRemoveEffect}) => {
    const allTypes = Object.values(StatusEffectType);
    const getDurationColor = (rounds: number) => rounds === 1 ? "info" : rounds >= 3 ? "error" : "warning";
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Status Effects: {participant.data.name}</DialogTitle>
            <DialogContent>
                <Box sx={{mb: 3}}>
                    <Typography variant="h6" gutterBottom>Active Effects ({participant.activeStatusEffects.length})</Typography>
                    {participant.activeStatusEffects.length === 0 ? (
                        <Alert severity="info">No active status effects</Alert>
                    ) : (
                        <List>
                            {participant.activeStatusEffects.map((effect: ActiveStatusEffect) => {
                                const meta = STATUS_EFFECT_META[effect.type];
                                return (
                                    <ListItem key={effect.id} sx={{border: 1, borderColor: "divider", borderRadius: 1, mb: 1}}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                                    <Typography variant="body1" fontWeight="bold">{meta.icon} {meta.label}</Typography>
                                                    <Chip label={`${effect.rounds} round(s)`} size="small" color={getDurationColor(effect.rounds)}/>
                                                </Box>
                                            }
                                            secondary={<Box><Typography variant="body2" color="text.secondary">{meta.description}</Typography><Typography variant="caption" color="text.secondary">Applied round: {effect.appliedRound}</Typography></Box>}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" color="error" onClick={() => onRemoveEffect(effect.id)}><DeleteIcon/></IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Box>
                <Divider sx={{my: 2}}/>
                <Typography variant="h6" gutterBottom>Add Status Effect</Typography>
                <Grid container spacing={1}>
                    {allTypes.map((type) => {
                        const meta = STATUS_EFFECT_META[type];
                        const alreadyApplied = participant.activeStatusEffects.some(e => e.type === type);
                        return (
                            <Grid key={type} size={{xs: 12, sm: 4}} sx={{mt: 2}}>
                                <Card variant="outlined" sx={{cursor: alreadyApplied ? "not-allowed" : "pointer", opacity: alreadyApplied ? 0.5 : 1, "&:hover": {backgroundColor: alreadyApplied ? "inherit" : "action.hover"}}}
                                      onClick={() => !alreadyApplied && onAddEffect(type, 1)}>
                                    <CardContent sx={{p: 1.5}}>
                                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5}}>
                                            <Typography variant="body2" fontWeight="bold">{meta.icon} {meta.label}</Typography>
                                            {!alreadyApplied && <IconButton size="small" color="primary"><AddIcon fontSize="small"/></IconButton>}
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">{meta.description}</Typography>
                                        {alreadyApplied && <Chip label="Already Applied" size="small" color="warning" sx={{mt: 0.5}}/>}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <Alert severity="info" sx={{mt: 2}}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>Quick Reference:</Typography>
                    <Typography variant="caption" component="div">
                        • <strong>Staggered:</strong> Cannot perform actions<br/>
                        • <strong>Immobilized:</strong> Cannot perform movement maneuvers<br/>
                        • <strong>Disoriented:</strong> Add setback die to all checks
                    </Typography>
                </Alert>
            </DialogContent>
            <DialogActions><Button onClick={onClose}>Close</Button></DialogActions>
        </Dialog>
    );
};
