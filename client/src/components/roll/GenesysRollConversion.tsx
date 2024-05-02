import Roll, {Results} from "../../models/Roll";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {Fragment, useState} from "react";
import {Typography} from "@mui/material";

interface RollProps {
    roll: Roll
}

export function GenesysRollConversion(props: RollProps): JSX.Element {
    const {roll} = props
    const [text, setText] = useState('')

    const generateRollText = ():string => {
        if (!roll) {
            return text
        }
        while (roll.proficiency > 0) {
            setText(text.concat('[proficiency] '))
            roll.proficiency--
        }
        while (roll.ability > 0) {
            setText(text.concat('[ability] '))
            roll.ability--
        }
        while (roll.boost > 0) {
            setText(text.concat('[boost] '))
            roll.boost--
        }
        while (roll.challenge > 0) {
            setText(text.concat('[challenge] '))
            roll.challenge--
        }
        while (roll.difficulty > 0) {
            setText(text.concat('[difficulty] '))
            roll.difficulty--
        }
        while (roll.setback > 0) {
            setText(text.concat('[setback] '))
            roll.setback--
        }
        while (roll.success > 0) {
            setText(text.concat('[success] '))
            roll.success--
        }
        while (roll.failure > 0) {
            setText(text.concat('[failure] '))
            roll.failure--
        }
        while (roll.advantage > 0) {
            setText(text.concat('[advantage] '))
            roll.advantage--
        }
        while (roll.threat > 0) {
            setText(text.concat('[threat] '))
            roll.threat--
        }
        while (roll.triumph > 0) {
            setText(text.concat('[triumph] '))
            roll.triumph--
        }
        while (roll.despair > 0) {
            setText(text.concat('[despair] '))
            roll.despair--
        }
        return text;
    }

    return (
        <GenesysDescriptionTypography text={generateRollText()}/>
    )
}

interface ResultsProps {
    results: Results
}

export function GenesysResultsConversion(props: ResultsProps) {
    const {results} = props

    const generateResultText = () => {
        let text = ''
        while (results.success > 0) {
            text = text.concat('[success] ')
            results.success--
        }
        while (results.failure > 0) {
            text = text.concat('[failure] ')
            results.failure--
        }
        while (results.advantage > 0) {
            text = text.concat('[advantage] ')
            results.advantage--
        }
        while (results.threat > 0) {
            text = text.concat('[threat] ')
            results.threat--
        }
        while (results.triumph > 0) {
            text = text.concat('[triumph] ')
            results.triumph--
        }
        while (results.despair > 0) {
            text = text.concat('[despair] ')
            results.despair--
        }
        if (text === null || text === undefined) {
            return '';
        }
        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
                case target.includes('[boost]'):
                    return '<i class="symbol d6 symbol-border boost-color"></i>';
                case target.includes('[ability]'):
                    return '<i class="symbol  d8 symbol-border ability-color"></i>';
                case target.includes('[proficiency]'):
                    return '<i class="symbol d12 symbol-border proficiency-color"></i>';
                case target.includes('[setback]'):
                    return '<i class="symbol d6 symbol-border setback-color"></i>';
                case target.includes('[difficulty]'):
                    return '<i class="symbol d8 symbol-border difficulty-color"></i>';
                case target.includes('[challenge]'):
                    return '<i class="symbol d12 symbol-border challenge-color"></i>';
                case target.includes('[advantage]'):
                    return '<i class="symbol advantage"></i>';
                case target.includes('[success]'):
                    return '<i class="symbol success"></i>';
                case target.includes('[triumph]'):
                    return '<i class="symbol triumph"></i>';
                case target.includes('[threat]'):
                    return '<i class="symbol threat"></i>';
                case target.includes('[failure]'):
                    return '<i class="symbol failure"></i>';
                case target.includes('[despair]'):
                    return '<i class="symbol despair"></i>';
                case target === '[removesetbacksetback]':
                    return `<b>(-</b><i class="symbol d6 symbol-border setback-color"></i> <i class="symbol d6 symbol-border setback-color"></i><b>)</b>`;
                case target.includes('[removesetback]'):
                    return `<b>(-</b><i class="symbol d6 symbol-border setback-color"></i><b>)</b>`;
                case target.includes('[combat]'):
                    return '<i class="symbol combat"></i>';
                case target.includes('[social]'):
                    return '<i class="symbol social"></i>';
                case target.includes('[general]'):
                    return '<i class="symbol general"></i>';
                // case target.includes('[gm]'):
                //     return `<img src=${images.gm} class="textSymbols" /> `;
                // case target.includes('[pc]'):
                //     return `<img src=${images.pc} class="textSymbols" /> `;
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

    return (
        <Fragment>
            <Typography style={{ wordWrap: 'break-word', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: generateResultText()}}/>
        </Fragment>
    )
}