import {Option} from "../../components/common/InputSelectField";
import {Difficulty} from "../../api/model";

export enum DifficultyUI {
    Easy = 'Easy',
    Average = 'Average',
    Hard = 'Hard',
    Daunting = 'Daunting',
    Formidable = 'Formidable'
}

export const getDifficultyDice = (difficulty: Difficulty) => {
    switch (difficulty) {
        case Difficulty.Easy:
            return 1;
        case Difficulty.Average:
            return 2;
        case Difficulty.Hard:
            return 3;
        case Difficulty.Daunting:
            return 4;
        case Difficulty.Formidable:
            return 5;

    }
}

export const getDifficultyOptions = (): Option[] => {
    return Object.values(DifficultyUI).map((value) => ({value}))
}