import Roll, {DieType, Results, ResultType} from "../../models/Roll";
import {Fragment} from "react";
import * as React from "react";
import {Typography} from "@mui/material";

export const renderRoll = (roll: Roll) => {
    let text = ''
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
    console.log(final)
    return final
    // return (
    //     <Fragment>
    //         <Typography style={{wordWrap: 'break-word', textAlign:'center'}}
    //                     dangerouslySetInnerHTML={{__html: final}}/>
    //     </Fragment>
    // )
};