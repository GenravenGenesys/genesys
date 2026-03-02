import {Difficulty} from "../api/model";

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