import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    IconButton,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import StopIcon from "@mui/icons-material/Stop";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

import { TurnActions } from "./TurnActions";
import { RangeTracker } from "./RangeTracker";
import { StatusEffectsManager } from "./StatusEffectsManager";
import type {
    Action, CombatLogEntry,
    EncounterState,
    Maneuver,
    Participant, RangeType,
    StatusEffect,
    TurnAction
} from "../SampleEncounterManager.tsx";

interface EncounterActiveProps {
    encounter: EncounterState;
    availableActions: Action[];
    availableManeuvers: Maneuver[];
    availableStatusEffects: Omit<StatusEffect, "id" | "appliedRound">[];
    onUpdateParticipant: (
        participantId: string,
        updates: Partial<Participant>
    ) => void;
    onAssignSlot: (slotId: string, participantId: string | null) => void;
    onRecordTurnAction: (turnAction: TurnAction) => void;
    onUpdateRange: (
        participantId: string,
        targetId: string,
        range: RangeType
    ) => void;
    onNextSlot: () => void;
    onPreviousSlot: () => void;
    onAddLogEntry: (entry: Omit<CombatLogEntry, "id" | "timestamp">) => void;
    onEndEncounter: () => void;
}

export const EncounterActive: React.FC<EncounterActiveProps> = ({
                                                                    encounter,
                                                                    availableActions,
                                                                    availableManeuvers,
                                                                    availableStatusEffects,
                                                                    onUpdateParticipant,
                                                                    onAssignSlot,
                                                                    onRecordTurnAction,
                                                                    onUpdateRange,
                                                                    onNextSlot,
                                                                    onPreviousSlot,
                                                                    onAddLogEntry,
                                                                    onEndEncounter,
                                                                }) => {
    const [logDrawerOpen, setLogDrawerOpen] = useState(false);
    const [statusManagerOpen, setStatusManagerOpen] = useState(false);
    const [rangeTrackerOpen, setRangeTrackerOpen] = useState(false);
    const [selectedParticipantForStatus, setSelectedParticipantForStatus] =
        useState<string | null>(null);

    const currentSlot = encounter.initiativeSlots[encounter.currentSlotIndex];
    const currentParticipant = currentSlot?.assignedParticipantId
        ? encounter.participants.find(
            (p) => p.id === currentSlot.assignedParticipantId
        )
        : null;

    const handleDamage = (participantId: string, amount: number) => {
        const participant = encounter.participants.find(
            (p) => p.id === participantId
        );
        if (!participant) return;

        const newCurrent = Math.max(
            0,
            Math.min(
                participant.wounds.threshold,
                participant.wounds.current + amount
            )
        );

        onUpdateParticipant(participantId, {
            wounds: { ...participant.wounds, current: newCurrent },
        });

        if (amount > 0) {
            onAddLogEntry({
                round: encounter.currentRound,
                participantId,
                participantName: participant.name,
                action: "Damage Taken",
                details: `Suffered ${amount} wounds`,
            });
        } else if (amount < 0) {
            onAddLogEntry({
                round: encounter.currentRound,
                participantId,
                participantName: participant.name,
                action: "Healing",
                details: `Recovered ${Math.abs(amount)} wounds`,
            });
        }
    };

    const handleStrain = (participantId: string, amount: number) => {
        const participant = encounter.participants.find(
            (p) => p.id === participantId
        );
        if (!participant) return;

        const newCurrent = Math.max(
            0,
            Math.min(
                participant.strain.threshold,
                participant.strain.current + amount
            )
        );

        onUpdateParticipant(participantId, {
            strain: { ...participant.strain, current: newCurrent },
        });

        if (amount > 0) {
            onAddLogEntry({
                round: encounter.currentRound,
                participantId,
                participantName: participant.name,
                action: "Strain Taken",
                details: `Suffered ${amount} strain`,
            });
        } else if (amount < 0) {
            onAddLogEntry({
                round: encounter.currentRound,
                participantId,
                participantName: participant.name,
                action: "Strain Recovered",
                details: `Recovered ${Math.abs(amount)} strain`,
            });
        }
    };

    const handleAssignAndLog = (slotId: string, participantId: string | null) => {
        onAssignSlot(slotId, participantId);

        if (participantId) {
            const participant = encounter.participants.find(
                (p) => p.id === participantId
            );
            if (participant) {
                onAddLogEntry({
                    round: encounter.currentRound,
                    participantId,
                    participantName: participant.name,
                    action: "Turn Started",
                    details: `Acting in slot #${encounter.currentSlotIndex + 1}`,
                });

                // Clear end-of-turn status effects from previous turn
                const updatedEffects = participant.statusEffects.filter(
                    (e) => e.duration !== "end-of-turn"
                );
                if (updatedEffects.length !== participant.statusEffects.length) {
                    onUpdateParticipant(participantId, { statusEffects: updatedEffects });
                }
            }
        }
    };

    const handleCompleteTurn = (turnAction: TurnAction) => {
        onRecordTurnAction(turnAction);

        if (turnAction.strainSpentForManeuver > 0 && currentParticipant) {
            const newStrain = Math.min(
                currentParticipant.strain.threshold,
                currentParticipant.strain.current + turnAction.strainSpentForManeuver
            );
            onUpdateParticipant(currentParticipant.id, {
                strain: { ...currentParticipant.strain, current: newStrain },
            });
        }

        handleNextWithLog();
    };

    const handleNextWithLog = () => {
        if (currentParticipant) {
            onAddLogEntry({
                round: encounter.currentRound,
                participantId: currentParticipant.id,
                participantName: currentParticipant.name,
                action: "Turn Ended",
            });
        }
        onNextSlot();
    };

    const handleOpenStatusManager = (participantId: string) => {
        setSelectedParticipantForStatus(participantId);
        setStatusManagerOpen(true);
    };

    const handleAddStatusEffect = (
        participantId: string,
        effect: Omit<StatusEffect, "id" | "appliedRound">
    ) => {
        const participant = encounter.participants.find(
            (p) => p.id === participantId
        );
        if (!participant) return;

        const newEffect: StatusEffect = {
            ...effect,
            id: `effect-${Date.now()}`,
            appliedRound: encounter.currentRound,
        };

        onUpdateParticipant(participantId, {
            statusEffects: [...participant.statusEffects, newEffect],
        });

        onAddLogEntry({
            round: encounter.currentRound,
            participantId,
            participantName: participant.name,
            action: `Status Applied: ${effect.name}`,
            details: effect.description,
        });
    };

    const handleRemoveStatusEffect = (
        participantId: string,
        effectId: string
    ) => {
        const participant = encounter.participants.find(
            (p) => p.id === participantId
        );
        if (!participant) return;

        const effect = participant.statusEffects.find((e) => e.id === effectId);
        if (!effect) return;

        onUpdateParticipant(participantId, {
            statusEffects: participant.statusEffects.filter((e) => e.id !== effectId),
        });

        onAddLogEntry({
            round: encounter.currentRound,
            participantId,
            participantName: participant.name,
            action: `Status Removed: ${effect.name}`,
        });
    };

    const availableParticipants = encounter.participants.filter(
        (p) => p.type === currentSlot?.slotType
    );

    const pcSlots = encounter.initiativeSlots.filter((s) => s.slotType === "pc");
    const npcSlots = encounter.initiativeSlots.filter(
        (s) => s.slotType === "npc"
    );

    return (
        <Box>
            {/* Header */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: "primary.light" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {encounter.name}
                    </Typography>

                    <Chip
                        label={`Round ${encounter.currentRound}`}
                        color="primary"
                        sx={{ fontSize: "1.2rem", fontWeight: "bold", px: 2 }}
                    />

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<SettingsIcon />}
                            onClick={() => setRangeTrackerOpen(true)}
                        >
                            Range
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<HistoryIcon />}
                            onClick={() => setLogDrawerOpen(true)}
                        >
                            Log
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<StopIcon />}
                            onClick={onEndEncounter}
                        >
                            End
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* Current Slot */}
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "grey.25" }}>
                <Typography variant="h6" gutterBottom>
                    Current Slot: #{encounter.currentSlotIndex + 1}
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid size={{xs: 12, md: 4}} sx={{mt: 4}}>
                        <Paper
                            sx={{
                                p: 2,
                                backgroundColor:
                                    currentSlot?.slotType === "pc"
                                        ? "primary.light"
                                        : "error.light",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Slot Type
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                                {currentSlot?.slotType === "pc" ? "PC SLOT" : "NPC SLOT"}
                            </Typography>
                            <Typography variant="body2">
                                {currentSlot?.success}S {currentSlot?.advantage}A
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid size={{xs: 12, md: 5}} sx={{mt: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>Assign Participant</InputLabel>
                            <Select
                                value={currentSlot?.assignedParticipantId || ""}
                                onChange={(e) =>
                                    handleAssignAndLog(
                                        currentSlot?.id || "",
                                        e.target.value || null
                                    )
                                }
                                label="Assign Participant"
                            >
                                <MenuItem value="">
                                    <em>None (Skip Slot)</em>
                                </MenuItem>
                                {availableParticipants.map((p) => {
                                    const isDefeated = p.wounds.current >= p.wounds.threshold;
                                    return (
                                        <MenuItem key={p.id} value={p.id} disabled={isDefeated}>
                                            {p.name} - Wounds: {p.wounds.current}/{p.wounds.threshold}
                                            {isDefeated && " (DEFEATED)"}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{xs: 12, md: 3}} sx={{mt: 4}}>
                        {currentParticipant ? (
                            <Alert severity="success">
                                <Typography variant="body2" fontWeight="bold">
                                    {currentParticipant.name} is acting
                                </Typography>
                            </Alert>
                        ) : (
                            <Alert severity="warning">
                                <Typography variant="body2">
                                    No one assigned to this slot
                                </Typography>
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            {/* Turn Actions Panel */}
            {currentParticipant && (
                <TurnActions
                    currentParticipant={currentParticipant}
                    slotId={currentSlot.id}
                    round={encounter.currentRound}
                    availableActions={availableActions}
                    availableManeuvers={availableManeuvers}
                    onComplete={handleCompleteTurn}
                    onSkip={handleNextWithLog}
                />
            )}

            {/* Turn Controls */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<NavigateBeforeIcon />}
                        onClick={onPreviousSlot}
                        disabled={encounter.currentSlotIndex === 0}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="contained"
                        endIcon={<NavigateNextIcon />}
                        onClick={handleNextWithLog}
                        size="large"
                    >
                        {encounter.currentSlotIndex === encounter.initiativeSlots.length - 1
                            ? "Start Next Round"
                            : "Next Slot"}
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={3}>
                {/* Initiative Order */}
                <Grid size={{xs: 12, md: 4}} sx={{mt: 4}}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Initiative Order
                        </Typography>

                        <List dense>
                            {encounter.initiativeSlots.map((slot, index) => {
                                const assigned = slot.assignedParticipantId
                                    ? encounter.participants.find(
                                        (p) => p.id === slot.assignedParticipantId
                                    )
                                    : null;
                                const isCurrent = index === encounter.currentSlotIndex;

                                return (
                                    <ListItem
                                        key={slot.id}
                                        sx={{
                                            border: isCurrent ? 2 : 1,
                                            borderColor: isCurrent ? "primary.main" : "divider",
                                            backgroundColor: isCurrent
                                                ? "primary.light"
                                                : slot.slotType === "pc"
                                                    ? "rgba(25, 118, 210, 0.08)"
                                                    : "rgba(211, 47, 47, 0.08)",
                                            borderRadius: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box
                                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <Typography variant="body2" fontWeight="bold">
                                                        #{index + 1}
                                                    </Typography>
                                                    <Chip
                                                        label={slot.slotType.toUpperCase()}
                                                        size="small"
                                                        color={slot.slotType === "pc" ? "primary" : "error"}
                                                    />
                                                </Box>
                                            }
                                            secondary={assigned ? assigned.name : "Unassigned"}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>

                        <Box
                            sx={{ mt: 2, p: 1, backgroundColor: "grey.25", borderRadius: 1 }}
                        >
                            <Typography variant="caption" color="text.secondary">
                                PC Slots: {pcSlots.length} | NPC Slots: {npcSlots.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Participants */}
                <Grid size={{xs: 12, md: 8}} sx={{mt: 4}}>
                    <Typography variant="h6" gutterBottom>
                        Participants
                    </Typography>

                    <Grid container spacing={2}>
                        {encounter.participants.map((participant) => {
                            const woundPercent =
                                (participant.wounds.current / participant.wounds.threshold) *
                                100;
                            const strainPercent =
                                (participant.strain.current / participant.strain.threshold) *
                                100;
                            const isDefeated =
                                participant.wounds.current >= participant.wounds.threshold;

                            return (
                                <Grid size={{xs: 12, lg: 6}} sx={{mt: 4}}>
                                    <Card
                                        sx={{
                                            opacity: isDefeated ? 0.6 : 1,
                                            backgroundColor:
                                                participant.type === "pc"
                                                    ? "rgba(25, 118, 210, 0.05)"
                                                    : "rgba(211, 47, 47, 0.05)",
                                        }}
                                    >
                                        <CardContent>
                                            {/* Header */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    mb: 2,
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h6">
                                                        {participant.name}
                                                    </Typography>
                                                    <Chip
                                                        label={participant.type === "pc" ? "Player" : "NPC"}
                                                        size="small"
                                                        color={
                                                            participant.type === "pc" ? "primary" : "default"
                                                        }
                                                    />
                                                </Box>

                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleOpenStatusManager(participant.id)
                                                    }
                                                >
                                                    Status
                                                </Button>
                                            </Box>

                                            {isDefeated && (
                                                <Alert severity="error" sx={{ mb: 2 }}>
                                                    DEFEATED
                                                </Alert>
                                            )}

                                            {/* Status Effects */}
                                            {participant.statusEffects.length > 0 && (
                                                <Box
                                                    sx={{
                                                        mb: 2,
                                                        display: "flex",
                                                        gap: 0.5,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    {participant.statusEffects.map((effect) => (
                                                        <Chip
                                                            key={effect.id}
                                                            label={`${effect.icon || "•"} ${effect.name}`}
                                                            size="small"
                                                            onDelete={() =>
                                                                handleRemoveStatusEffect(
                                                                    participant.id,
                                                                    effect.id
                                                                )
                                                            }
                                                            color="warning"
                                                        />
                                                    ))}
                                                </Box>
                                            )}

                                            {/* Wounds */}
                                            <Box sx={{ mb: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    <Typography variant="body2">Wounds</Typography>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {participant.wounds.current} /{" "}
                                                        {participant.wounds.threshold}
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={woundPercent}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: "grey.25",
                                                        "& .MuiLinearProgress-bar": {
                                                            backgroundColor:
                                                                woundPercent > 75
                                                                    ? "error.main"
                                                                    : woundPercent > 50
                                                                        ? "warning.main"
                                                                        : "success.main",
                                                        },
                                                    }}
                                                />
                                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDamage(participant.id, 1)}
                                                    >
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="success"
                                                        onClick={() => handleDamage(participant.id, -1)}
                                                        disabled={participant.wounds.current === 0}
                                                    >
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            {/* Strain */}
                                            <Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    <Typography variant="body2">Strain</Typography>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {participant.strain.current} /{" "}
                                                        {participant.strain.threshold}
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={strainPercent}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: "grey.300",
                                                        "& .MuiLinearProgress-bar": {
                                                            backgroundColor: "info.main",
                                                        },
                                                    }}
                                                />
                                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleStrain(participant.id, 1)}
                                                    >
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="success"
                                                        onClick={() => handleStrain(participant.id, -1)}
                                                        disabled={participant.strain.current === 0}
                                                    >
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            {/* Stats */}
                                            {participant.soak !== undefined && (
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        display: "flex",
                                                        gap: 1,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Chip
                                                        label={`Soak: ${participant.soak}`}
                                                        size="small"
                                                    />
                                                    {participant.defenses && (
                                                        <>
                                                            <Chip
                                                                label={`Melee: ${participant.defenses.melee}`}
                                                                size="small"
                                                            />
                                                            <Chip
                                                                label={`Ranged: ${participant.defenses.ranged}`}
                                                                size="small"
                                                            />
                                                        </>
                                                    )}
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>

            {/* Combat Log Drawer */}
            <Drawer
                anchor="right"
                open={logDrawerOpen}
                onClose={() => setLogDrawerOpen(false)}
            >
                <Box sx={{ width: 400, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Combat Log
                    </Typography>

                    <List>
                        {encounter.combatLog.map((entry, index) => (
                            <React.Fragment key={entry.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Box>
                                                <Chip
                                                    label={`Round ${entry.round}`}
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                />
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    fontWeight="bold"
                                                >
                                                    {entry.participantName}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.primary">
                                                    {entry.action}
                                                </Typography>
                                                {entry.details && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {entry.details}
                                                    </Typography>
                                                )}
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                >
                                                    {entry.timestamp.toLocaleTimeString()}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < encounter.combatLog.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>

                    {encounter.combatLog.length === 0 && (
                        <Alert severity="info">No combat log entries yet</Alert>
                    )}
                </Box>
            </Drawer>

            {/* Status Effects Manager */}
            {selectedParticipantForStatus && (
                <StatusEffectsManager
                    open={statusManagerOpen}
                    participant={
                        encounter.participants.find(
                            (p) => p.id === selectedParticipantForStatus
                        )!
                    }
                    availableEffects={availableStatusEffects}
                    onClose={() => {
                        setStatusManagerOpen(false);
                        setSelectedParticipantForStatus(null);
                    }}
                    onAddEffect={(effect) =>
                        handleAddStatusEffect(selectedParticipantForStatus, effect)
                    }
                    onRemoveEffect={(effectId) =>
                        handleRemoveStatusEffect(selectedParticipantForStatus, effectId)
                    }
                />
            )}

            {/* Range Tracker */}
            <RangeTracker
                open={rangeTrackerOpen}
                participants={encounter.participants}
                rangeBands={encounter.rangeBands}
                onClose={() => setRangeTrackerOpen(false)}
                onUpdateRange={onUpdateRange}
            />
        </Box>
    );
};
