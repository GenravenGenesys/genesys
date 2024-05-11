import {Fragment} from "react";
import {Typography} from "@mui/material";
import {DieType} from "../../../models/Roll";

interface Props {
    characteristicRanks: number
    skillRanks: number
}

export default function GenesysSkillDiceTypography(props: Props): JSX.Element {
    let {characteristicRanks,skillRanks} = props;

    const generateSkillDice = () => {
        let text = ''
        while (characteristicRanks > 0 && skillRanks > 0) {
            text = text.concat(DieType.Proficiency + ' ')
            characteristicRanks--
            skillRanks--
        }
        if (characteristicRanks > 0) {
            while (characteristicRanks > 0) {
                text = text.concat(DieType.Ability + ' ')
                characteristicRanks--
            }
        }
        if (skillRanks > 0) {
            while (skillRanks > 0) {
                text = text.concat(DieType.Ability + ' ')
                skillRanks--
            }
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
            <Typography component={'div'} style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: generateSkillDice()}}/>
        </Fragment>
    )
}