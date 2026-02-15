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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Alert,
    Paper,
    Divider,
} from "@mui/material";
import type {Participant, RangeBand, RangeType} from "../SampleEncounterManager.tsx";


interface RangeTrackerProps {
    open: boolean;
    participants: Participant[];
    rangeBands: RangeBand[];
    onClose: () => void;
    onUpdateRange: (
        participantId: string,
        targetId: string,
        range: RangeType
    ) => void;
}

const rangeOptions: {
    value: RangeType;
    label: string;
    description: string;
    color: string;
}[] = [
    {
        value: "engaged",
        label: "Engaged",
        description: "In melee range",
        color: "#d32f2f",
    },
    {
        value: "short",
        label: "Short",
        description: "Up to several meters",
        color: "#f57c00",
    },
    {
        value: "medium",
        label: "Medium",
        description: "Several meters to several dozen",
        color: "#fbc02d",
    },
    {
        value: "long",
        label: "Long",
        description: "Several dozen to several hundred meters",
        color: "#388e3c",
    },
    {
        value: "extreme",
        label: "Extreme",
        description: "Several hundred meters+",
        color: "#1976d2",
    },
];

export const RangeTracker: React.FC<RangeTrackerProps> = ({
                                                              open,
                                                              participants,
                                                              rangeBands,
                                                              onClose,
                                                              onUpdateRange,
                                                          }) => {
    const [selectedParticipant, setSelectedParticipant] = useState<string>("");
    const [selectedTarget, setSelectedTarget] = useState<string>("");

    const getRange = (
        participantId: string,
        targetId: string
    ): RangeType | null => {
        const rangeBand = rangeBands.find(
            (r) =>
                (r.participantId === participantId && r.targetId === targetId) ||
                (r.participantId === targetId && r.targetId === participantId)
        );
        return rangeBand?.range || null;
    };

    const handleSetRange = (range: RangeType) => {
        if (selectedParticipant && selectedTarget) {
            onUpdateRange(selectedParticipant, selectedTarget, range);
        }
    };

    const currentRange =
        selectedParticipant && selectedTarget
            ? getRange(selectedParticipant, selectedTarget)
            : null;

    const availableTargets = participants.filter(
        (p) => p.id !== selectedParticipant
    );

    const pcParticipants = participants.filter((p) => p.type === "pc");
    const npcParticipants = participants.filter((p) => p.type === "npc");

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Range Tracker</DialogTitle>

            <DialogContent>
                <Alert severity="info" sx={{ mb: 3 }}>
                    Track the distance between participants. Ranges affect difficulty and
                    weapon effectiveness.
                </Alert>

                {/* Select Participants */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>From</InputLabel>
                            <Select
                                value={selectedParticipant}
                                onChange={(e) => {
                                    setSelectedParticipant(e.target.value);
                                    setSelectedTarget("");
                                }}
                                label="From"
                            >
                                <MenuItem value="">
                                    <em>Select participant</em>
                                </MenuItem>
                                {participants.map((p) => (
                                    <MenuItem key={p.id} value={p.id}>
                                        {p.name} ({p.type.toUpperCase()})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                        <FormControl fullWidth disabled={!selectedParticipant}>
                            <InputLabel>To</InputLabel>
                            <Select
                                value={selectedTarget}
                                onChange={(e) => setSelectedTarget(e.target.value)}
                                label="To"
                            >
                                <MenuItem value="">
                                    <em>Select target</em>
                                </MenuItem>
                                {availableTargets.map((p) => (
                                    <MenuItem key={p.id} value={p.id}>
                                        {p.name} ({p.type.toUpperCase()})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Current Range Display */}
                {selectedParticipant && selectedTarget && (
                    <Paper sx={{ p: 2, mb: 3, backgroundColor: "grey.100" }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Current Range:
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                            {currentRange ? (
                                <Chip
                                    label={
                                        rangeOptions.find((r) => r.value === currentRange)?.label
                                    }
                                    sx={{
                                        backgroundColor: rangeOptions.find(
                                            (r) => r.value === currentRange
                                        )?.color,
                                        color: "white",
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                    }}
                                />
                            ) : (
                                <Chip label="Not Set" color="default" />
                            )}
                        </Typography>
                    </Paper>
                )}

                {/* Set Range */}
                {selectedParticipant && selectedTarget && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Set Range
                        </Typography>

                        <Grid container spacing={1}>
                            {rangeOptions.map((option) => (
                                <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            border: currentRange === option.value ? 3 : 1,
                                            borderColor:
                                                currentRange === option.value
                                                    ? option.color
                                                    : "divider",
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                            },
                                        }}
                                        onClick={() => handleSetRange(option.value)}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    mb: 0.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: "50%",
                                                        backgroundColor: option.color,
                                                    }}
                                                />
                                                <Typography variant="body1" fontWeight="bold">
                                                    {option.label}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {option.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Range Matrix */}
                <Box>
                    <Typography variant="h6" gutterBottom>
                        All Ranges
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        PCs to NPCs:
                    </Typography>

                    <Grid container spacing={1}>
                        {pcParticipants.map((pc) => (
                            <Grid size={{xs: 12}} sx={{mt: 4}}>
                                <Card variant="outlined">
                                    <CardContent sx={{ p: 1.5 }}>
                                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                                            {pc.name}
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                            {npcParticipants.map((npc) => {
                                                const range = getRange(pc.id, npc.id);
                                                const rangeOption = rangeOptions.find(
                                                    (r) => r.value === range
                                                );

                                                return (
                                                    <Chip
                                                        key={npc.id}
                                                        label={`${npc.name}: ${
                                                            rangeOption?.label || "Not Set"
                                                        }`}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: rangeOption?.color || "grey.300",
                                                            color: range ? "white" : "text.primary",
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Range Reference */}
                <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Range Band Reference:
                    </Typography>
                    <Typography variant="caption" component="div">
                        • <strong>Engaged:</strong> Melee attacks, can't use ranged weapons
                        <br />• <strong>Short:</strong> Easy ranged attacks, move maneuver
                        to engaged
                        <br />• <strong>Medium:</strong> Average ranged attacks
                        <br />• <strong>Long:</strong> Hard ranged attacks, long range
                        weapons
                        <br />• <strong>Extreme:</strong> Daunting ranged attacks, extreme
                        range weapons only
                    </Typography>
                </Alert>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
