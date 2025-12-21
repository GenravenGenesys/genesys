import {CriticalInjurySeverity} from "../api/model";
import {Difficulty} from "../models/common/Difficulty.ts";

export const convertSeverityToDifficulty = (severity: CriticalInjurySeverity): Difficulty => {
    switch (severity) {
        case CriticalInjurySeverity.Easy:
            return Difficulty.Easy;
        case CriticalInjurySeverity.Average:
            return Difficulty.Average;
        case CriticalInjurySeverity.Hard:
            return Difficulty.Hard;
        case CriticalInjurySeverity.Daunting:
            return Difficulty.Daunting;
        case CriticalInjurySeverity.Formidable:
            return Difficulty.Formidable
    }
}