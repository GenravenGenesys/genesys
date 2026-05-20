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
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import {convertGenesysText} from "../../../../../util/GenesysTextHelper.ts";
import DOMPurify from "dompurify";
import type {GenesysSymbolResults} from "../../../../../api/model";
import type {EncounterSkill} from "../SampleEncounterManager.tsx";

// ── Dice simulation helpers ────────────────────────────────────────────────

function rollAbilityDie(): { success: number; advantage: number } {
    const f = Math.floor(Math.random() * 8);
    // faces: 1 blank | 3× 1S | 1× 2S | 2× 1A | 1× 1S+1A
    if (f === 0) return { success: 0, advantage: 0 };
    if (f <= 3)  return { success: 1, advantage: 0 };
    if (f === 4) return { success: 2, advantage: 0 };
    if (f <= 6)  return { success: 0, advantage: 1 };
    return           { success: 1, advantage: 1 };
}

function rollProficiencyDie(): { success: number; advantage: number } {
    const f = Math.floor(Math.random() * 12);
    // faces: 1 blank | 3× 1S | 2× 2S | 3× 1A | 1 triumph(=1S) | 2× 1S+1A
    if (f === 0)  return { success: 0, advantage: 0 };
    if (f <= 3)   return { success: 1, advantage: 0 };
    if (f <= 5)   return { success: 2, advantage: 0 };
    if (f <= 8)   return { success: 0, advantage: 1 };
    if (f === 9)  return { success: 1, advantage: 0 }; // triumph counts as success for initiative
    return              { success: 1, advantage: 1 };
}

export function computeDicePool(skill: EncounterSkill): { ability: number; proficiency: number } {
    const proficiency = Math.min(skill.characteristic, skill.rank);
    const ability     = Math.max(skill.characteristic, skill.rank) - proficiency;
    return { ability, proficiency };
}

export function simulateInitiativeRoll(skill: EncounterSkill): { success: number; advantage: number } {
    const { ability, proficiency } = computeDicePool(skill);
    let success = 0;
    let advantage = 0;
    for (let i = 0; i < ability; i++) {
        const d = rollAbilityDie();
        success   += d.success;
        advantage += d.advantage;
    }
    for (let i = 0; i < proficiency; i++) {
        const d = rollProficiencyDie();
        success   += d.success;
        advantage += d.advantage;
    }
    return { success, advantage };
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
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
                                                          open,
                                                          participantName,
                                                          rollType,
                                                          initiativeSkills,
                                                          initialSkillId,
                                                          onClose,
                                                          onRollComplete,
                                                      }) => {
    const [result, setResult] = useState<GenesysSymbolResults>({
        success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0,
    });
    const [rolled, setRolled] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState<string>(
        initialSkillId ?? initiativeSkills?.[0]?.id ?? ""
    );

    const selectedSkill = initiativeSkills?.find((s) => s.id === selectedSkillId) ?? null;
    const dicePool = selectedSkill ? computeDicePool(selectedSkill) : null;

    const diceLabel = dicePool
        ? [
            ...Array(dicePool.ability).fill("[ability]"),
            ...Array(dicePool.proficiency).fill("[proficiency]"),
          ].join(" ") || "—"
        : rollType === "initiative"
        ? "[ability] [proficiency]"
        : "[ability] [proficiency] [difficulty] [challenge]";

    const handleAutoRoll = () => {
        if (rollType === "initiative" && selectedSkill) {
            const r = simulateInitiativeRoll(selectedSkill);
            setResult({ success: r.success, advantage: r.advantage, triumph: 0, failure: 0, threat: 0, despair: 0 });
        } else if (rollType === "initiative") {
            setResult({
                success: Math.floor(Math.random() * 3) + 1,
                advantage: Math.floor(Math.random() * 4),
                triumph: 0, failure: 0, threat: 0, despair: 0,
            });
        } else {
            setResult({
                success:   Math.floor(Math.random() * 4),
                advantage: Math.floor(Math.random() * 5),
                triumph:   Math.random() > 0.9  ? 1 : 0,
                failure:   Math.floor(Math.random() * 2),
                threat:    Math.floor(Math.random() * 3),
                despair:   Math.random() > 0.95 ? 1 : 0,
            });
        }
        setRolled(true);
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
                    {rollType === "action" && (
                        <Alert severity="info" sx={{ mb: 2 }}>Roll for your action check</Alert>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<CasinoIcon />}
                        onClick={handleAutoRoll}
                        disabled={rollType === "initiative" && !!initiativeSkills?.length && !selectedSkillId}                        sx={{ mb: 2 }}
                    >
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
                    </Button>

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
