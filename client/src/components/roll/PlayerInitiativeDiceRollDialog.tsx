import React, {useState} from "react";
import type {GenesysSymbolResults, PlayerCharacter, PlayerSkill} from "../../api/model";
import handleDiceRoll from "../../models/roll/DiceRoll.ts";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import GridContainer from "../common/grid/GridContainer.tsx";
import GridItem from "../common/grid/GridItem.tsx";
import GenesysDescriptionTypography from "../home/common/typography/GenesysDescriptionTypography.tsx";
import {getPlayerSkillCharacteristicRanks} from "../../util/SkillHelper.ts";
import SkillRollDisplayButton from "../home/common/SkillRollDisplayButton.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
    player: PlayerCharacter;
    skill: PlayerSkill;
    results: GenesysSymbolResults;
    onRollComplete: (result: GenesysSymbolResults) => void;
}

export default function PlayerInitiativeDiceRollDialog(props: Props) {
    const {open, onClose, player, skill, results} = props;
    const [resultText, setResultText] = useState<string | null>(null);
    const [symbolCounts, setSymbolCounts] = useState<GenesysSymbolResults>(results || {
        success: 0,
        advantage: 0,
        triumph: 0,
        failure: 0,
        threat: 0,
        despair: 0,
    });

    const handleClose = () => {
        setResultText(null);
        onClose();
    };

    const handleSymbolChange = (field: keyof GenesysSymbolResults) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSymbolCounts(prevCounts => ({
            ...prevCounts,
            [field]: value
        }));
    };

    const handleRoll = () => {
        setResultText(handleDiceRoll({
            ability: Math.max(getPlayerSkillCharacteristicRanks(player, skill), skill.ranks) - Math.min(getPlayerSkillCharacteristicRanks(player, skill), skill.ranks),
            challenge: Math.min(getPlayerSkillCharacteristicRanks(player, skill), skill.ranks),
            difficulty: 0,
            proficiency: 0,
            setback: 0,
            symbols: symbolCounts,
            boost: 0
        }));
    };



    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
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
                        <SkillRollDisplayButton player={player} skill={skill} onClick={handleRoll}
                                                     baseResult={results}/>
                    </Box>

                    <Typography variant="body2" color="text.secondary" align="center" sx={{mb: 2}}>
                        Or enter results manually:
                    </Typography>
                </Box>
                <GridContainer spacing={2}>
                    {(['[success]', '[advantage]', '[triumph]', '[failure]', '[threat]', '[despair]'] as unknown as Array<keyof GenesysSymbolResults>).map((field) => (
                        <GridItem key={field}>
                            <TextField margin="dense" label={<GenesysDescriptionTypography
                                text={field.charAt(0).toUpperCase() + field.slice(1)}/>}
                                       type="number" fullWidth
                                       variant="outlined" value={symbolCounts[field]}
                                       onChange={handleSymbolChange(field)}/>
                        </GridItem>
                    ))}
                </GridContainer>
                {resultText && (
                    <GenesysDescriptionTypography text={resultText}/>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleRoll}>Roll</Button>
            </DialogActions>
        </Dialog>
    );
};