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
import type {GenesysSymbolResults, PlayerCharacter, PlayerSkill} from "../../../../api/model";
import GenesysPlayerDicePoolButton from "../../common/GenesysPlayerDicePoolButton.tsx";


interface Props {
    open: boolean;
    player: PlayerCharacter;
    skill: PlayerSkill;
    baseResult: GenesysSymbolResults;
    onClose: () => void;
    onRollComplete: (result: GenesysSymbolResults) => void;
}

export const TestPlayerDiceRoller: React.FC<Props> = ({open, player, skill, baseResult, onClose, onRollComplete}) => {
    const [result, setResult] = useState<GenesysSymbolResults>(baseResult);
    const [rolled, setRolled] = useState(false);

    const handleAutoRoll = (results: GenesysSymbolResults) => {
        setResult({
            success: results.success,
            advantage: results.advantage,
            triumph: results.triumph,
            failure: results.failure,
            threat: results.threat,
            despair: results.despair,
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
                Roll {skill.name} Check for {player.name}
            </DialogTitle>

            <DialogContent>
                <Box sx={{mb: 3}}>
                    <Alert severity="info" sx={{mb: 2}}>
                        Roll for your {skill.type} Check using the button below, or enter the results manually if you
                        rolled physical dice. Remember to include any Triumphs or Despairs!
                    </Alert>

                    <Box sx={{display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap",}}>
                        <GenesysPlayerDicePoolButton player={player} skill={skill} onRollComplete={handleAutoRoll}
                                                 baseResult={result}/>
                    </Box>

                    <Typography variant="body2" color="text.secondary" align="center" sx={{mb: 2}}>
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
                    <Paper sx={{p: 2, mt: 2, backgroundColor: isSuccess ? "success.light" : "error.light",}}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Result: {isSuccess ? "SUCCESS" : "FAILURE"}
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap",}}>
                            <Chip label={`Net Success: ${netSuccess}`} color={netSuccess > 0 ? "success" : "error"}/>
                            <Chip label={`Net Advantage: ${netAdvantage}`}
                                  color={netAdvantage > 0 ? "info" : "warning"}/>
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
