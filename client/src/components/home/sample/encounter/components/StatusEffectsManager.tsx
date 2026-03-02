import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Alert,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type {Participant, StatusEffect} from "../SampleEncounterManager.tsx";


interface StatusEffectsManagerProps {
    open: boolean;
    participant: Participant;
    availableEffects: Omit<StatusEffect, "id" | "appliedRound">[];
    onClose: () => void;
    onAddEffect: (effect: Omit<StatusEffect, "id" | "appliedRound">) => void;
    onRemoveEffect: (effectId: string) => void;
}

export const StatusEffectsManager: React.FC<StatusEffectsManagerProps> = ({
                                                                              open,
                                                                              participant,
                                                                              availableEffects,
                                                                              onClose,
                                                                              onAddEffect,
                                                                              onRemoveEffect,
                                                                          }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = [
        "all",
        "combat",
        "condition",
        "positive",
        "environmental",
    ];

    const getCategoryForEffect = (effectName: string): string => {
        const combatEffects = ["Aimed", "Cover", "Engaged"];
        const conditionEffects = [
            "Staggered",
            "Stunned",
            "Immobilized",
            "Disoriented",
            "Prone",
        ];
        const positiveEffects = ["Inspired"];
        const environmentalEffects = ["Frightened"];

        if (combatEffects.includes(effectName)) return "combat";
        if (conditionEffects.includes(effectName)) return "condition";
        if (positiveEffects.includes(effectName)) return "positive";
        if (environmentalEffects.includes(effectName)) return "environmental";
        return "other";
    };

    const filteredEffects =
        selectedCategory === "all"
            ? availableEffects
            : availableEffects.filter(
                (e) => getCategoryForEffect(e.name) === selectedCategory
            );

    const getDurationColor = (duration: StatusEffect["duration"]) => {
        switch (duration) {
            case "end-of-turn":
                return "info";
            case "end-of-round":
                return "warning";
            case "end-of-encounter":
                return "error";
            case "permanent":
                return "default";
            default:
                return "default";
        }
    };

    const getDurationLabel = (duration: StatusEffect["duration"]) => {
        switch (duration) {
            case "end-of-turn":
                return "End of Turn";
            case "end-of-round":
                return "End of Round";
            case "end-of-encounter":
                return "End of Encounter";
            case "permanent":
                return "Until Removed";
            default:
                return duration;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Status Effects: {participant.name}</DialogTitle>

            <DialogContent>
                {/* Current Effects */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Active Effects ({participant.statusEffects.length})
                    </Typography>

                    {participant.statusEffects.length === 0 ? (
                        <Alert severity="info">No active status effects</Alert>
                    ) : (
                        <List>
                            {participant.statusEffects.map((effect) => (
                                <ListItem
                                    key={effect.id}
                                    sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        mb: 1,
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box
                                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                            >
                                                <Typography variant="body1" fontWeight="bold">
                                                    {effect.icon} {effect.name}
                                                </Typography>
                                                <Chip
                                                    label={getDurationLabel(effect.duration)}
                                                    size="small"
                                                    color={getDurationColor(effect.duration)}
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {effect.description}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Applied Round: {effect.appliedRound}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => onRemoveEffect(effect.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Add New Effect */}
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Add Status Effect
                    </Typography>

                    {/* Category Filter */}
                    <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {categories.map((category) => (
                            <Chip
                                key={category}
                                label={category.charAt(0).toUpperCase() + category.slice(1)}
                                onClick={() => setSelectedCategory(category)}
                                color={selectedCategory === category ? "primary" : "default"}
                                variant={selectedCategory === category ? "filled" : "outlined"}
                            />
                        ))}
                    </Box>

                    <Grid container spacing={1}>
                        {filteredEffects.map((effect, index) => {
                            const alreadyApplied = participant.statusEffects.some(
                                (e) => e.name === effect.name
                            );

                            return (
                                <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}} key={`${effect.name}-${index}`}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            cursor: alreadyApplied ? "not-allowed" : "pointer",
                                            opacity: alreadyApplied ? 0.5 : 1,
                                            "&:hover": {
                                                backgroundColor: alreadyApplied
                                                    ? "inherit"
                                                    : "action.hover",
                                            },
                                        }}
                                        onClick={() => !alreadyApplied && onAddEffect(effect)}
                                    >
                                        <CardContent sx={{ p: 1.5 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    mb: 0.5,
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight="bold">
                                                    {effect.icon} {effect.name}
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: 0.5 }}>
                                                    <Chip
                                                        label={getDurationLabel(effect.duration)}
                                                        size="small"
                                                        color={getDurationColor(effect.duration)}
                                                    />
                                                    {!alreadyApplied && (
                                                        <IconButton size="small" color="primary">
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Typography variant="caption" color="text.secondary">
                                                {effect.description}
                                            </Typography>
                                            {alreadyApplied && (
                                                <Chip
                                                    label="Already Applied"
                                                    size="small"
                                                    color="warning"
                                                    sx={{ mt: 0.5 }}
                                                />
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Common Status Effect Reference */}
                <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Quick Reference:
                    </Typography>
                    <Typography variant="caption" component="div">
                        • <strong>Stunned:</strong> Cannot perform actions or maneuvers
                        <br />• <strong>Staggered:</strong> Cannot perform actions
                        <br />• <strong>Immobilized:</strong> Cannot perform movement
                        maneuvers
                        <br />• <strong>Disoriented:</strong> Add setback die to all checks
                    </Typography>
                </Alert>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
