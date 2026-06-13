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
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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
import {CombatRollDialog} from "./CombatRollDialog";
import {
    type Activation,
    type CombatLogEntry as ApiCombatLogEntry,
    type GenesysSymbolResults,
    type Participant,
    type RangeBand, type StatusEffect,
    StatusEffectType
} from "../../../../../api/model";
import type {EncounterAction, EncounterManeuver, EncounterRangeBand, TurnAction, Weapon} from "../SampleEncounterManager.tsx";
import type {Weapon as ApiWeapon} from "../../../../../api/model";

// Range order for comparison — lower index = closer
const RANGE_ORDER: RangeBand[] = ["Engaged", "Short", "Medium", "Long", "Extreme"];

function getRangeBetween(
    attackerId: string,
    targetId: string,
    rangeBands: EncounterRangeBand[]
): RangeBand | null {
    const found = rangeBands.find(
        (r) =>
            (r.participantId === attackerId && r.targetId === targetId) ||
            (r.participantId === targetId && r.targetId === attackerId)
    );
    return found?.range ?? null;
}

/** Returns true if weaponRange can reach targetRange */
function isInRange(weaponRange: RangeBand, targetRange: RangeBand): boolean {
    return RANGE_ORDER.indexOf(targetRange) <= RANGE_ORDER.indexOf(weaponRange);
}

interface TurnActionsProps {
    currentParticipant: Participant;
    slotId: string;
    round: number;
    availableActions: EncounterAction[];
    availableManeuvers: EncounterManeuver[];
    participants: Participant[];
    rangeBands: EncounterRangeBand[];
    onComplete: (turnAction: TurnAction) => void;
    onSkip: () => void;
    /** Optional: called when a weapon attack fully resolves via the backend API. */
    onApiCombatLogEntry?: (entry: ApiCombatLogEntry) => void;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Convert an API Weapon (skill as Skill object) to an EncounterAction. */
function apiWeaponToEncounterAction(weapon: ApiWeapon): EncounterAction {
    const localWeapon: Weapon = {
        id: weapon.id,
        name: weapon.name,
        skill: weapon.skill?.name ?? "Unknown",
        damage: weapon.damage,
        critical: weapon.critical,
        range: weapon.range,
        qualities: weapon.qualities?.map((q) => q.name),
    };
    return {
        id: `weapon-${weapon.id}`,
        name: weapon.name,
        description: `${localWeapon.skill} • Dmg ${weapon.damage} • Crit ${weapon.critical} • ${weapon.range}${localWeapon.qualities?.length ? " • " + localWeapon.qualities.join(", ") : ""}`,
        category: "combat",
        requiresDiceRoll: true,
        weapon: localWeapon,
    };
}

// ─── component ────────────────────────────────────────────────────────────────

export const TurnActions: React.FC<TurnActionsProps> = ({
                                                             currentParticipant,
                                                             slotId,
                                                             round,
                                                             availableActions,
                                                             availableManeuvers,
                                                             participants,
                                                             rangeBands,
                                                             onComplete,
                                                             onSkip,
                                                             onApiCombatLogEntry,
                                                         }) => {
    // ── maneuver state ──────────────────────────────────────────────────────
    const [selectedManeuvers, setSelectedManeuvers] = useState<EncounterManeuver[]>([]);
    const [maneuverDetails, setManeuverDetails] = useState<Record<string, string>>({});
    const [strainManeuverUsed, setStrainManeuverUsed] = useState(false);
    const [actionAsManeuver, setActionAsManeuver] = useState(false);

    // ── action state ────────────────────────────────────────────────────────
    const [selectedAction, setSelectedAction] = useState<EncounterAction | null>(null);
    const [actionDetails, setActionDetails] = useState("");
    const [diceResult, setDiceResult] = useState<GenesysSymbolResults | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<Participant | null>(null);

    // ── dialog state ────────────────────────────────────────────────────────
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [maneuverDialogOpen, setManeuverDialogOpen] = useState(false);
    const [diceRollerOpen, setDiceRollerOpen] = useState(false);
    const [diceResultsDialogOpen, setDiceResultsDialogOpen] = useState(false);
    const [combatRollOpen, setCombatRollOpen] = useState(false);

    // ── derived ─────────────────────────────────────────────────────────────
    const totalManeuvers = selectedManeuvers.length;
    const maxManeuvers = strainManeuverUsed || actionAsManeuver ? 2 : 1;
    const canAddManeuver = totalManeuvers < maxManeuvers;

    // Stunned is not in the current StatusEffectType enum — default to false
    const hasStunned = false;
    const hasStaggered = currentParticipant.statusEffects.some((e: StatusEffect) => e.type === StatusEffectType.Staggered);
    const hasDisoriented = currentParticipant.statusEffects.some((e: StatusEffect) => e.type === StatusEffectType.Disoriented);
    const hasImmobilized = currentParticipant.statusEffects.some((e: StatusEffect) => e.type === StatusEffectType.Immobilized);

    // Build enriched action/maneuver lists from participant's API equipment
    const participantWeaponActions: EncounterAction[] = (currentParticipant.equipment?.weapons ?? []).map(apiWeaponToEncounterAction);
    const participantAbilityActions: EncounterAction[] = (currentParticipant.abilities ?? [])
        .map((a): EncounterAction | null => {
            if (a.activation !== ("Active (Action)" as Activation)) return null;
            return { id: `ability-${a.name}`, name: a.name, description: a.description, category: "other", requiresDiceRoll: false };
        })
        .filter((a): a is EncounterAction => a !== null);
    const participantAbilityManeuvers: EncounterManeuver[] = (currentParticipant.abilities ?? [])
        .map((a): EncounterManeuver | null => {
            if (a.activation !== ("Active (Maneuver)" as Activation)) return null;
            return { id: `ability-${a.name}`, name: a.name, description: a.description, category: "other" };
        })
        .filter((m): m is EncounterManeuver => m !== null);

    // Combined maneuver/action lists (prop + participant abilities)
    const allManeuvers: EncounterManeuver[] = [...availableManeuvers, ...participantAbilityManeuvers];

    // ── maneuver handlers ───────────────────────────────────────────────────

    const handleAddManeuver = (maneuver: EncounterManeuver) => {
        if (canAddManeuver) {
            setSelectedManeuvers((prev) => [...prev, maneuver]);
        }
        setManeuverDialogOpen(false);
    };

    const handleRemoveManeuver = (index: number) => {
        setSelectedManeuvers((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUseStrainForSecond = () => {
        setStrainManeuverUsed(true);
        setActionAsManeuver(false);
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    const handleUndoStrainManeuver = () => {
        setStrainManeuverUsed(false);
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    // ── action handlers ─────────────────────────────────────────────────────

    const handleSelectAction = (action: EncounterAction) => {
        setSelectedAction(action);
        setSelectedTarget(null);
        setActionDialogOpen(false);
        // For weapon attacks the dice roll is triggered after target selection;
        // for other roll-required actions use the existing local DiceRoller.
        if (action.requiresDiceRoll && !action.weapon) {
            setDiceRollerOpen(true);
        }
    };

    const handleClearAction = () => {
        setSelectedAction(null);
        setActionDetails("");
        setDiceResult(null);
        setSelectedTarget(null);
    };

    const handleActionAsManeuver = () => {
        setActionAsManeuver(true);
        setStrainManeuverUsed(false);
        handleClearAction();
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    const handleUndoActionAsManeuver = () => {
        setActionAsManeuver(false);
        if (selectedManeuvers.length === 2) {
            setSelectedManeuvers((prev) => prev.slice(0, 1));
        }
    };

    const handleDiceRolled = (result: GenesysSymbolResults | { success: number; advantage: number }) => {
        const fullResult: GenesysSymbolResults = {
            success: result.success,
            advantage: result.advantage,
            triumph: ('triumph' in result) ? result.triumph : 0,
            failure: ('failure' in result) ? result.failure : 0,
            threat: ('threat' in result) ? result.threat : 0,
            despair: ('despair' in result) ? result.despair : 0,
        };
        setDiceResult(fullResult);
        setDiceRollerOpen(false);
        setDiceResultsDialogOpen(true);
    };

    const handleAdvantageSpent = () => {
        setDiceResultsDialogOpen(false);
    };

    /** Called when CombatRollDialog finishes all three phases. */
    const handleCombatRollResolved = (entry: ApiCombatLogEntry) => {
        setCombatRollOpen(false);
        onApiCombatLogEntry?.(entry);
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
                        targetId: selectedTarget?.id,
                        targetName: selectedTarget?.name,
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

    // ── target helpers ───────────────────────────────────────────────────────

    const isCombatAction = (action: EncounterAction) =>
        action.category === "combat" && (action.requiresDiceRoll || !!action.weapon);

    const opponents = participants.filter(
        (p) => p.type !== currentParticipant.type && p.id !== currentParticipant.id
    );

    const getAvailableTargets = (action: EncounterAction): { participant: Participant; range: RangeBand | null; inRange: boolean }[] => {
        return opponents.map((p) => {
            const range = getRangeBetween(currentParticipant.id, p.id, rangeBands);
            const inRange = action.weapon
                ? range !== null && isInRange(action.weapon.range, range)
                : true;
            return {participant: p, range, inRange};
        });
    };

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
                                            <Chip label="Select Target to Roll" size="small" icon={<CasinoIcon/>} sx={{mt: 1}}/>
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
            {hasDisoriented && !hasStunned && (
                <Alert severity="warning" sx={{mb: 2}}>
                    <strong>DISORIENTED:</strong> Add setback die to all checks.
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

                    {totalManeuvers === 1 && (
                        <>
                            {canAddManeuver ? (
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
                        <Alert severity="info" sx={{mb: 1}}>
                            Your action was used to gain a free second maneuver.
                            <Button size="small" startIcon={<UndoIcon/>} onClick={handleUndoActionAsManeuver} sx={{ml: 1}}>
                                Take action back
                            </Button>
                        </Alert>
                    ) : selectedAction ? (
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

                            {/* ── Target selection for combat actions ── */}
                            {isCombatAction(selectedAction) && (() => {
                                const targets = getAvailableTargets(selectedAction);
                                const hasAnyTarget = targets.length > 0;
                                const hasInRange = targets.some((t) => t.inRange);
                                return (
                                    <FormControl fullWidth sx={{mt: 1, mb: 1}}>
                                        <InputLabel>Target</InputLabel>
                                        <Select
                                            value={selectedTarget?.id ?? ""}
                                            label="Target"
                                            onChange={(e) => {
                                                const t = opponents.find((p) => p.id === e.target.value) ?? null;
                                                setSelectedTarget(t);
                                            }}
                                        >
                                            <MenuItem value=""><em>— Select a target —</em></MenuItem>
                                            {targets.map(({participant, range, inRange}) => {
                                                const woundThreshold = participant.derivedStats?.woundThreshold;
                                                const defeated = woundThreshold
                                                    ? woundThreshold.current >= woundThreshold.total
                                                    : false;
                                                const rangeLabel = range ?? "Unknown range";
                                                const outOfRange = selectedAction.weapon && !inRange;
                                                return (
                                                    <MenuItem
                                                        key={participant.id}
                                                        value={participant.id}
                                                        disabled={defeated || !!outOfRange}
                                                    >
                                                        <Box sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
                                                            <Typography variant="body2" sx={{flexGrow: 1}}>
                                                                {participant.name}
                                                            </Typography>
                                                            <Chip
                                                                label={rangeLabel}
                                                                size="small"
                                                                sx={{fontSize: "0.7rem"}}
                                                                color={
                                                                    outOfRange ? "error"
                                                                        : range === "Engaged" ? "default"
                                                                            : range === "Short" ? "warning"
                                                                                : "info"
                                                                }
                                                            />
                                                            {defeated && <Chip label="Defeated" size="small" color="error"/>}
                                                            {outOfRange && <Chip label="Out of range" size="small" color="error" variant="outlined"/>}
                                                        </Box>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                        {!hasAnyTarget && (
                                            <FormHelperText>No valid targets found</FormHelperText>
                                        )}
                                        {hasAnyTarget && !hasInRange && selectedAction.weapon && (
                                            <FormHelperText error>
                                                No targets within {selectedAction.weapon.range} range — adjust range bands first
                                            </FormHelperText>
                                        )}
                                        {selectedTarget && (
                                            <FormHelperText sx={{color: "success.main"}}>
                                                Targeting: {selectedTarget.name}
                                                {selectedAction.weapon && ` • Weapon range: ${selectedAction.weapon.range}`}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                );
                            })()}

                            {/* ── Weapon attack: launch CombatRollDialog once target is set ── */}
                            {selectedAction.weapon && selectedTarget && (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    startIcon={<CasinoIcon/>}
                                    onClick={() => setCombatRollOpen(true)}
                                    sx={{mt: 1}}
                                >
                                    Roll Attack vs {selectedTarget.name}
                                </Button>
                            )}

                            {/* ── Non-weapon dice roll ── */}
                            {!selectedAction.weapon && diceResult && (
                                <Alert severity={diceResult.success + diceResult.triumph - diceResult.failure - diceResult.despair > 0 ? "success" : "error"} sx={{mb: 1}}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {diceResult.success + diceResult.triumph - diceResult.failure - diceResult.despair > 0 ? "SUCCESS" : "FAILURE"}
                                    </Typography>
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                size="small"
                                label="Additional Details (optional)"
                                value={actionDetails}
                                onChange={(e) => setActionDetails(e.target.value)}
                                placeholder="e.g., Aim at the head"
                                sx={{mt: 1}}
                            />

                            {!selectedAction.weapon && selectedAction.requiresDiceRoll && (
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
                        <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                            <Button
                                variant="contained"
                                startIcon={<AddCircleOutlineIcon/>}
                                onClick={() => setActionDialogOpen(true)}
                            >
                                Select Action
                            </Button>

                            {/* Quick weapon shortcuts */}
                            {(currentParticipant.equipment?.weapons ?? []).map((w) => (
                                <Button
                                    key={w.id}
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    startIcon={<CasinoIcon/>}
                                    onClick={() => handleSelectAction(apiWeaponToEncounterAction(w))}
                                >
                                    {w.name}
                                </Button>
                            ))}

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
            {(currentParticipant.abilities ?? []).filter((a) => a.activation === "Active (Incidental)").length > 0 && (
                <>
                    <Divider sx={{mb: 2}}/>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Incidental Abilities
                        </Typography>
                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                            {(currentParticipant.abilities ?? [])
                                .filter((a) => a.activation === "Active (Incidental)")
                             .map((a) => (
                                     <Tooltip key={a.name} title={a.description} arrow>
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

            {/* ── Combat Roll Dialog (weapon attacks via backend API) ── */}
            {combatRollOpen && selectedAction?.weapon && selectedTarget && (
                <CombatRollDialog
                    open={combatRollOpen}
                    onClose={() => setCombatRollOpen(false)}
                    attackerId={currentParticipant.id}
                    attackerName={currentParticipant.name}
                    weaponInstanceId={selectedAction.weapon.id}
                    weaponName={selectedAction.weapon.name}
                    weaponSkillName={selectedAction.weapon.skill}
                    targetEnemyInstanceId={selectedTarget.id}
                    targetName={selectedTarget.name}
                    onResolved={handleCombatRollResolved}
                />
            )}
        </Paper>
    );
};
