import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, Paper, Chip, Alert} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import type {GenesysSymbolResults} from "../../../../../api/model";
interface Props {
    open: boolean;
    participantName: string;
    rollType: "initiative" | "action";
    onClose: () => void;
    onRollComplete: (result: GenesysSymbolResults) => void;
}
export const DiceRoller2: React.FC<Props> = ({open, participantName, rollType, onClose, onRollComplete}) => {
    const empty: GenesysSymbolResults = {success: 0, advantage: 0, triumph: 0, failure: 0, threat: 0, despair: 0};
    const [result, setResult] = useState<GenesysSymbolResults>(empty);
    const [rolled, setRolled] = useState(false);
    const handleAutoRoll = () => {
        if (rollType === "initiative") {
            setResult({success: Math.floor(Math.random() * 3) + 1, advantage: Math.floor(Math.random() * 4), triumph: 0, failure: 0, threat: 0, despair: 0});
        } else {
            setResult({success: Math.floor(Math.random() * 4), advantage: Math.floor(Math.random() * 5), triumph: Math.random() > 0.9 ? 1 : 0, failure: Math.floor(Math.random() * 2), threat: Math.floor(Math.random() * 3), despair: Math.random() > 0.95 ? 1 : 0});
        }
        setRolled(true);
    };
    const setField = (f: keyof GenesysSymbolResults, v: number) => { setResult(p => ({...p, [f]: Math.max(0, v)})); setRolled(true); };
    const confirm = () => { onRollComplete(result); setResult(empty); setRolled(false); };
    const netSuccess = result.success + result.triumph - result.failure - result.despair;
    const netAdv = result.advantage - result.threat;
    const fields: (keyof GenesysSymbolResults)[] = rollType === "action" ? ["success","advantage","triumph","failure","threat","despair"] : ["success","advantage"];
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{rollType === "initiative" ? "Roll Initiative" : "Roll Dice"} — {participantName}</DialogTitle>
            <DialogContent>
                <Alert severity="info" sx={{mb: 2}}>{rollType === "initiative" ? "Roll Cool or Vigilance for initiative" : "Roll dice for your action check"}</Alert>
                <Button fullWidth variant="contained" size="large" startIcon={<CasinoIcon/>} onClick={handleAutoRoll} sx={{mb: 2}}>Auto Roll (Simulate)</Button>
                <Typography variant="body2" color="text.secondary" align="center" sx={{mb: 2}}>Or enter results manually:</Typography>
                <Grid container spacing={2}>
                    {fields.map(f => (
                        <Grid key={f} size={{xs: 6}} sx={{mt: 2}}>
                            <TextField fullWidth label={f.charAt(0).toUpperCase() + f.slice(1)} type="number" value={result[f]} onChange={e => setField(f, parseInt(e.target.value) || 0)} inputProps={{min: 0}}/>
                        </Grid>
                    ))}
                </Grid>
                {rolled && (
                    <Paper sx={{p: 2, mt: 2, backgroundColor: netSuccess > 0 ? "success.light" : "error.light"}}>
                        <Typography variant="h6" align="center" gutterBottom>{netSuccess > 0 ? "SUCCESS" : "FAILURE"}</Typography>
                        <Box sx={{display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap"}}>
                            <Chip label={`Net Success: ${netSuccess}`} color={netSuccess > 0 ? "success" : "error"}/>
                            <Chip label={`Net Advantage: ${netAdv}`} color={netAdv > 0 ? "info" : "warning"}/>
                            {result.triumph > 0 && <Chip label={`Triumph: ${result.triumph}`} color="success"/>}
                            {result.despair > 0 && <Chip label={`Despair: ${result.despair}`} color="error"/>}
                        </Box>
                    </Paper>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={confirm} disabled={!rolled}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};
