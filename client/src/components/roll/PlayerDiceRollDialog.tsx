import {GenesysSymbols} from "../../models/roll/GenesysSymbols.ts";
import React, {useState} from "react";
import type {GenesysSymbolResults} from "../../api/model";
import handleDiceRoll from "../../models/roll/DiceRoll.ts";

interface Props {
    open: boolean
    onClose: () => void
    boost?: number
    setback?: number
    ability?: number
    difficulty?: number
    proficiency?: number
    challenge?: number
    symbols?: GenesysSymbolResults;
}

export default function PlayerDiceRollDialog(props: Props) {
    const {open, onClose, boost, setback, ability, difficulty, proficiency, challenge, symbols} = props;
    const [results, setResults] = useState<string | null>(null);
    const [boostDiceCount, setBoostDiceCount] = useState(boost || 0);
    const [setbackDiceCount, setSetbackDiceCount] = useState(setback || 0);
    const [abilityDiceCount, setAbilityDiceCount] = useState(ability || 0);
    const [difficultyDiceCount, setDifficultyDiceCount] = useState(difficulty || 0);
    const [proficiencyDiceCount, setProficiencyDiceCount] = useState(proficiency || 0);
    const [challengeDieCount, setChallengeDieCount] = useState(challenge || 0);
    const [symbolCounts, setSymbolCounts] = useState(symbols);

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
            symbols: results,
            boost: boostDiceCount
        }));
    };

    return (
        <div>
            Player Dice Roll Dialog
        </div>
    );
};