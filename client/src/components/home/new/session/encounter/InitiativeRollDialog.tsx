import {useState} from "react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import {
    Activation,
    type AdversaryTemplate,
    CostType,
    type GenesysSymbolResults,
    InitiativeSlotType,
    type PlayerCharacter,
    type PlayerTalent,
} from "../../../../../api/model";

type Participant =
    | {kind: "player"; character: PlayerCharacter}
    | {kind: "npc"; adversary: AdversaryTemplate};

interface Props {
    open: boolean;
    participant: Participant | null;
    onClose: () => void;
    onConfirm: (results: GenesysSymbolResults, strainSuffered: number) => void;
}

const emptyResults = (): GenesysSymbolResults => ({
    success: 0,
    advantage: 0,
    triumph: 0,
    failure: 0,
    threat: 0,
    despair: 0,
});

/**
 * Identifies a Rapid Reaction-style talent mechanically:
 * - Activated as an incidental out of turn
 * - Costs strain to activate
 * - Is ranked (the number of ranks caps the max strain/successes)
 * - Has a resultsModifier on its incidentalOutOfTurn block that adds [success]
 */
function isRapidReactionTalent(talent: PlayerTalent): boolean {
    return (
        talent.activation === Activation["Active_(Incidental,_Out_of_Turn)"] &&
        talent.cost?.type === CostType.Strain &&
        talent.ranked === true &&
        (talent.incidentalOutOfTurn?.resultsModifiers ?? []).some(
            (rm) => (rm.results?.success ?? 0) > 0
        )
    );
}

function getParticipantName(participant: Participant): string {
    return participant.kind === "player"
        ? participant.character.name
        : participant.adversary.name;
}

function getSlotTypeLabel(participant: Participant): string {
    return participant.kind === "player" ? "PC" : "NPC";
}

export default function InitiativeRollDialog(props: Props) {
    const {open, participant, onClose, onConfirm} = props;

    const [results, setResults] = useState<GenesysSymbolResults>(emptyResults());
    const [rolled, setRolled] = useState(false);
    const [useAlternateSkill, setUseAlternateSkill] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState<string>("");
    const [rapidReactionStrain, setRapidReactionStrain] = useState(0);

    if (!participant) return null;

    // Determine available initiative skills and Rapid Reaction ranks
    const isPlayer = participant.kind === "player";
    const playerCharacter = isPlayer ? participant.character : null;

    const initiativeSkills = isPlayer
        ? (playerCharacter!.skills.filter((s) => s.initiative))
        : (participant.adversary.skills.filter((s) => s.initiative));

    const allSkills = isPlayer ? playerCharacter!.skills : [];

    const rapidReactionTalent = isPlayer
        ? playerCharacter!.talents.find(isRapidReactionTalent)
        : null;
    const rapidReactionRanks = rapidReactionTalent?.ranks ?? 0;
    const hasRapidReaction = rapidReactionRanks > 0;

    const displayedSkills = useAlternateSkill ? allSkills : initiativeSkills;

    const handleAutoRoll = () => {
        const rollSuccess = Math.floor(Math.random() * 4) + 1;
        const rollAdvantage = Math.floor(Math.random() * 4);
        setResults({
            ...emptyResults(),
            success: rollSuccess,
            advantage: rollAdvantage,
        });
        setRolled(true);
    };

    const handleFieldChange = (field: keyof GenesysSymbolResults, raw: string) => {
        const value = Math.max(0, parseInt(raw, 10) || 0);
        setResults((prev) => ({...prev, [field]: value}));
        setRolled(true);
    };

    const handleConfirm = () => {
        const finalResults: GenesysSymbolResults = {
            ...results,
            success: results.success + rapidReactionStrain,
        };
        onConfirm(finalResults, rapidReactionStrain);
        handleReset();
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const handleReset = () => {
        setResults(emptyResults());
        setRolled(false);
        setUseAlternateSkill(false);
        setSelectedSkillId("");
        setRapidReactionStrain(0);
    };

    const selectedSkillName =
        displayedSkills.find((s) => s.id === selectedSkillId)?.name ?? "";

    const isNpc = participant.kind === "npc";
    const slotColor = isNpc ? "error" : "primary";

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Typography variant="h6">Roll Initiative:</Typography>
                    <Chip
                        label={getSlotTypeLabel(participant)}
                        size="small"
                        color={slotColor}
                    />
                    <Typography variant="h6" fontWeight="bold">
                        {getParticipantName(participant)}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                {/* Skill selector */}
                {displayedSkills.length > 0 && (
                    <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel>Initiative Skill</InputLabel>
                        <Select
                            value={selectedSkillId}
                            label="Initiative Skill"
                            onChange={(e) => setSelectedSkillId(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>— Select skill —</em>
                            </MenuItem>
                            {displayedSkills.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name} ({s.characteristic})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Alternate skill toggle (PC only) */}
                {isPlayer && allSkills.length > 0 && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={useAlternateSkill}
                                onChange={(e) => {
                                    setUseAlternateSkill(e.target.checked);
                                    setSelectedSkillId("");
                                }}
                            />
                        }
                        label="Use alternate skill for initiative (talent required)"
                        sx={{mb: 1, display: "block"}}
                    />
                )}

                {/* Rapid Reaction talent */}
                {hasRapidReaction && (
                    <Box sx={{mb: 2, p: 1.5, border: 1, borderColor: "warning.main", borderRadius: 1}}>
                        <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                            Rapid Reaction (Ranks: {rapidReactionRanks})
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                            Suffer strain to add an equal number of{" "}
                            <strong>[success]</strong> to this initiative check.
                        </Typography>
                        <TextField
                            label="Strain to Suffer"
                            type="number"
                            size="small"
                            value={rapidReactionStrain}
                            onChange={(e) =>
                                setRapidReactionStrain(
                                    Math.min(
                                        rapidReactionRanks,
                                        Math.max(0, parseInt(e.target.value, 10) || 0)
                                    )
                                )
                            }
                            inputProps={{min: 0, max: rapidReactionRanks}}
                            helperText={`Max: ${rapidReactionRanks} (adds ${rapidReactionStrain} [success])`}
                            sx={{width: 200}}
                        />
                    </Box>
                )}

                {/* Roll type info */}
                <Alert severity="info" sx={{mb: 2}}>
                    {selectedSkillName
                        ? `Rolling ${selectedSkillName} for initiative`
                        : initiativeSkills.length > 0
                            ? "Select a skill above, or enter results directly"
                            : "Enter initiative roll results below"}
                </Alert>

                {/* Auto roll button */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<CasinoIcon/>}
                    onClick={handleAutoRoll}
                    sx={{mb: 2}}
                >
                    Auto Roll (Simulate)
                </Button>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{mb: 2}}
                >
                    Or enter results manually:
                </Typography>

                {/* Result fields */}
                <Grid container spacing={2}>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="Success"
                            type="number"
                            value={results.success}
                            onChange={(e) => handleFieldChange("success", e.target.value)}
                            inputProps={{min: 0}}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="Advantage"
                            type="number"
                            value={results.advantage}
                            onChange={(e) => handleFieldChange("advantage", e.target.value)}
                            inputProps={{min: 0}}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="Triumph"
                            type="number"
                            value={results.triumph}
                            onChange={(e) => handleFieldChange("triumph", e.target.value)}
                            inputProps={{min: 0}}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="Failure"
                            type="number"
                            value={results.failure}
                            onChange={(e) => handleFieldChange("failure", e.target.value)}
                            inputProps={{min: 0}}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="Threat"
                            type="number"
                            value={results.threat}
                            onChange={(e) => handleFieldChange("threat", e.target.value)}
                            inputProps={{min: 0}}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="Despair"
                            type="number"
                            value={results.despair}
                            onChange={(e) => handleFieldChange("despair", e.target.value)}
                            inputProps={{min: 0}}
                        />
                    </Grid>
                </Grid>

                {/* Preview with Rapid Reaction added */}
                {rolled && hasRapidReaction && rapidReactionStrain > 0 && (
                    <Alert severity="warning" sx={{mt: 2}}>
                        Final success count: {results.success} + {rapidReactionStrain} (Rapid Reaction) ={" "}
                        <strong>{results.success + rapidReactionStrain}</strong>
                    </Alert>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={!rolled}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
