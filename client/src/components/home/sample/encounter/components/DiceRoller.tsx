import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    TextField,
    Grid,
    Paper,
    Chip,
    Alert,
    CircularProgress,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import {convertGenesysText} from "../../../../../util/GenesysTextHelper.ts";
import DOMPurify from "dompurify";
import type {GenesysSymbolResults} from "../../../../../api/model";
import {
    useExecuteMeleeAttack,
    useExecuteRangedAttack,
    useRollInitiative,
} from "../../../../../api/generated/dice/dice";

/** Skill data needed to build an initiative dice pool. */
export interface EncounterSkill {
    id: string;
    name: string;
    rank: number;
    characteristic: number;
}

// ── Dice pool helper ───────────────────────────────────────────────────────

export function computeDicePool(skill: EncounterSkill): { ability: number; proficiency: number } {
    const proficiency = Math.min(skill.characteristic, skill.rank);
    const ability     = Math.max(skill.characteristic, skill.rank) - proficiency;
    return { ability, proficiency };
}

/** Returns true when the weapon skill name suggests a melee attack. */
function isMeleeSkill(skillName: string): boolean {
    const lower = skillName.toLowerCase();
    return lower.includes("melee") || lower.includes("brawl");
}

// ── Component ──────────────────────────────────────────────────────────────

interface DiceRollerProps {
    open: boolean;
    participantName: string;
    rollType: "initiative" | "action";
    initiativeSkills?: EncounterSkill[];
    initialSkillId?: string;
    onClose: () => void;
    onRollComplete: (
        result: GenesysSymbolResults | { success: number; advantage: number }
    ) => void;
    /** When provided for initiative rolls, the backend /dice/initiative endpoint is used. */
    participantId?: string;
    /** When provided for action rolls, the backend /combat/melee or /combat/ranged endpoint is used. */
    attackerId?: string;
    weaponInstanceId?: string;
    targetEnemyInstanceId?: string;
    weaponSkillName?: string;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
    open,
    participantName,
    rollType,
    initiativeSkills,
    initialSkillId,
    onClose,
    onRollComplete,
    participantId,
    attackerId,
    weaponInstanceId,
    targetEnemyInstanceId,
    weaponSkillName,
}) => {
    const [result, setResult] = useState<GenesysSymbolResults>({
        success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0,
    });
    const [rolled, setRolled] = useState(false);
    const [backendError, setBackendError] = useState<string | null>(null);
    const [selectedSkillId] = useState<string>(
        initialSkillId ?? initiativeSkills?.[0]?.id ?? ""
    );

    const meleeAttack = useExecuteMeleeAttack();
    const rangedAttack = useExecuteRangedAttack();
    const initiativeRoll = useRollInitiative();

    const selectedSkill = initiativeSkills?.find((s) => s.id === selectedSkillId) ?? null;
    const dicePool = selectedSkill ? computeDicePool(selectedSkill) : null;

    /** True when we have all the data needed to call the backend combat endpoint. */
    const canUseBackend =
        rollType === "action" &&
        !!attackerId &&
        !!weaponInstanceId &&
        !!targetEnemyInstanceId &&
        !!weaponSkillName;

    /** True when we have all the data needed to call the backend initiative endpoint. */
    const canUseBackendInitiative =
        rollType === "initiative" &&
        !!participantId &&
        !!selectedSkill;

    const isBackendRolling = meleeAttack.isPending || rangedAttack.isPending || initiativeRoll.isPending;

    const diceLabel = dicePool
        ? [
            ...Array(dicePool.ability).fill("[ability]"),
            ...Array(dicePool.proficiency).fill("[proficiency]"),
          ].join(" ") || "—"
        : rollType === "initiative"
        ? "[ability] [proficiency]"
        : "[ability] [proficiency] [difficulty] [challenge]";

    const handleAutoRoll = async () => {
        setBackendError(null);

        if (canUseBackendInitiative) {
            // ── Backend roll via /dice/initiative ──
            try {
                const resp = await initiativeRoll.mutateAsync({
                    data: {
                        participantId: participantId!,
                        initiativeSkillName: selectedSkill!.name,
                    },
                });
                const r = resp.data.results;
                if (r) {
                    setResult({
                        success:   r.success   ?? 0,
                        advantage: r.advantage ?? 0,
                        triumph:   r.triumph   ?? 0,
                        failure:   r.failure   ?? 0,
                        threat:    r.threat    ?? 0,
                        despair:   r.despair   ?? 0,
                    });
                    setRolled(true);
                }
            } catch {
                setBackendError("Initiative roll failed — check your connection and try again.");
            }
            return;
        }

        if (canUseBackend) {
            // ── Backend roll via /combat/melee or /combat/ranged ──
            const req = {
                attackerId: attackerId!,
                weaponInstanceId: weaponInstanceId!,
                targetEnemyInstanceId: targetEnemyInstanceId!,
            };
            try {
                const resp = isMeleeSkill(weaponSkillName!)
                    ? await meleeAttack.mutateAsync({ data: req })
                    : await rangedAttack.mutateAsync({ data: req });

                const r = resp.data.results;
                if (r) {
                    setResult({
                        success:   r.success   ?? 0,
                        advantage: r.advantage ?? 0,
                        triumph:   r.triumph   ?? 0,
                        failure:   r.failure   ?? 0,
                        threat:    r.threat    ?? 0,
                        despair:   r.despair   ?? 0,
                    });
                    setRolled(true);
                }
            } catch {
                setBackendError("Backend roll failed — check your connection and try again.");
            }
            return;
        }

        // No local simulation — only manual entry is available when no backend context is provided.
    };

    const handleManualUpdate = (field: keyof GenesysSymbolResults, value: number) => {
        setResult((prev) => ({ ...prev, [field]: Math.max(0, value) }));
        setRolled(true);
    };

    const handleConfirm = () => {
        if (rollType === "initiative") {
            onRollComplete({ success: result.success, advantage: result.advantage });
        } else {
            onRollComplete(result);
        }
        setResult({ success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0 });
        setRolled(false);
        setBackendError(null);
    };

    const netSuccess  = result.success + result.triumph - result.failure - result.despair;
    const netAdvantage = result.advantage - result.threat;
    const isSuccess   = netSuccess > 0;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Roll {rollType === "initiative" ? "Initiative" : "Dice"}: {participantName}
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    {/* ── Dice pool preview (initiative) ── */}
                    {rollType === "initiative" && selectedSkill && dicePool && (
                        <Paper
                            variant="outlined"
                            sx={{ p: 2, mb: 2, textAlign: "center", backgroundColor: "grey.50" }}
                        >
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                                Dice pool for <strong>{selectedSkill.name}</strong> (Rank {selectedSkill.rank}, Characteristic {selectedSkill.characteristic})
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                {dicePool.proficiency > 0 && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#b8860b" }}>
                                            {dicePool.proficiency}×
                                        </Typography>
                                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertGenesysText("[proficiency]"), { ALLOWED_TAGS: ["i", "b"], ALLOWED_ATTR: ["class"] }) }} />
                                        <Typography variant="caption" color="text.secondary">Proficiency</Typography>
                                    </Box>
                                )}
                                {dicePool.proficiency > 0 && dicePool.ability > 0 && (
                                    <Typography variant="h6" color="text.secondary">+</Typography>
                                )}
                                {dicePool.ability > 0 && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#2e7d32" }}>
                                            {dicePool.ability}×
                                        </Typography>
                                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertGenesysText("[ability]"), { ALLOWED_TAGS: ["i", "b"], ALLOWED_ATTR: ["class"] }) }} />
                                        <Typography variant="caption" color="text.secondary">Ability</Typography>
                                    </Box>
                                )}
                                {dicePool.proficiency === 0 && dicePool.ability === 0 && (
                                    <Typography variant="body2" color="text.secondary">No dice (Rank 0 / Characteristic 0)</Typography>
                                )}
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                                Total: {dicePool.proficiency + dicePool.ability} dice
                                {dicePool.proficiency > 0 && ` (${dicePool.proficiency} yellow, ${dicePool.ability} green)`}
                            </Typography>
                        </Paper>
                    )}

                    {rollType === "initiative" && !selectedSkill && (
                        <Alert severity="info" sx={{ mb: 2 }}>Roll Cool or Vigilance for initiative</Alert>
                    )}
                    {canUseBackendInitiative && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                            Dice will be rolled by the server via <strong>/dice/initiative</strong>
                        </Alert>
                    )}
                    {rollType === "action" && canUseBackend && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                            Dice will be rolled by the server via&nbsp;
                            <strong>/combat/{isMeleeSkill(weaponSkillName!) ? "melee" : "ranged"}</strong>
                        </Alert>
                    )}
                    {rollType === "action" && !canUseBackend && (
                        <Alert severity="info" sx={{ mb: 2 }}>Roll for your action check</Alert>
                    )}

                    {backendError && (
                        <Alert severity="error" sx={{ mb: 2 }}>{backendError}</Alert>
                    )}

                    {(canUseBackend || canUseBackendInitiative) && (
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={
                                isBackendRolling
                                    ? <CircularProgress size={20} color="inherit" />
                                    : <CasinoIcon />
                            }
                            onClick={handleAutoRoll}
                            disabled={isBackendRolling}
                            sx={{ mb: 2 }}
                        >
                            {isBackendRolling ? (
                                "Rolling…"
                            ) : (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    Roll&nbsp;
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                convertGenesysText(diceLabel),
                                                { ALLOWED_TAGS: ["i", "b"], ALLOWED_ATTR: ["class"] }
                                            ),
                                        }}
                                    />
                                </Box>
                            )}
                        </Button>
                    )}

                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                        Or enter results manually:
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField fullWidth label="Success" type="number" value={result.success}
                            onChange={(e) => handleManualUpdate("success", parseInt(e.target.value) || 0)}
                            inputProps={{ min: 0 }} />
                    </Grid>
                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField fullWidth label="Advantage" type="number" value={result.advantage}
                            onChange={(e) => handleManualUpdate("advantage", parseInt(e.target.value) || 0)}
                            inputProps={{ min: 0 }} />
                    </Grid>

                    {rollType === "action" && (
                        <>
                            <Grid size={{xs: 6}} sx={{mt: 4}}>
                                <TextField fullWidth label="Triumph" type="number" value={result.triumph}
                                    onChange={(e) => handleManualUpdate("triumph", parseInt(e.target.value) || 0)}
                                    inputProps={{ min: 0 }} />
                            </Grid>
                            <Grid size={{xs: 6}} sx={{mt: 4}}>
                                <TextField fullWidth label="Failure" type="number" value={result.failure}
                                    onChange={(e) => handleManualUpdate("failure", parseInt(e.target.value) || 0)}
                                    inputProps={{ min: 0 }} />
                            </Grid>
                            <Grid size={{xs: 6}} sx={{mt: 4}}>
                                <TextField fullWidth label="Threat" type="number" value={result.threat}
                                    onChange={(e) => handleManualUpdate("threat", parseInt(e.target.value) || 0)}
                                    inputProps={{ min: 0 }} />
                            </Grid>
                            <Grid size={{xs: 6}} sx={{mt: 4}}>
                                <TextField fullWidth label="Despair" type="number" value={result.despair}
                                    onChange={(e) => handleManualUpdate("despair", parseInt(e.target.value) || 0)}
                                    inputProps={{ min: 0 }} />
                            </Grid>
                        </>
                    )}
                </Grid>

                {rolled && (
                    <Paper sx={{ p: 2, mt: 2, backgroundColor: isSuccess ? "success.light" : "error.light" }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Result: {isSuccess ? "SUCCESS" : "FAILURE"}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
                            <Chip label={`Net Success: ${netSuccess}`}   color={netSuccess  > 0 ? "success" : "error"} />
                            <Chip label={`Net Advantage: ${netAdvantage}`} color={netAdvantage > 0 ? "info"    : "warning"} />
                            {result.triumph > 0 && <Chip label={`Triumph: ${result.triumph}`} color="success" />}
                            {result.despair > 0 && <Chip label={`Despair: ${result.despair}`} color="error" />}
                        </Box>
                    </Paper>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirm} disabled={!rolled}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};
