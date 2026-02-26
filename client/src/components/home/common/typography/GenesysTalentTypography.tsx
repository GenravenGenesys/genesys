import {Fragment} from 'react';
import {Typography} from '@mui/material';

interface Props {
    text: string
    ranks: number
    secondRanks?: number
}

export default function GenesysTalentTypography(props: Props): JSX.Element {
    const {text, ranks, secondRanks} = props;

    const addRanks = (die: string):string => {
        switch (ranks) {
            case 1:
                return die
            case 2:
                return die + ' ' + die
            case 3:
                return die + ' ' + die + ' ' + die
            case 4:
                return die + ' ' + die + ' ' + die + ' ' + die
            case 5:
                return die + ' ' + die + ' ' + die + ' ' + die + ' ' + die
            default:
                return String(secondRanks)
        }
    }

    const checkText = () => {
        if (text === null || text === undefined) {
            return '';
        }
        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
                case target.includes('[boost]'):
                    return addRanks('<i class="symbol d6 symbol-border boost-color"></i>')
                case target.includes('[ability]'):
                    return addRanks('<i class="symbol  d8 symbol-border ability-color"></i>');
                case target.includes('[proficiency]'):
                    return addRanks('<i class="symbol d12 symbol-border proficiency-color"></i>');
                case target.includes('[setback]'):
                    return addRanks('<i class="symbol d6 symbol-border setback-color"></i>');
                case target.includes('[difficulty]'):
                    return addRanks('<i class="symbol d8 symbol-border difficulty-color"></i>');
                case target.includes('[challenge]'):
                    return addRanks('<i class="symbol d12 symbol-border challenge-color"></i>');
                case target.includes('[advantage]'):
                    return addRanks('<i class="symbol advantage"></i>');
                case target.includes('[success]'):
                    return addRanks('<i class="symbol success"></i>');
                case target.includes('[triumph]'):
                    return addRanks('<i class="symbol triumph"></i>');
                case target.includes('[threat]'):
                    return addRanks('<i class="symbol threat"></i>');
                case target.includes('[failure]'):
                    return addRanks('<i class="symbol failure"></i>');
                case target.includes('[despair]'):
                    return addRanks('<i class="symbol despair"></i>');
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
            <Typography style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: checkText()}}/>
        </Fragment>
    )
}