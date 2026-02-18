import {Fragment} from "react";
import {Typography} from "@mui/material";

interface Target {
    characteristicRanks: number
    skillRanks: number
}

interface Props {
    characteristicRanks: number
    skillRanks: number
    difficulty?: number
    target?: Target
}

export default function GenesysSkillDiceTypography(props: Props) {
    let {characteristicRanks, skillRanks, difficulty, target} = props;

    const generateSkillDice = () => {
        let text = ''
        while (characteristicRanks > 0 && skillRanks > 0) {
            text = text.concat('[proficiency] ')
            characteristicRanks--
            skillRanks--
        }
        if (characteristicRanks > 0) {
            while (characteristicRanks > 0) {
                text = text.concat('[ability] ')
                characteristicRanks--
            }
        }
        if (skillRanks > 0) {
            while (skillRanks > 0) {
                text = text.concat('[ability] ')
                skillRanks--
            }
        }
        if (difficulty && difficulty > 0) {
            while (difficulty > 0) {
                text = text.concat('[difficulty] ')
                difficulty--
            }
        }
        if (target) {
            while (target.characteristicRanks > 0 && target.skillRanks > 0) {
                text = text.concat('[challenge] ')
                target.characteristicRanks--
                target.skillRanks--
            }
            if (target.characteristicRanks > 0) {
                while (target.characteristicRanks > 0) {
                    text = text.concat('[difficulty] ')
                    target.characteristicRanks--
                }
            }
            if (target.skillRanks > 0) {
                while (target.skillRanks > 0) {
                    text = text.concat('[difficulty] ')
                    target.skillRanks--
                }
            }
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
                case target === '[removesetbacksetback]':
                    return `<b>(-</b><i class="symbol d6 symbol-border setback-color"></i> <i class="symbol d6 symbol-border setback-color"></i><b>)</b>`;
                case target.includes('[removesetback]'):
                    return `<b>(-</b><i class="symbol d6 symbol-border setback-color"></i><b>)</b>`;
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
    };

    return (
        <Fragment>
            <Typography style={{wordWrap: 'break-word'}} dangerouslySetInnerHTML={{__html: generateSkillDice()}}/>
        </Fragment>
    )
}