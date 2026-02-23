import React, {useState} from "react";
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
import type {GenesysSymbolResults, PlayerCharacter, PlayerSkill} from "../../../../api/model";


interface Props {
    open: boolean;
    player: PlayerCharacter;
    skill: PlayerSkill;
    onClose: () => void;
    onRollComplete: (result: GenesysSymbolResults) => void;
}

export const TestDiceRoller: React.FC<Props> = ({open, player, skill, onClose, onRollComplete}) => {
    const [result, setResult] = useState<GenesysSymbolResults>({
        success: 0,
        advantage: 0,
        triumph: 0,
        failure: 0,
        threat: 0,
        despair: 0,
    });
    const [rolled, setRolled] = useState(false);

    const handleAutoRoll = () => {
        const rollSuccess = Math.floor(Math.random() * 4);
        const rollAdvantage = Math.floor(Math.random() * 5);
        const rollTriumph = Math.random() > 0.9 ? 1 : 0;
        const rollFailure = Math.floor(Math.random() * 2);
        const rollThreat = Math.floor(Math.random() * 3);
        const rollDespair = Math.random() > 0.95 ? 1 : 0;

        setResult({
            success: rollSuccess,
            advantage: rollAdvantage,
            triumph: rollTriumph,
            failure: rollFailure,
            threat: rollThreat,
            despair: rollDespair,
        });

        setRolled(true);
    };

    const handleManualUpdate = (field: keyof GenesysSymbolResults, value: number) => {
        setResult((prev: any) => ({
            ...prev,
            [field]: Math.max(0, value),
        }));
        setRolled(true);
    };

    const handleConfirm = () => {
        onRollComplete(result);

        setResult({
            success: 0,
            advantage: 0,
            triumph: 0,
            failure: 0,
            threat: 0,
            despair: 0,
        });
        setRolled(false);
    };

    const netSuccess = result.success + result.triumph - result.failure - result.despair;
    const netAdvantage = result.advantage - result.threat;
    const isSuccess = netSuccess > 0;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Roll {skill.type} Check for {player.name}
            </DialogTitle>

            <DialogContent>
                <Box sx={{mb: 3}}>
                    <Alert severity="info" sx={{mb: 2}}>
                        Roll for your action check
                    </Alert>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<CasinoIcon/>}
                        onClick={handleAutoRoll}
                        sx={{mb: 2}}
                    >
                        Roll {skill.name} Check
                    </Button>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{mb: 2}}
                    >
                        Or enter results manually:
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {/* Positive Results */}
                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField
                            fullWidth
                            label="Success"
                            type="number"
                            value={result.success}
                            onChange={(e) =>
                                handleManualUpdate("success", parseInt(e.target.value) || 0)
                            }
                            inputProps={{min: 0}}
                        />
                    </Grid>

                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField
                            fullWidth
                            label="Advantage"
                            type="number"
                            value={result.advantage}
                            onChange={(e) =>
                                handleManualUpdate("advantage", parseInt(e.target.value) || 0)
                            }
                            inputProps={{min: 0}}
                        />
                    </Grid>

                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField
                            fullWidth
                            label="Triumph"
                            type="number"
                            value={result.triumph}
                            onChange={(e) =>
                                handleManualUpdate("triumph", parseInt(e.target.value) || 0)
                            }
                            inputProps={{min: 0}}
                        />
                    </Grid>

                    {/* Negative Results */}
                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField
                            fullWidth
                            label="Failure"
                            type="number"
                            value={result.failure}
                            onChange={(e) =>
                                handleManualUpdate("failure", parseInt(e.target.value) || 0)
                            }
                            inputProps={{min: 0}}
                        />
                    </Grid>

                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField
                            fullWidth
                            label="Threat"
                            type="number"
                            value={result.threat}
                            onChange={(e) =>
                                handleManualUpdate("threat", parseInt(e.target.value) || 0)
                            }
                            inputProps={{min: 0}}
                        />
                    </Grid>

                    <Grid size={{xs: 6}} sx={{mt: 4}}>
                        <TextField
                            fullWidth
                            label="Despair"
                            type="number"
                            value={result.despair}
                            onChange={(e) =>
                                handleManualUpdate("despair", parseInt(e.target.value) || 0)
                            }
                            inputProps={{min: 0}}
                        />
                    </Grid>
                </Grid>

                {rolled && (
                    <Paper
                        sx={{
                            p: 2,
                            mt: 2,
                            backgroundColor: isSuccess ? "success.light" : "error.light",
                        }}
                    >
                        <Typography variant="h6" align="center" gutterBottom>
                            Result: {isSuccess ? "SUCCESS" : "FAILURE"}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                label={`Net Success: ${netSuccess}`}
                                color={netSuccess > 0 ? "success" : "error"}
                            />
                            <Chip
                                label={`Net Advantage: ${netAdvantage}`}
                                color={netAdvantage > 0 ? "info" : "warning"}
                            />
                            {result.triumph > 0 && (
                                <Chip label={`Triumph: ${result.triumph}`} color="success"/>
                            )}
                            {result.despair > 0 && (
                                <Chip label={`Despair: ${result.despair}`} color="error"/>
                            )}
                        </Box>
                    </Paper>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirm} disabled={!rolled}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
