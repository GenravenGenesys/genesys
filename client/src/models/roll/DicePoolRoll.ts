import {GenesysSymbols} from "./GenesysSymbols";
import {rollDice, tallyResults} from "./DiceRoll";
import { Die } from "./dice/Die";
import {GenesysSymbolResults} from "../../api/model";

interface Props {
    dice: Die[]
    symbols: GenesysSymbolResults
}

export default function handleDicePoolRoll(props: Props) {
    const {dice, symbols} = props;
    const customSymbols: GenesysSymbols[][] = [];

    if (symbols.success > 0) customSymbols.push(Array(symbols.success).fill(GenesysSymbols.Success));
    if (symbols.advantage > 0) customSymbols.push(Array(symbols.advantage).fill(GenesysSymbols.Advantage));
    if (symbols.triumph > 0) customSymbols.push(Array(symbols.triumph).fill(GenesysSymbols.Triumph));
    if (symbols.failure > 0) customSymbols.push(Array(symbols.failure).fill(GenesysSymbols.Failure));
    if (symbols.threat > 0) customSymbols.push(Array(symbols.threat).fill(GenesysSymbols.Threat));
    if (symbols.despair > 0) customSymbols.push(Array(symbols.despair).fill(GenesysSymbols.Despair));

    const rolledResults = rollDice(dice, customSymbols);
    return tallyResults(rolledResults);
}