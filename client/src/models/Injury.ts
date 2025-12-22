import {DifficultyUI} from "./common/DifficultyUI.ts";
import Modifier from "./common/Modifier";

export default interface Injury {
    id: string
    name: string
    description: string
    severity: DifficultyUI
    min: number
    max: number
    modifiers: Modifier[]
}