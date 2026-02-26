import {Die} from "./dice/Die";
import {GenesysSymbols} from "./GenesysSymbols";
import {diceToRoll} from "./dice/DicePool";
import type {GenesysSymbolResults} from "../../api/model";

export function rollDice(dice: Die[], customSymbols: GenesysSymbols[][]): GenesysSymbols[] {
    const results: GenesysSymbols[] = [];
    dice.forEach(die => {
        results.push(...die.roll());
    });
    customSymbols.forEach(symbols => {
        results.push(...symbols);
    });
    return results;
}

export function tallyResults(results: GenesysSymbols[]): GenesysSymbolResults {
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
    const netAdvantages = tally[GenesysSymbols.Advantage] - tally[GenesysSymbols.Threat];

    return {
        success: Math.max(0, netSuccesses),
        failure: Math.max(0, -netSuccesses),
        advantage: Math.max(0, netAdvantages),
        threat: Math.max(0, -netAdvantages),
        triumph: tally[GenesysSymbols.Triumph],
        despair: tally[GenesysSymbols.Despair],
    };
}

export function convertResultsToString(results: GenesysSymbolResults) {
    const symbolMap: Array<[keyof GenesysSymbolResults, GenesysSymbols]> = [
        ['success', GenesysSymbols.Success],
        ['advantage', GenesysSymbols.Advantage],
        ['triumph', GenesysSymbols.Triumph],
        ['failure', GenesysSymbols.Failure],
        ['threat', GenesysSymbols.Threat],
        ['despair', GenesysSymbols.Despair],
    ];

    return symbolMap
        .filter(([key]) => results[key] > 0)
        .map(([key, symbol]) => `[${GenesysSymbols[symbol]}] `.repeat(results[key]))
        .join(' ');
}

interface Props {
    boost: number
    setback: number
    ability: number
    difficulty: number
    proficiency: number
    challenge: number
    symbols: GenesysSymbolResults
}

export default function handleDiceRoll(props: Props) {
    const {boost, setback, ability, difficulty, proficiency, challenge, symbols} = props;
    const customSymbols: GenesysSymbols[][] = [];

    if (symbols.success > 0) customSymbols.push(Array(symbols.success).fill(GenesysSymbols.Success));
    if (symbols.advantage > 0) customSymbols.push(Array(symbols.advantage).fill(GenesysSymbols.Advantage));
    if (symbols.triumph > 0) customSymbols.push(Array(symbols.triumph).fill(GenesysSymbols.Triumph));
    if (symbols.failure > 0) customSymbols.push(Array(symbols.failure).fill(GenesysSymbols.Failure));
    if (symbols.threat > 0) customSymbols.push(Array(symbols.threat).fill(GenesysSymbols.Threat));
    if (symbols.despair > 0) customSymbols.push(Array(symbols.despair).fill(GenesysSymbols.Despair));

    const rolledResults = rollDice(diceToRoll(boost, setback, ability, difficulty, proficiency, challenge), customSymbols);
    return convertResultsToString(tallyResults(rolledResults));
}