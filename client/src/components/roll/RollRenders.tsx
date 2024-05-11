import Roll, {DefaultResults, DieType, Results, ResultType} from "../../models/Roll";
import {useState} from "react";

export const renderRoll = (roll: Roll) => {
    let text = ''
    console.log(roll)
    while (roll.proficiency > 0) {
        text = text.concat(DieType.Proficiency + ' ')
        roll.proficiency--
    }
    while (roll.ability > 0) {
        text = text.concat(DieType.Ability + ' ')
        roll.ability--
    }
    while (roll.boost > 0) {
        text = text.concat(DieType.Boost + ' ')
        roll.boost--
    }
    while (roll.challenge > 0) {
        text = text.concat(DieType.Challenge + ' ')
        roll.challenge--
    }
    while (roll.difficulty > 0) {
        text = text.concat(DieType.Difficulty + ' ')
        roll.difficulty--
    }
    while (roll.setback > 0) {
        text = text.concat(DieType.Setback + ' ')
        roll.setback--
    }
    while (roll.success > 0) {
        text = text.concat(ResultType.Success + ' ')
        roll.success--
    }
    while (roll.failure > 0) {
        text = text.concat(ResultType.Failure + ' ')
        roll.failure--
    }
    while (roll.advantage > 0) {
        text = text.concat(ResultType.Advantage + ' ')
        roll.advantage--
    }
    while (roll.threat > 0) {
        text = text.concat(ResultType.Threat + ' ')
        roll.threat--
    }
    while (roll.triumph > 0) {
        text = text.concat(ResultType.Triumph + ' ')
        roll.triumph--
    }
    while (roll.despair > 0) {
        text = text.concat(ResultType.Despair + ' ')
        roll.despair--
    }
    if (text === null || text === undefined) {
        return '';
    }
    const string = text.split(' ');
    const array = string.map((word: string) => {
        const target = word.toLowerCase();
        switch (true) {
            case target.includes(DieType.Boost):
                return '<i class="symbol d6 symbol-border boost-color"></i>';
            case target.includes(DieType.Ability):
                return '<i class="symbol  d8 symbol-border ability-color"></i>';
            case target.includes(DieType.Proficiency):
                return '<i class="symbol d12 symbol-border proficiency-color"></i>';
            case target.includes(DieType.Setback):
                return '<i class="symbol d6 symbol-border setback-color"></i>';
            case target.includes(DieType.Difficulty):
                return '<i class="symbol d8 symbol-border difficulty-color"></i>';
            case target.includes(DieType.Challenge):
                return '<i class="symbol d12 symbol-border challenge-color"></i>';
            case target.includes(ResultType.Advantage):
                return '<i class="symbol advantage"></i>';
            case target.includes(ResultType.Success):
                return '<i class="symbol success"></i>';
            case target.includes(ResultType.Triumph):
                return '<i class="symbol triumph"></i>';
            case target.includes(ResultType.Threat):
                return '<i class="symbol threat"></i>';
            case target.includes(ResultType.Failure):
                return '<i class="symbol failure"></i>';
            case target.includes(ResultType.Despair):
                return '<i class="symbol despair"></i>';
            default:
                return `${word}`;
        }
    });
    let final = '';
    array.forEach((word, index) => {
        if (
            (word.includes('symbol') &&
                array[index + 1] &&
                array[index + 1].includes('symbol')) ||
            array.length === index + 1
        ) {
            final += word;
        } else {
            final += `${word} `;
        }
    });
    return final;
}

export const renderResults = (results: Results) => {
    let text = ''
    console.log(results)
    while (results.success > 0) {
        text = text.concat(ResultType.Success + ' ')
        results.success--
    }
    while (results.failure > 0) {
        text = text.concat(ResultType.Failure + ' ')
        results.failure--
    }
    while (results.advantage > 0) {
        text = text.concat(ResultType.Advantage + ' ')
        results.advantage--
    }
    while (results.threat > 0) {
        text = text.concat(ResultType.Threat + ' ')
        results.threat--
    }
    while (results.triumph > 0) {
        text = text.concat(ResultType.Triumph + ' ')
        results.triumph--
    }
    while (results.despair > 0) {
        text = text.concat(ResultType.Despair + ' ')
        results.despair--
    }
    if (text === null || text === undefined) {
        return '';
    }
    const string = text.split(' ');
    const array = string.map((word: string) => {
        const target = word.toLowerCase();
        switch (true) {
            case target.includes(ResultType.Advantage):
                return '<i class="symbol advantage"></i>';
            case target.includes(ResultType.Success):
                return '<i class="symbol success"></i>';
            case target.includes(ResultType.Triumph):
                return '<i class="symbol triumph"></i>';
            case target.includes(ResultType.Threat):
                return '<i class="symbol threat"></i>';
            case target.includes(ResultType.Failure):
                return '<i class="symbol failure"></i>';
            case target.includes(ResultType.Despair):
                return '<i class="symbol despair"></i>';
            default:
                return `${word}`;
        }
    });
    let final = '';
    array.forEach((word, index) => {
        if (
            (word.includes('symbol') &&
                array[index + 1] &&
                array[index + 1].includes('symbol')) ||
            array.length === index + 1
        ) {
            final += word;
        } else {
            final += `${word} `;
        }
    });
    return final
};

const rollDie = (max: number) => {
    return 1 + Math.floor(Math.random() * max)
}

const rollBoostDice = (dice: number, results: Results) => {
    while (dice > 0) {
        let face = rollDie(6)
        console.log("BOOST")
        console.log(face)
        switch (face) {
            case 1:
            case 2:
                break
            case 3:
                results.success = results.success + 1
                break
            case 4:
                results.success = results.success + 1
                results.advantage = results.advantage + 1
                break
            case 5:
                results.advantage = results.advantage + 2
                break
            case 6:
                results.advantage = results.advantage + 1
                break
        }
    }
    return results
}

const rollAbilityDice = (dice: number, results: Results) => {
    while (dice > 0) {
        let face = rollDie(8)
        console.log("ABILITY")
        console.log(face)
        switch (face) {
            case 1:
                break
            case 2:
            case 3:
                results.success = results.success + 1
                break
            case 4:
                results.success = results.success + 2
                break
            case 5:
            case 6:
                results.advantage = results.advantage + 1
                break
            case 7:
                results.success = results.success + 1
                results.advantage = results.advantage + 1
                break
            case 8:
                results.advantage = results.advantage + 2
                break
        }
    }
    return results
}

export const rollDice = (roll: Roll, results: Results) => {
    console.log(roll)
    results = rollAbilityDice(roll.ability, results)
    return results
}