import React, { useState } from "react";
import {
    Paper,
    Typography,
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    Chip,
    TextField,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CasinoIcon from "@mui/icons-material/Casino";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { DiceRoller } from "./DiceRoller";
import { DiceResultsDialog } from "./DiceRollDialog";
import type {Action, DiceResult, Maneuver, Participant, TurnAction} from "../SampleEncounterManager.tsx";

interface TurnActionsProps {
    currentParticipant: Participant;
    slotId: string;
    round: number;
    availableActions: Action[];
    availableManeuvers: Maneuver[];
    onComplete: (turnAction: TurnAction) => void;
    onSkip: () => void;
}

export const TurnActions: React.FC<TurnActionsProps> = ({
                                                            currentParticipant,
                                                            slotId,
                                                            round,
                                                            availableActions,
                                                            availableManeuvers,
                                                            onComplete,
                                                            onSkip,
                                                        }) => {
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const [actionDetails, setActionDetails] = useState("");
    const [selectedManeuvers, setSelectedManeuvers] = useState<Maneuver[]>([]);
    const [maneuverDetails, setManeuverDetails] = useState<
        Record<string, string>
    >({});
    const [strainForManeuver, setStrainForManeuver] = useState(0);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [maneuverDialogOpen, setManeuverDialogOpen] = useState(false);
    const [diceRollerOpen, setDiceRollerOpen] = useState(false);
    const [diceResultsDialogOpen, setDiceResultsDialogOpen] = useState(false);
    const [diceResult, setDiceResult] = useState<DiceResult | null>(null);

    const canAddManeuver = selectedManeuvers.length < 2;

    const handleSelectAction = (action: Action) => {
        setSelectedAction(action);
        setActionDialogOpen(false);

        if (action.requiresDiceRoll) {
            setDiceRollerOpen(true);
        }
    };

    const handleQuickAction = (action: Action) => {
        setSelectedAction(action);
        if (action.requiresDiceRoll) {
            setDiceRollerOpen(true);
        }
    };

    const handleDiceRolled = (result: DiceResult) => {
        setDiceResult(result);
        setDiceRollerOpen(false);
        setDiceResultsDialogOpen(true);
    };

    const handleAdvantageSpent = (
        advantageSpent: string[],
        triumphSpent: string[]
    ) => {
        setDiceResultsDialogOpen(false);
    };

    const handleAddManeuver = (maneuver: Maneuver) => {
        if (canAddManeuver) {
            setSelectedManeuvers([...selectedManeuvers, maneuver]);

            if (selectedManeuvers.length === 1) {
                setStrainForManeuver(2);
            }
        }
        setManeuverDialogOpen(false);
    };

    const handleRemoveManeuver = (index: number) => {
        const newManeuvers = selectedManeuvers.filter((_, i) => i !== index);
        setSelectedManeuvers(newManeuvers);

        if (newManeuvers.length < 2) {
            setStrainForManeuver(0);
        }
    };

    const handleComplete = () => {
        const turnAction: TurnAction = {
            id: `turn-${Date.now()}`,
            slotId,
            round,
            participantId: currentParticipant.id,
            actionTaken: selectedAction
                ? {
                    actionId: selectedAction.id,
                    actionName: selectedAction.name,
                    details: actionDetails || undefined,
                    diceResult: diceResult || undefined,
                }
                : undefined,
            maneuversTaken: selectedManeuvers.map((m) => ({
                maneuverId: m.id,
                maneuverName: m.name,
                details: maneuverDetails[m.id] || undefined,
            })),
            strainSpentForManeuver: strainForManeuver,
        };

        onComplete(turnAction);
    };

    const hasCompletedTurn =
        selectedAction !== null || selectedManeuvers.length > 0;
    const quickActions = availableActions.filter((a) => a.quickAction);

    const hasStaggered = currentParticipant.statusEffects.some(
        (e) => e.name === "Staggered"
    );
    const hasStunned = currentParticipant.statusEffects.some(
        (e) => e.name === "Stunned"
    );
    const hasImmobilized = currentParticipant.statusEffects.some(
        (e) => e.name === "Immobilized"
    );

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6">{currentParticipant.name}'s Turn</Typography>
                <Chip
                    label={`Round ${round}`}
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                />
            </Box>

            {hasStunned && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <strong>STUNNED:</strong> Cannot perform actions or maneuvers
                </Alert>
            )}

            {hasStaggered && !hasStunned && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    <strong>STAGGERED:</strong> Cannot perform actions, only maneuvers
                </Alert>
            )}

            {hasImmobilized && !hasStunned && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    <strong>IMMOBILIZED:</strong> Cannot perform movement maneuvers
                </Alert>
            )}

            {!hasStunned && !hasStaggered && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Each turn you get <strong>1 Action</strong> and{" "}
                    <strong>1 Maneuver</strong>. You can take a second maneuver by
                    suffering 2 strain.
                </Alert>
            )}

            {/* Quick Actions */}
            {!hasStunned &&
                !hasStaggered &&
                quickActions.length > 0 &&
                !selectedAction && (
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                            <FlashOnIcon fontSize="small" color="warning" />
                            Quick Actions
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {quickActions.map((action) => (
                                <Button
                                    key={action.id}
                                    variant="outlined"
                                    size="small"
                                    startIcon={
                                        action.requiresDiceRoll ? <CasinoIcon /> : undefined
                                    }
                                    onClick={() => handleQuickAction(action)}
                                >
                                    {action.name}
                                </Button>
                            ))}
                        </Box>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                )}

            <Grid container spacing={2}>
                {/* Action Selection */}
                {!hasStunned && !hasStaggered && (
                    <Grid size={{xs: 12, md: 6}} sx={{mt: 4}}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Action
                                </Typography>

                                {selectedAction ? (
                                    <Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mb: 1,
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {selectedAction.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {selectedAction.description}
                                                </Typography>
                                                <Chip
                                                    label={selectedAction.category}
                                                    size="small"
                                                    sx={{ mt: 1 }}
                                                />
                                            </Box>
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    setSelectedAction(null);
                                                    setActionDetails("");
                                                    setDiceResult(null);
                                                }}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </Box>

                                        {diceResult && (
                                            <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
                                                <Typography variant="body2" fontWeight="bold">
                                                    Dice Result:{" "}
                                                    {diceResult.success +
                                                    diceResult.triumph -
                                                    diceResult.failure -
                                                    diceResult.despair >
                                                    0
                                                        ? "SUCCESS"
                                                        : "FAILURE"}
                                                </Typography>
                                                <Typography variant="caption">
                                                    Net Success:{" "}
                                                    {diceResult.success +
                                                        diceResult.triumph -
                                                        diceResult.failure -
                                                        diceResult.despair}{" "}
                                                    | Net Advantage:{" "}
                                                    {diceResult.advantage - diceResult.threat}
                                                    {diceResult.triumph > 0 &&
                                                        ` | Triumph: ${diceResult.triumph}`}
                                                    {diceResult.despair > 0 &&
                                                        ` | Despair: ${diceResult.despair}`}
                                                </Typography>
                                            </Alert>
                                        )}

                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Additional Details (optional)"
                                            value={actionDetails}
                                            onChange={(e) => setActionDetails(e.target.value)}
                                            placeholder="e.g., Target: Stormtrooper, Weapon: Blaster Pistol"
                                            sx={{ mt: 2 }}
                                        />

                                        {selectedAction.requiresDiceRoll && (
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<CasinoIcon />}
                                                onClick={() => setDiceRollerOpen(true)}
                                                sx={{ mt: 1 }}
                                            >
                                                {diceResult ? "Reroll Dice" : "Roll Dice"}
                                            </Button>
                                        )}
                                    </Box>
                                ) : (
                                    <Box sx={{ textAlign: "center", py: 3 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            No action selected
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<AddCircleOutlineIcon />}
                                            onClick={() => setActionDialogOpen(true)}
                                        >
                                            Select Action
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* Maneuver Selection */}
                {!hasStunned && (
                    <Grid size={{xs: 12, sm: hasStaggered ? 12 : 6}} sx={{mt: 4}}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
                                    <Typography variant="h6" color="secondary">
                                        Maneuvers ({selectedManeuvers.length}/2)
                                    </Typography>
                                    {strainForManeuver > 0 && (
                                        <Chip
                                            label={`-${strainForManeuver} Strain`}
                                            color="warning"
                                            size="small"
                                        />
                                    )}
                                </Box>

                                {selectedManeuvers.length === 0 ? (
                                    <Box sx={{ textAlign: "center", py: 3 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            No maneuvers selected
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<AddCircleOutlineIcon />}
                                            onClick={() => setManeuverDialogOpen(true)}
                                        >
                                            Add Maneuver
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        {selectedManeuvers.map((maneuver, index) => {
                                            const isMovementManeuver =
                                                maneuver.category === "movement";
                                            const isBlocked = hasImmobilized && isMovementManeuver;

                                            return (
                                                <Box key={`${maneuver.id}-${index}`} sx={{ mb: 2 }}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {index + 1}. {maneuver.name}
                                                                {isBlocked && " (BLOCKED BY IMMOBILIZED)"}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {maneuver.description}
                                                            </Typography>
                                                        </Box>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleRemoveManeuver(index)}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </Box>

                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="Details (optional)"
                                                        value={maneuverDetails[maneuver.id] || ""}
                                                        onChange={(e) =>
                                                            setManeuverDetails({
                                                                ...maneuverDetails,
                                                                [maneuver.id]: e.target.value,
                                                            })
                                                        }
                                                        placeholder="e.g., Move to long range"
                                                    />
                                                </Box>
                                            );
                                        })}

                                        {canAddManeuver && (
                                            <>
                                                <Divider sx={{ my: 2 }} />
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    color="secondary"
                                                    startIcon={<AddCircleOutlineIcon />}
                                                    onClick={() => setManeuverDialogOpen(true)}
                                                >
                                                    Add Second Maneuver (-2 Strain)
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button variant="outlined" onClick={onSkip}>
                    Skip Turn
                </Button>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<CheckCircleIcon />}
                    onClick={handleComplete}
                    disabled={!hasCompletedTurn}
                >
                    Complete Turn
                </Button>
            </Box>

            {/* Action Selection Dialog */}
            <Dialog
                open={actionDialogOpen}
                onClose={() => setActionDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Select Action</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {["combat", "skill", "social", "other"].map((category) => {
                            const categoryActions = availableActions.filter(
                                (a) => a.category === category
                            );

                            return (
                                <Grid size={{xs: 12}} sx={{mt: 4}}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {category} Actions
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {categoryActions.map((action) => (
                                            <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                                <Card
                                                    sx={{
                                                        cursor: "pointer",
                                                        "&:hover": { backgroundColor: "action.hover" },
                                                    }}
                                                    onClick={() => handleSelectAction(action)}
                                                >
                                                    <CardContent>
                                                        <Typography variant="body1" fontWeight="bold">
                                                            {action.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {action.description}
                                                        </Typography>
                                                        {action.requiresDiceRoll && (
                                                            <Chip
                                                                label="Requires Roll"
                                                                size="small"
                                                                icon={<CasinoIcon />}
                                                                sx={{ mt: 1 }}
                                                            />
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Maneuver Selection Dialog */}
            <Dialog
                open={maneuverDialogOpen}
                onClose={() => setManeuverDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Add Maneuver</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {["movement", "interaction", "combat", "other"].map((category) => {
                            const categoryManeuvers = availableManeuvers.filter(
                                (m) => m.category === category
                            );

                            return (
                                <Grid size={{xs: 12}} sx={{mt: 4}}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {category} Maneuvers
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {categoryManeuvers.map((maneuver) => {
                                            const isMovementManeuver =
                                                maneuver.category === "movement";
                                            const isDisabled = hasImmobilized && isMovementManeuver;

                                            return (
                                                <Grid size={{xs: 12, sm: 6}} sx={{mt: 4}}>
                                                    <Card
                                                        sx={{
                                                            cursor: isDisabled ? "not-allowed" : "pointer",
                                                            opacity: isDisabled ? 0.5 : 1,
                                                            "&:hover": {
                                                                backgroundColor: isDisabled
                                                                    ? "inherit"
                                                                    : "action.hover",
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            !isDisabled && handleAddManeuver(maneuver)
                                                        }
                                                    >
                                                        <CardContent>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {maneuver.name}
                                                                {isDisabled && " (Immobilized)"}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {maneuver.description}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setManeuverDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Dice Roller */}
            {diceRollerOpen && selectedAction && (
                <DiceRoller
                    open={diceRollerOpen}
                    participantName={currentParticipant.name}
                    rollType="action"
                    onClose={() => setDiceRollerOpen(false)}
                    onRollComplete={handleDiceRolled}
                />
            )}

            {/* Dice Results Dialog */}
            {diceResultsDialogOpen && diceResult && (
                <DiceResultsDialog
                    open={diceResultsDialogOpen}
                    diceResult={diceResult}
                    onClose={() => setDiceResultsDialogOpen(false)}
                    onSpendComplete={handleAdvantageSpent}
                />
            )}
        </Paper>
    );
};
