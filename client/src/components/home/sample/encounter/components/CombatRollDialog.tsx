import React, { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CasinoIcon from "@mui/icons-material/Casino";
import {
    useExecuteMeleeAttack,
    useExecuteRangedAttack,
    useResolveChoices,
} from "../../../../../api/generated/dice/dice";
import type {
    CombatLogEntry,
    CombatRollRequest,
    ResolveChoicesRequest,
    RollEvaluationResponse,
    SelectedChoice,
    SpendOption,
} from "../../../../../api/model";

// ── helpers ────────────────────────────────────────────────────────────────────

/** Returns true when the weapon skill name suggests a melee attack. */
function isMeleeSkill(skillName: string): boolean {
    const lower = skillName.toLowerCase();
    return lower.includes("melee") || lower.includes("brawl");
}

function netSuccess(r: RollEvaluationResponse["results"]): number {
    if (!r) return 0;
    return r.success + r.triumph - r.failure - r.despair;
}

// ── types ──────────────────────────────────────────────────────────────────────

export interface CombatRollDialogProps {
    open: boolean;
    onClose: () => void;
    /** ID of the attacker participant (for the API call). */
    attackerId: string;
    attackerName: string;
    /** ID of the weapon item (for the API call). */
    weaponInstanceId: string;
    weaponName: string;
    /** Skill name string, e.g. "Melee", "Ranged (Heavy)" — used to route to the correct endpoint. */
    weaponSkillName: string;
    /** ID of the target enemy participant (for the API call). */
    targetEnemyInstanceId: string;
    targetName: string;
    /** Fired after the resolve step completes with the backend CombatLogEntry. */
    onResolved: (entry: CombatLogEntry) => void;
}

const STEPS = ["Roll", "Spend", "Resolve"];

// ── component ─────────────────────────────────────────────────────────────────

export const CombatRollDialog: React.FC<CombatRollDialogProps> = ({
    open,
    onClose,
    attackerId,
    attackerName,
    weaponInstanceId,
    weaponName,
    weaponSkillName,
    targetEnemyInstanceId,
    targetName,
    onResolved,
}) => {
    const [step, setStep] = useState(0);
    const [envSetback, setEnvSetback] = useState(0);
    const [sitBoost, setSitBoost] = useState(0);
    const [rollResponse, setRollResponse] = useState<RollEvaluationResponse | null>(null);
    /** name → count */
    const [selectedChoices, setSelectedChoices] = useState<Record<string, number>>({});
    const [resolvedEntry, setResolvedEntry] = useState<CombatLogEntry | null>(null);

    const melee = useExecuteMeleeAttack();
    const ranged = useExecuteRangedAttack();
    const resolveM = useResolveChoices();

    const isRolling = melee.isPending || ranged.isPending;
    const rollError = melee.error ?? ranged.error;
    const isResolving = resolveM.isPending;
    const resolveError = resolveM.error;

    // ── handlers ────────────────────────────────────────────────────────────

    const handleRoll = async () => {
        const req: CombatRollRequest = {
            attackerId,
            weaponInstanceId,
            targetEnemyInstanceId,
            environmentalSetbackDice: envSetback,
            situationalBoostDice: sitBoost,
        };
        try {
            const resp = isMeleeSkill(weaponSkillName)
                ? await melee.mutateAsync({ data: req })
                : await ranged.mutateAsync({ data: req });
            setRollResponse(resp.data);
            setSelectedChoices({});
            setStep(1);
        } catch {
            // error surfaced via rollError
        }
    };

    const handleSpendChange = (option: SpendOption, delta: number) => {
        const name = option.name ?? "";
        const max = option.repeatable ? 99 : 1;
        setSelectedChoices((prev) => {
            const cur = prev[name] ?? 0;
            const next = Math.max(0, Math.min(max, cur + delta));
            if (next === 0) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [name]: _removed, ...rest } = prev;
                return rest;
            }
            return { ...prev, [name]: next };
        });
    };

    const handleResolve = async () => {
        if (!rollResponse?.rollSessionId) return;
        const choices: SelectedChoice[] = Object.entries(selectedChoices).map(
            ([name, count]) => ({ name, count })
        );
        const req: ResolveChoicesRequest = {
            rollSessionId: rollResponse.rollSessionId,
            attackerId,
            targetEnemyInstanceId,
            selectedChoices: choices,
        };
        try {
            const resp = await resolveM.mutateAsync({ data: req });
            setResolvedEntry(resp.data);
            setStep(2);
        } catch {
            // error surfaced via resolveError
        }
    };

    const handleDone = () => {
        if (resolvedEntry) onResolved(resolvedEntry);
        // reset internal state
        setStep(0);
        setRollResponse(null);
        setSelectedChoices({});
        setResolvedEntry(null);
        setEnvSetback(0);
        setSitBoost(0);
        onClose();
    };

    // ── sub-renders ─────────────────────────────────────────────────────────

    const renderSymbolChips = (res: RollEvaluationResponse["results"]) => {
        if (!res) return null;
        const net = netSuccess(res);
        const netAdv = res.advantage - res.threat;
        return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                <Chip label={`Net Success: ${net}`} color={net >= 0 ? "success" : "error"} />
                <Chip label={`Net Advantage: ${netAdv}`} color={netAdv >= 0 ? "info" : "warning"} />
                {res.triumph > 0 && (
                    <Chip label={`Triumph ×${res.triumph}`} color="success" variant="outlined" />
                )}
                {res.despair > 0 && (
                    <Chip label={`Despair ×${res.despair}`} color="error" variant="outlined" />
                )}
            </Box>
        );
    };

    const renderRollStep = () => (
        <Box>
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    <strong>Attacker:</strong> {attackerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Target:</strong> {targetName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Weapon:</strong> {weaponName} ({weaponSkillName})
                </Typography>
            </Paper>

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Env. Setback Dice"
                        type="number"
                        value={envSetback}
                        inputProps={{ min: 0 }}
                        onChange={(e) =>
                            setEnvSetback(Math.max(0, parseInt(e.target.value) || 0))
                        }
                    />
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Situational Boost Dice"
                        type="number"
                        value={sitBoost}
                        inputProps={{ min: 0 }}
                        onChange={(e) =>
                            setSitBoost(Math.max(0, parseInt(e.target.value) || 0))
                        }
                    />
                </Grid>
            </Grid>

            {!!rollError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Roll failed — check your connection and try again.
                </Alert>
            )}

            <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={
                    isRolling ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        <CasinoIcon />
                    )
                }
                onClick={handleRoll}
                disabled={isRolling}
            >
                {isRolling ? "Rolling…" : `Roll ${weaponSkillName} Attack`}
            </Button>
        </Box>
    );

    const renderSpendStep = () => {
        const spendOptions = rollResponse?.spendOptions ?? [];
        const isHit =
            netSuccess(rollResponse?.results) > 0;

        return (
            <Box>
                {/* Result summary */}
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        backgroundColor: isHit ? "success.dark" : "error.dark",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" align="center">
                        {isHit ? "✓ HIT" : "✗ MISS"}
                    </Typography>
                    {renderSymbolChips(rollResponse?.results)}
                    {(rollResponse?.finalWoundsInflicted ?? 0) > 0 && (
                        <Chip
                            label={`Base wounds: ${rollResponse!.finalWoundsInflicted}`}
                            color="error"
                            sx={{ mt: 1 }}
                        />
                    )}
                </Paper>

                {/* Spend options */}
                {spendOptions.length > 0 ? (
                    <>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Spend Options
                        </Typography>
                        {spendOptions.map((opt) => {
                            const name = opt.name ?? "";
                            const count = selectedChoices[name] ?? 0;
                            return (
                                <Card
                                    key={name}
                                    variant="outlined"
                                    sx={{
                                        mb: 1,
                                        border: count > 0 ? 2 : 1,
                                        borderColor:
                                            count > 0 ? "primary.main" : "divider",
                                    }}
                                >
                                    <CardContent
                                        sx={{ py: 1, "&:last-child": { pb: 1 } }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Box sx={{ flexGrow: 1, mr: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                >
                                                    {name}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 0.5,
                                                        mt: 0.5,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Chip
                                                        label={`${opt.amount} ${opt.type}`}
                                                        size="small"
                                                    />
                                                    {opt.repeatable && (
                                                        <Chip
                                                            label="Repeatable"
                                                            size="small"
                                                            color="info"
                                                        />
                                                    )}
                                                </Box>
                                            </Box>

                                            {opt.repeatable ? (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            handleSpendChange(opt, -1)
                                                        }
                                                        disabled={count === 0}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            minWidth: 24,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {count}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            handleSpendChange(opt, 1)
                                                        }
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                            ) : (
                                                <Button
                                                    size="small"
                                                    variant={
                                                        count > 0
                                                            ? "contained"
                                                            : "outlined"
                                                    }
                                                    onClick={() =>
                                                        handleSpendChange(
                                                            opt,
                                                            count > 0 ? -1 : 1
                                                        )
                                                    }
                                                >
                                                    {count > 0 ? "✓ Selected" : "Select"}
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </>
                ) : (
                    <Alert severity="info">
                        No spend options available — proceed to resolve.
                    </Alert>
                )}
            </Box>
        );
    };

    const renderResolveStep = () => (
        <Box>
            {isResolving && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 4,
                        gap: 2,
                    }}
                >
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary">
                        Resolving…
                    </Typography>
                </Box>
            )}

            {!!resolveError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Resolve failed — check your connection and try again.
                </Alert>
            )}

            {resolvedEntry && (
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Combat Outcome
                    </Typography>

                    {resolvedEntry.narrativeLines?.map((line, i) => (
                        <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                            {line}
                        </Typography>
                    ))}

                    {resolvedEntry.finalSummary && (
                        <>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography variant="body1" fontWeight="bold">
                                {resolvedEntry.finalSummary}
                            </Typography>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );

    // ── render ───────────────────────────────────────────────────────────────

    return (
        <Dialog
            open={open}
            onClose={step === 0 ? onClose : undefined}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                ⚔️ Combat Attack
                <Typography variant="body2" color="text.secondary">
                    {attackerName} → {targetName} with {weaponName}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stepper activeStep={step} sx={{ mb: 3 }}>
                    {STEPS.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {step === 0 && renderRollStep()}
                {step === 1 && renderSpendStep()}
                {step === 2 && renderResolveStep()}
            </DialogContent>

            <DialogActions>
                {step === 0 && (
                    <Button onClick={onClose} disabled={isRolling}>
                        Cancel
                    </Button>
                )}
                {step === 1 && (
                    <>
                        <Button onClick={() => setStep(0)}>Back</Button>
                        <Button
                            variant="contained"
                            startIcon={
                                isResolving ? (
                                    <CircularProgress size={18} color="inherit" />
                                ) : (
                                    <CheckCircleIcon />
                                )
                            }
                            onClick={handleResolve}
                            disabled={isResolving}
                        >
                            {isResolving ? "Resolving…" : "Confirm & Resolve"}
                        </Button>
                    </>
                )}
                {step === 2 && !isResolving && (
                    <Button
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        onClick={handleDone}
                        disabled={!resolvedEntry && !resolveError}
                    >
                        Done
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};



