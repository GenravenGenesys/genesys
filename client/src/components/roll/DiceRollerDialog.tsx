import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from '@mui/material';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {GenesysSymbols} from "../../models/roll/GenesysSymbols";
import {Die} from "../../models/roll/dice/Die";
import {abilityDie} from "../../models/roll/dice/Ability";
import {boostDie} from "../../models/roll/dice/Boost";
import {proficiencyDie} from "../../models/roll/dice/Proficiency";
import {challengeDie} from "../../models/roll/dice/Challenge";
import {difficultyDie} from "../../models/roll/dice/Difficulty";
import {setbackDie} from "../../models/roll/dice/Setback";

function rollDice(dice: Die[], customSymbols: GenesysSymbols[][]): GenesysSymbols[] {
    const results: GenesysSymbols[] = [];
    dice.forEach(die => {
        results.push(...die.roll());
    });
    customSymbols.forEach(symbols => {
        results.push(...symbols);
    });
    return results;
}

function tallyResults(results: GenesysSymbols[]): string {
    const tally: Record<GenesysSymbols, number> = {
        [GenesysSymbols.Success]: 0,
        [GenesysSymbols.Advantage]: 0,
        [GenesysSymbols.Triumph]: 0,
        [GenesysSymbols.Failure]: 0,
        [GenesysSymbols.Threat]: 0,
        [GenesysSymbols.Despair]: 0,
        [GenesysSymbols.Blank]: 0,
    };

    results.forEach(result => {
        tally[result]++;
    });

    const netSuccesses = tally[GenesysSymbols.Success] - tally[GenesysSymbols.Failure];
    tally[GenesysSymbols.Success] = Math.max(0, netSuccesses);
    tally[GenesysSymbols.Failure] = Math.max(0, -netSuccesses);

    const netAdvantages = tally[GenesysSymbols.Advantage] - tally[GenesysSymbols.Threat];
    tally[GenesysSymbols.Advantage] = Math.max(0, netAdvantages);
    tally[GenesysSymbols.Threat] = Math.max(0, -netAdvantages);

    tally[GenesysSymbols.Blank] = 0;
    return Object.entries(tally)
        .filter(([_, count]) => count > 0)
        .map(([symbol, count]) => `[${GenesysSymbols[symbol as unknown as GenesysSymbols]}] `.repeat(count))
        .join(' ');
}

interface DiceProps {
    boost: number
    setback: number
    ability: number
    difficulty: number
    proficiency: number
    challenge: number
    symbols: Record<GenesysSymbols, number>
}

function handleDiceRoll(props: DiceProps) {
    const {boost, setback, ability, difficulty, proficiency, challenge, symbols} = props;
    const diceToRoll = [
        ...Array(boost).fill(boostDie),
        ...Array(setback).fill(setbackDie),
        ...Array(ability).fill(abilityDie),
        ...Array(difficulty).fill(difficultyDie),
        ...Array(proficiency).fill(proficiencyDie),
        ...Array(challenge).fill(challengeDie)
    ];
    const customSymbols = Object.entries(symbols)
        .flatMap(([symbol, count]) => symbol !== GenesysSymbols.Blank.toString() ? Array(count)
            .fill([parseInt(symbol, 10)]) : []);
    const rolledResults = rollDice(diceToRoll, customSymbols);
    return tallyResults(rolledResults);
}

interface Props {
    open: boolean
    onClose: () => void
    boost?: number
    setback?: number
    ability?: number
    difficulty?: number
    proficiency?: number
    challenge?: number
    symbols?: Record<GenesysSymbols, number>
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
    const [symbolCounts, setSymbolCounts] = useState(symbols || {
        [GenesysSymbols.Success]: 0,
        [GenesysSymbols.Advantage]: 0,
        [GenesysSymbols.Triumph]: 0,
        [GenesysSymbols.Failure]: 0,
        [GenesysSymbols.Threat]: 0,
        [GenesysSymbols.Despair]: 0,
        [GenesysSymbols.Blank]: 0,
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
        }))
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{textAlign: 'center'}}>Genesys Dice Roller</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Boost" type="number" fullWidth variant="outlined"
                                   value={boostDiceCount}
                                   onChange={(e) => setBoostDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Setback" type="number" fullWidth variant="outlined"
                                   value={setbackDiceCount}
                                   onChange={(e) => setSetbackDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Ability" type="number" fullWidth variant="outlined"
                                   value={abilityDiceCount}
                                   onChange={(e) => setAbilityDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Difficulty" type="number" fullWidth variant="outlined"
                                   value={difficultyDiceCount}
                                   onChange={(e) => setDifficultyDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Proficiency" type="number" fullWidth
                                   variant="outlined" value={proficiencyDiceCount}
                                   onChange={(e) => setProficiencyDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Challenge" type="number" fullWidth
                                   variant="outlined" value={challengeDieCount}
                                   onChange={(e) => setChallengeDieCount(parseInt(e.target.value))}/>
                    </Grid>
                </Grid> <Grid container spacing={2}>
                {Object.entries(GenesysSymbols).map(([key, value]) => (typeof value === 'number' && value !== GenesysSymbols.Blank && (
                    <Grid item xs={6} key={value}>
                        <TextField margin="dense" label={key} type="number" fullWidth
                                   variant="outlined" value={symbolCounts[value as GenesysSymbols]}
                                   onChange={handleSymbolChange(value as GenesysSymbols)}/>
                    </Grid>
                )))}
            </Grid>
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
