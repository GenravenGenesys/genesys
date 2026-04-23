import React, {useState} from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CasinoIcon from "@mui/icons-material/Casino";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import UndoIcon from "@mui/icons-material/Undo";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import ShieldIcon from "@mui/icons-material/Shield";
import {DiceRoller} from "./DiceRoller";
import {DiceResultsDialog} from "./DiceRollDialog";
import type {Ability, Action, DiceResult, Maneuver, Participant, TurnAction, Weapon} from "../SampleEncounterManager.tsx";

interface TurnActionsProps {
    currentParticipant: Participant;
    slotId: string;
    round: number;
    availableActions: Action[];
    availableManeuvers: Maneuver[];
    onComplete: (turnAction: TurnAction) => void;
    onSkip: () => void;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function weaponToAction(weapon: Weapon): Action {
    return {
        id: `weapon-${weapon.id}`,
        name: weapon.name,
        description: `${weapon.skill} • Dmg ${weapon.damage} • Crit ${weapon.critical} • ${weapon.range}${weapon.qualities?.length ? " • " + weapon.qualities.join(", ") : ""}`,
        category: "combat",
        requiresDiceRoll: true,
        weapon,
    };
}

function abilityToAction(ability: Ability): Action | null {
    if (ability.activationType !== "action") return null;
    return {
        id: `ability-${ability.id}`,
        name: ability.name,
        description: ability.description,
        category: "other",
        requiresDiceRoll: false,
    };
}

function abilityToManeuver(ability: Ability): Maneuver | null {
    if (ability.activationType !== "maneuver") return null;
    return {
        id: `ability-${ability.id}`,
        name: ability.name,
        description: ability.description,
        category: "other",
    };
}

// ─── component ────────────────────────────────────────────────────────────────

export const TurnActions: React.FC<TurnActionsProps> = ({
                                                            currentParticipant,
                                                            slotId,
                                                            round,
                                                            availableActions,
                                                            availableManeuvers,
                                                            onComplete,
                                                            onSkip,
                                                        }) => {
    // ── maneuver state ──────────────────────────────────────────────────────
    const [selectedManeuvers, setSelectedManeuvers] = useState<Maneuver[]>([]);
    const [maneuverDetails, setManeuverDetails] = useState<Record<string, string>>({});
    /** true = the second maneuver slot was unlocked by spending 2 strain */
    const [strainManeuverUsed, setStrainManeuverUsed] = useState(false);
    /** true = the action slot was spent to grant a free second maneuver */
    const [actionAsManeuver, setActionAsManeuver] = useState(false);

    // ── action state ────────────────────────────────────────────────────────
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const [actionDetails, setActionDetails] = useState("");
    const [diceResult, setDiceResult] = useState<DiceResult | null>(null);

    // ── dialog state ────────────────────────────────────────────────────────
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [maneuverDialogOpen, setManeuverDialogOpen] = useState(false);
    const [diceRollerOpen, setDiceRollerOpen] = useState(false);
    const [diceResultsDialogOpen, setDiceResultsDialogOpen] = useState(false);

    // ── derived ─────────────────────────────────────────────────────────────
    const totalManeuvers = selectedManeuvers.length;
    /** Slot budget: 1 free + 1 extra (via strain OR action-as-maneuver). Cap = 2. */
    const maxManeuvers = strainManeuverUsed || actionAsManeuver ? 2 : 1;
    const canAddManeuver = totalManeuvers < maxManeuvers;

    /** Action is available only if it has NOT been given up as an extra maneuver */
    const actionAvailable = !actionAsManeuver;

    const hasStaggered = currentParticipant.statusEffects.some((e) => e.name === "Staggered");
    const hasStunned = currentParticipant.statusEffects.some((e) => e.name === "Stunned");
    const hasImmobilized = currentParticipant.statusEffects.some((e) => e.name === "Immobilized");

    // Build enriched lists that include this participant's own weapons / ability-actions
    const participantWeaponActions: Action[] = (currentParticipant.weapons ?? []).map(weaponToAction);
    const participantAbilityActions: Action[] = (currentParticipant.abilities ?? [])
        .map(abilityToAction)
        .filter((a): a is Action => a !== null);
    const participantAbilityManeuvers: Maneuver[] = (currentParticipant.abilities ?? [])
        .map(abilityToManeuver)
        .filter((m): m is Maneuver => m !== null);

    const allActions: Action[] = [...participantWeaponActions, ...participantAbilityActions, ...availableActions];
    const allManeuvers: Maneuver[] = [...participantAbilityManeuvers, ...availableManeuvers];

    // ── maneuver handlers ───────────────────────────────────────────────────

    const handleAddManeuver = (maneuver: Maneuver) => {
        if (canAddManeuver) {
            setSelectedManeuvers((prev) => [...prev, maneuver]);
        }
        setManeuverDialogOpen(false);
    };

    const handleRemoveManeuver = (index: number) => {
        setSelectedManeuvers((prev) => prev.filter((_, i) => i !== index));
        // If we remove the second maneuver, also clear the strain flag if that was the reason it existed
        // (keep the flag so user can add a different 2nd maneuver without re-clicking)
    };

    /** Unlock second maneuver via 2 strain — mutually exclusive with action-as-maneuver */
    const handleUseStrainForSecond = () => {
        setStrainManeuverUsed(true);
        setActionAsManeuver(false);
        // If there was a "action as maneuver" 2nd maneuver, remove it
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    const handleUndoStrainManeuver = () => {
        setStrainManeuverUsed(false);
        // Remove the second maneuver if it was added via this mode
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    // ── action handlers ─────────────────────────────────────────────────────

    const handleSelectAction = (action: Action) => {
        setSelectedAction(action);
        setActionDialogOpen(false);
        if (action.requiresDiceRoll) setDiceRollerOpen(true);
    };

    const handleClearAction = () => {
        setSelectedAction(null);
        setActionDetails("");
        setDiceResult(null);
    };

    /** Use the action slot as a free second maneuver — mutually exclusive with strain spend */
    const handleActionAsManeuver = () => {
        setActionAsManeuver(true);
        setStrainManeuverUsed(false);
        // Clear any selected action
        handleClearAction();
        // Remove any strain-funded second maneuver
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    const handleUndoActionAsManeuver = () => {
        setActionAsManeuver(false);
        // Remove the extra maneuver if one was taken
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    const handleDiceRolled = (result: DiceResult) => {
        setDiceResult(result);
        setDiceRollerOpen(false);
        setDiceResultsDialogOpen(true);
    };

    const handleAdvantageSpent = () => {
        setDiceResultsDialogOpen(false);
    };

    // ── complete turn ───────────────────────────────────────────────────────

    const handleComplete = () => {
        const strainSpent = strainManeuverUsed ? 2 : 0;
        const turnAction: TurnAction = {
            id: `turn-${Date.now()}`,
            slotId,
            round,
            participantId: currentParticipant.id,
            actionTaken:
                selectedAction && !actionAsManeuver
                    ? {
                        actionId: selectedAction.id,
                        actionName: selectedAction.name,
                        details: actionDetails || undefined,
                        diceResult: diceResult || undefined,
                    }
                    : actionAsManeuver
                        ? {actionId: "action-as-maneuver", actionName: "Action used as extra maneuver", details: undefined}
                        : undefined,
            maneuversTaken: selectedManeuvers.map((m) => ({
                maneuverId: m.id,
                maneuverName: m.name,
                details: maneuverDetails[m.id] || undefined,
            })),
            strainSpentForManeuver: strainSpent,
        };
        onComplete(turnAction);
    };

    const hasCompletedTurn = selectedAction !== null || selectedManeuvers.length > 0 || actionAsManeuver;

    // ── maneuver dialog contents ─────────────────────────────────────────────
    const renderManeuverDialog = () => (
        <Dialog open={maneuverDialogOpen} onClose={() => setManeuverDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Select Maneuver</DialogTitle>
            <DialogContent>
                {(["movement", "interaction", "combat", "other"] as const).map((cat) => {
                    const catManeuvers = allManeuvers.filter((m) => m.category === cat);
                    if (catManeuvers.length === 0) return null;
                    return (
                        <Box key={cat} sx={{mb: 2}}>
                            <Typography variant="h6" gutterBottom sx={{textTransform: "capitalize"}}>
                                {cat} Maneuvers
                            </Typography>
                            <Grid container spacing={1}>
                                {catManeuvers.map((maneuver) => {
                                    const blocked = hasImmobilized && maneuver.category === "movement";
                                    return (
                                        <Grid key={maneuver.id} size={{xs: 12, sm: 6}} sx={{mt: 1}}>
                                            <Card
                                                sx={{
                                                    cursor: blocked ? "not-allowed" : "pointer",
                                                    opacity: blocked ? 0.5 : 1,
                                                    border: maneuver.id.startsWith("ability-") ? "2px solid" : "1px solid",
                                                    borderColor: maneuver.id.startsWith("ability-") ? "secondary.main" : "divider",
                                                    "&:hover": {backgroundColor: blocked ? "inherit" : "action.hover"},
                                                }}
                                                onClick={() => !blocked && handleAddManeuver(maneuver)}
                                            >
                                                <CardContent sx={{py: 1, "&:last-child": {pb: 1}}}>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {maneuver.name}
                                                        {maneuver.id.startsWith("ability-") && (
                                                            <Chip label="Ability" size="small" color="secondary" sx={{ml: 1}}/>
                                                        )}
                                                        {blocked && " (Immobilized)"}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {maneuver.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setManeuverDialogOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );

    // ── action dialog contents ───────────────────────────────────────────────
    const renderActionDialog = () => (
        <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Select Action</DialogTitle>
            <DialogContent>
                {/* Weapons section */}
                {participantWeaponActions.length > 0 && (
                    <Box sx={{mb: 2}}>
                        <Typography variant="h6" gutterBottom>
                            ⚔️ Weapons
                        </Typography>
                        <Grid container spacing={1}>
                            {participantWeaponActions.map((action) => (
                                <Grid key={action.id} size={{xs: 12, sm: 6}} sx={{mt: 1}}>
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            border: "2px solid",
                                            borderColor: "warning.main",
                                            "&:hover": {backgroundColor: "action.hover"},
                                        }}
                                        onClick={() => handleSelectAction(action)}
                                    >
                                        <CardContent sx={{py: 1, "&:last-child": {pb: 1}}}>
                                            <Typography variant="body1" fontWeight="bold">
                                                {action.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {action.description}
                                            </Typography>
                                            <Chip label="Requires Roll" size="small" icon={<CasinoIcon/>} sx={{mt: 1}}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider sx={{mt: 2}}/>
                    </Box>
                )}

                {/* Ability actions */}
                {participantAbilityActions.length > 0 && (
                    <Box sx={{mb: 2}}>
                        <Typography variant="h6" gutterBottom>
                            ✨ Abilities
                        </Typography>
                        <Grid container spacing={1}>
                            {participantAbilityActions.map((action) => (
                                <Grid key={action.id} size={{xs: 12, sm: 6}} sx={{mt: 1}}>
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            border: "2px solid",
                                            borderColor: "secondary.main",
                                            "&:hover": {backgroundColor: "action.hover"},
                                        }}
                                        onClick={() => handleSelectAction(action)}
                                    >
                                        <CardContent sx={{py: 1, "&:last-child": {pb: 1}}}>
                                            <Typography variant="body1" fontWeight="bold">{action.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{action.description}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider sx={{mt: 2}}/>
                    </Box>
                )}

                {/* Generic actions by category */}
                {(["combat", "skill", "social", "other"] as const).map((cat) => {
                    const catActions = availableActions.filter((a) => a.category === cat);
                    if (catActions.length === 0) return null;
                    return (
                        <Box key={cat} sx={{mb: 2}}>
                            <Typography variant="h6" gutterBottom sx={{textTransform: "capitalize"}}>
                                {cat} Actions
                            </Typography>
                            <Grid container spacing={1}>
                                {catActions.map((action) => (
                                    <Grid key={action.id} size={{xs: 12, sm: 6}} sx={{mt: 1}}>
                                        <Card
                                            sx={{cursor: "pointer", "&:hover": {backgroundColor: "action.hover"}}}
                                            onClick={() => handleSelectAction(action)}
                                        >
                                            <CardContent sx={{py: 1, "&:last-child": {pb: 1}}}>
                                                <Typography variant="body1" fontWeight="bold">{action.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">{action.description}</Typography>
                                                {action.requiresDiceRoll && (
                                                    <Chip label="Requires Roll" size="small" icon={<CasinoIcon/>} sx={{mt: 1}}/>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <Paper sx={{p: 3, mb: 3}}>
            {/* Header */}
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2}}>
                <Typography variant="h6">{currentParticipant.name}'s Turn</Typography>
                <Chip label={`Round ${round}`} color="primary" sx={{fontWeight: "bold"}}/>
            </Box>

            {/* Status alerts */}
            {hasStunned && (
                <Alert severity="error" sx={{mb: 2}}>
                    <strong>STUNNED:</strong> Cannot perform actions or maneuvers this turn.
                </Alert>
            )}
            {hasStaggered && !hasStunned && (
                <Alert severity="warning" sx={{mb: 2}}>
                    <strong>STAGGERED:</strong> Cannot perform actions — maneuvers only.
                </Alert>
            )}
            {hasImmobilized && !hasStunned && (
                <Alert severity="warning" sx={{mb: 2}}>
                    <strong>IMMOBILIZED:</strong> Cannot perform movement maneuvers.
                </Alert>
            )}

            {/* Turn budget reminder */}
            {!hasStunned && !hasStaggered && (
                <Alert severity="info" sx={{mb: 2}}>
                    Each turn: <strong>1 free Maneuver</strong> + <strong>1 Action</strong>.
                    Spend <strong>2 strain</strong> for a second maneuver, OR give up your action for a <strong>free second maneuver</strong>.
                    Maximum <strong>2 maneuvers</strong> total.
                </Alert>
            )}

            {/* ── MANEUVER SECTION ──────────────────────────────── */}
            {!hasStunned && (
                <Box sx={{mb: 3}}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1}}>
                        <Typography variant="subtitle1" fontWeight="bold" color="secondary.main">
                            Maneuvers ({totalManeuvers} / {maxManeuvers})
                            {strainManeuverUsed && (
                                <Chip label="−2 Strain" color="warning" size="small" sx={{ml: 1}}/>
                            )}
                            {actionAsManeuver && (
                                <Chip label="Action traded" color="info" size="small" sx={{ml: 1}}/>
                            )}
                        </Typography>
                    </Box>

                    {/* Listed maneuvers */}
                    {selectedManeuvers.map((maneuver, index) => {
                        const blocked = hasImmobilized && maneuver.category === "movement";
                        return (
                            <Box key={`${maneuver.id}-${index}`} sx={{mb: 2, p: 2, border: 1, borderColor: "divider", borderRadius: 1}}>
                                <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography variant="body1" fontWeight="bold" color={blocked ? "error" : "inherit"}>
                                            {index + 1}. {maneuver.name}
                                            {blocked && " ✗ BLOCKED (Immobilized)"}
                                            {index === 1 && strainManeuverUsed && (
                                                <Chip label="-2 Strain" size="small" color="warning" sx={{ml: 1}}/>
                                            )}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">{maneuver.description}</Typography>
                                    </Box>
                                    <IconButton size="small" onClick={() => handleRemoveManeuver(index)}>
                                        <ClearIcon/>
                                    </IconButton>
                                </Box>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Details (optional)"
                                    value={maneuverDetails[maneuver.id] || ""}
                                    onChange={(e) => setManeuverDetails({...maneuverDetails, [maneuver.id]: e.target.value})}
                                    placeholder="e.g., Move to medium range from crates"
                                />
                            </Box>
                        );
                    })}

                    {/* Add first maneuver */}
                    {totalManeuvers === 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AddCircleOutlineIcon/>}
                            onClick={() => setManeuverDialogOpen(true)}
                            fullWidth
                        >
                            Add Maneuver (free)
                        </Button>
                    )}

                    {/* Second maneuver row: either "add it" (slot unlocked) or buttons to unlock */}
                    {totalManeuvers === 1 && (
                        <>
                            {canAddManeuver ? (
                                /* Slot already unlocked — add the actual maneuver */
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<AddCircleOutlineIcon/>}
                                    onClick={() => setManeuverDialogOpen(true)}
                                    fullWidth
                                    sx={{mt: 1}}
                                >
                                    Add 2nd Maneuver
                                    {strainManeuverUsed && " (−2 Strain)"}
                                    {actionAsManeuver && " (action traded)"}
                                </Button>
                            ) : (
                                /* Neither unlock path chosen yet — show both unlock options */
                                <Box sx={{display: "flex", gap: 1, mt: 1, flexWrap: "wrap"}}>
                                    <Tooltip title="Suffer 2 strain to gain a second maneuver. Your action remains available.">
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            size="small"
                                            startIcon={<GppMaybeIcon/>}
                                            onClick={handleUseStrainForSecond}
                                        >
                                            2nd Maneuver (costs −2 Strain)
                                        </Button>
                                    </Tooltip>
                                    {!hasStaggered && (
                                        <Tooltip title="Give up your action to gain a free second maneuver (no strain cost).">
                                            <Button
                                                variant="outlined"
                                                color="info"
                                                size="small"
                                                startIcon={<FlashOnIcon/>}
                                                onClick={handleActionAsManeuver}
                                            >
                                                2nd Maneuver (use Action — free)
                                            </Button>
                                        </Tooltip>
                                    )}
                                </Box>
                            )}
                        </>
                    )}

                    {/* Undo buttons */}
                    {strainManeuverUsed && (
                        <Box sx={{mt: 1}}>
                            <Button
                                variant="text"
                                color="warning"
                                size="small"
                                startIcon={<UndoIcon/>}
                                onClick={handleUndoStrainManeuver}
                            >
                                Undo: Cancel strain maneuver (recover the 2 strain)
                            </Button>
                        </Box>
                    )}
                    {actionAsManeuver && (
                        <Box sx={{mt: 1}}>
                            <Button
                                variant="text"
                                color="info"
                                size="small"
                                startIcon={<UndoIcon/>}
                                onClick={handleUndoActionAsManeuver}
                            >
                                Undo: Return action (give up extra maneuver)
                            </Button>
                        </Box>
                    )}
                </Box>
            )}

            <Divider sx={{mb: 3}}/>

            {/* ── ACTION SECTION ────────────────────────────────── */}
            {!hasStunned && !hasStaggered && (
                <Box sx={{mb: 3}}>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main" sx={{mb: 1}}>
                        Action
                        {actionAsManeuver && (
                            <Chip label="Used as Extra Maneuver" color="info" size="small" sx={{ml: 1}}/>
                        )}
                    </Typography>

                    {actionAsManeuver ? (
                        /* Action has been traded away */
                        <Alert severity="info" sx={{mb: 1}}>
                            Your action was used to gain a free second maneuver.
                            <Button size="small" startIcon={<UndoIcon/>} onClick={handleUndoActionAsManeuver} sx={{ml: 1}}>
                                Take action back
                            </Button>
                        </Alert>
                    ) : selectedAction ? (
                        /* Action chosen */
                        <Box sx={{p: 2, border: 1, borderColor: "primary.main", borderRadius: 1}}>
                            <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">{selectedAction.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{selectedAction.description}</Typography>
                                    <Chip label={selectedAction.category} size="small" sx={{mt: 1}}/>
                                    {selectedAction.weapon && (
                                        <Chip
                                            icon={<ShieldIcon/>}
                                            label={`Dmg ${selectedAction.weapon.damage} • Crit ${selectedAction.weapon.critical} • ${selectedAction.weapon.range}`}
                                            size="small"
                                            color="warning"
                                            sx={{mt: 1, ml: 1}}
                                        />
                                    )}
                                </Box>
                                <IconButton size="small" onClick={handleClearAction}>
                                    <ClearIcon/>
                                </IconButton>
                            </Box>

                            {diceResult && (
                                <Alert severity={diceResult.success + diceResult.triumph - diceResult.failure - diceResult.despair > 0 ? "success" : "error"} sx={{mb: 1}}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {diceResult.success + diceResult.triumph - diceResult.failure - diceResult.despair > 0 ? "SUCCESS" : "FAILURE"}
                                    </Typography>
                                    <Typography variant="caption">
                                        Net: {diceResult.success + diceResult.triumph - diceResult.failure - diceResult.despair}S /{" "}
                                        {diceResult.advantage - diceResult.threat}A
                                        {diceResult.triumph > 0 && ` / ${diceResult.triumph}⚡`}
                                        {diceResult.despair > 0 && ` / ${diceResult.despair}💀`}
                                    </Typography>
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                size="small"
                                label="Additional Details (optional)"
                                value={actionDetails}
                                onChange={(e) => setActionDetails(e.target.value)}
                                placeholder="e.g., Target: Stormtrooper #2"
                                sx={{mt: 1}}
                            />

                            {selectedAction.requiresDiceRoll && (
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<CasinoIcon/>}
                                    onClick={() => setDiceRollerOpen(true)}
                                    sx={{mt: 1}}
                                >
                                    {diceResult ? "Reroll" : "Roll Dice"}
                                </Button>
                            )}
                        </Box>
                    ) : (
                        /* No action chosen yet */
                        <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                            <Button
                                variant="contained"
                                startIcon={<AddCircleOutlineIcon/>}
                                onClick={() => setActionDialogOpen(true)}
                            >
                                Select Action
                            </Button>

                            {/* Quick weapon shortcuts */}
                            {(currentParticipant.weapons ?? []).map((w) => (
                                <Button
                                    key={w.id}
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    startIcon={<CasinoIcon/>}
                                    onClick={() => handleSelectAction(weaponToAction(w))}
                                >
                                    {w.name}
                                </Button>
                            ))}

                            {/* Option to use action as extra maneuver (only if no strain unlock active) */}
                            {!strainManeuverUsed && totalManeuvers < 2 && (
                                <Tooltip title="Give up your action to gain a free second maneuver (no strain cost). Cap is still 2 total maneuvers.">
                                    <Button
                                        variant="outlined"
                                        color="info"
                                        size="small"
                                        startIcon={<FlashOnIcon/>}
                                        onClick={handleActionAsManeuver}
                                    >
                                        Use Action as Extra Maneuver (free)
                                    </Button>
                                </Tooltip>
                            )}
                        </Box>
                    )}
                </Box>
            )}

            {/* Participant abilities reference (incidentals shown read-only) */}
            {(currentParticipant.abilities ?? []).filter((a) => a.activationType === "incidental").length > 0 && (
                <>
                    <Divider sx={{mb: 2}}/>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Incidental Abilities
                        </Typography>
                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                            {(currentParticipant.abilities ?? [])
                                .filter((a) => a.activationType === "incidental")
                                .map((a) => (
                                    <Tooltip key={a.id} title={a.description} arrow>
                                        <Chip label={a.name} size="small" variant="outlined" color="secondary"/>
                                    </Tooltip>
                                ))}
                        </Box>
                    </Box>
                </>
            )}

            {/* Complete / Skip buttons */}
            <Box sx={{display: "flex", justifyContent: "space-between", mt: 3}}>
                <Button variant="outlined" onClick={onSkip}>Skip Turn</Button>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<CheckCircleIcon/>}
                    onClick={handleComplete}
                    disabled={!hasCompletedTurn}
                >
                    Complete Turn
                </Button>
            </Box>

            {/* Dialogs */}
            {renderManeuverDialog()}
            {renderActionDialog()}

            {diceRollerOpen && selectedAction && (
                <DiceRoller
                    open={diceRollerOpen}
                    participantName={currentParticipant.name}
                    rollType="action"
                    onClose={() => setDiceRollerOpen(false)}
                    onRollComplete={handleDiceRolled}
                />
            )}

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
