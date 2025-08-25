import {Fragment} from 'react';
import {Typography} from '@mui/material';
import {Difficulty} from "../../../models/common/Difficulty";

interface Props {
    difficulty: Difficulty
}

export default function GenesysDifficultyDiceTypography(props: Props): JSX.Element {
    const {difficulty} = props;

    const generateDifficultyDice = () => {
        let text = ''
        switch (difficulty) {
            case Difficulty.Easy:
                text = Difficulty.Easy + ' ( [difficulty] )'
                break;
            case Difficulty.Average:
                text = Difficulty.Average + ' ( [difficulty] [difficulty] )'
                break;
            case Difficulty.Hard:
                text = Difficulty.Hard + ' ( [difficulty] [difficulty] [difficulty] )'
                break;
            case Difficulty.Daunting:
                text = Difficulty.Daunting + ' ( [difficulty] [difficulty] [difficulty] [difficulty] )'
                break;
            case Difficulty.Formidable:
                text = Difficulty.Formidable + ' ( [difficulty] [difficulty] [difficulty] [difficulty] [difficulty] )'
                break;
            default:
                break

        }
        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
                case target.includes('[difficulty]'):
                    return '<i class="symbol d8 symbol-border difficulty-color"></i>';
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
            <Typography style={{ wordWrap: 'break-word', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: generateDifficultyDice()}}/>
    </Fragment>
)
}