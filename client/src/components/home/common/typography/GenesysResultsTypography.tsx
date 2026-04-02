import type {InitiativeSlotResults} from "../../../../api/model";
import {Typography} from "@mui/material";

interface Props {
    result: InitiativeSlotResults;
    variant?: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline';
    sx?: object;
}

export default function GenesysResultsTypography(props: Props) {
    const {result, variant, sx} = props;

    const generateResults = () => {
        let text = ''
        while (result.success > 0) {
            text = text.concat('[success] ');
            result.success--;
        }
        while (result.advantage > 0) {
            text = text.concat('[advantage] ');
            result.advantage--;
        }
        while (result.triumph > 0) {
            text = text.concat('[triumph] ');
            result.triumph--;
        }
        while (result.failure > 0) {
            text = text.concat('[failure] ');
            result.failure--;
        }
        while (result.threat > 0) {
            text = text.concat('[threat] ');
            result.threat--;
        }
        while (result.despair > 0) {
            text = text.concat('[despair] ');
            result.despair--;
        }
        if (text === null || text === undefined) {
            return '';
        }
        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
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

    return <Typography variant={variant} component="div" sx={sx} style={{wordWrap: 'break-word', textAlign: 'center'}}
                       dangerouslySetInnerHTML={{__html: generateResults()}}/>;
}