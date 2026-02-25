import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import GenesysDescriptionTypography from "../home/common/typography/GenesysDescriptionTypography.tsx";
import {GenesysSymbols} from "../../models/roll/GenesysSymbols";
import handleDiceRoll from "../../models/roll/DiceRoll";
import GridContainer from "../common/grid/GridContainer";
import GridItem from "../common/grid/GridItem";
import type {GenesysSymbolResults} from "../../api/model";
import GenesysDiceField from "../home/common/field/GenesysDiceField.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
    boost?: number;
    setback?: number;
    ability?: number;
    difficulty?: number;
    proficiency?: number;
    challenge?: number;
    symbols?: GenesysSymbolResults;
}

export default function DiceRollerDialog(props: Props) {
    const {open, onClose, boost, setback, ability, difficulty, proficiency, challenge, symbols} = props;
    const [results, setResults] = useState<string | null>(null);
    const [boostDiceCount, setBoostDiceCount] = useState(boost || 0);
    const [setbackDiceCount, setSetbackDiceCount] = useState(setback || 0);
    const [abilityDiceCount, setAbilityDiceCount] = useState(ability || 0);
    const [difficultyDiceCount, setDifficultyDiceCount] = useState(difficulty || 0);
    const [proficiencyDiceCount, setProficiencyDiceCount] = useState(proficiency || 0);
    const [challengeDieCount, setChallengeDieCount] = useState(challenge || 0);
    const [symbolCounts, setSymbolCounts] = useState<GenesysSymbolResults>(symbols || {
        success: 0,
        advantage: 0,
        triumph: 0,
        failure: 0,
        threat: 0,
        despair: 0,
    });

    const handleClose = () => {
        setResults(null);
        onClose()
    };

    const handleSymbolChange = (symbol: GenesysSymbols) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSymbolCounts(prevCounts => ({
            ...prevCounts,
            [symbol]: value
        }));
    };

    const handleRoll = () => {
        setResults(handleDiceRoll({
            ability: abilityDiceCount,
            challenge: challengeDieCount,
            difficulty: difficultyDiceCount,
            proficiency: proficiencyDiceCount,
            setback: setbackDiceCount,
            symbols: symbolCounts,
            boost: boostDiceCount
        }));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle style={{textAlign: 'center'}}>Genesys Dice Roller</DialogTitle>
            <DialogContent>
                <GridContainer spacing={2}>
                    <GridItem>
                        <TextField margin="dense" label="Boost" type="number" fullWidth variant="outlined"
                                   value={boostDiceCount}
                                   onChange={(e) => setBoostDiceCount(parseInt(e.target.value))}/>
                    </GridItem>
                    <GridItem>
                        <TextField margin="dense" label="Setback" type="number" fullWidth variant="outlined"
                                   value={setbackDiceCount}
                                   onChange={(e) => setSetbackDiceCount(parseInt(e.target.value))}/>
                    </GridItem>
                    <GridItem>
                        <TextField margin="dense" label="Ability" type="number" fullWidth variant="outlined"
                                   value={abilityDiceCount}
                                   onChange={(e) => setAbilityDiceCount(parseInt(e.target.value))}/>
                    </GridItem>
                    <GridItem>
                        <TextField margin="dense" label="Difficulty" type="number" fullWidth variant="outlined"
                                   value={difficultyDiceCount}
                                   onChange={(e) => setDifficultyDiceCount(parseInt(e.target.value))}/>
                    </GridItem>
                    <GridItem>
                        <TextField margin="dense" label="Proficiency" type="number" fullWidth
                                   variant="outlined" value={proficiencyDiceCount}
                                   onChange={(e) => setProficiencyDiceCount(parseInt(e.target.value))}/>
                    </GridItem>
                    <GridItem>
                        <GenesysDiceField value={challengeDieCount} label={"[challenge]"}
                                          onChange={(e) => setChallengeDieCount(e)}/>
                        {/*<TextField margin="dense" label="Challenge" type="number" fullWidth*/}
                        {/*           variant="outlined" value={challengeDieCount}*/}
                        {/*           onChange={(e) => setChallengeDieCount(parseInt(e.target.value))}/>*/}
                    </GridItem>
                </GridContainer>
                <GridContainer spacing={2}>
                    {(['success', 'advantage', 'triumph', 'failure', 'threat', 'despair'] as Array<keyof GenesysSymbolResults>).map((field) => (
                        <GridItem key={field}>
                            <TextField margin="dense" label={field.charAt(0).toUpperCase() + field.slice(1)}
                                       type="number" fullWidth
                                       variant="outlined" value={symbolCounts[field]}
                                       onChange={handleSymbolChange(field)}/>
                        </GridItem>
                    ))}
                </GridContainer>
                {results && (
                    <GenesysDescriptionTypography text={results}/>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleRoll}>Roll</Button>
            </DialogActions>
        </Dialog>
    );
};
