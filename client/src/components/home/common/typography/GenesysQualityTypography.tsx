import {Fragment} from "react";
import {Typography} from "@mui/material";

interface Props {
    ranks: number
}

export default function GenesysQualityTypography(props: Props): JSX.Element {
    let {ranks} = props;

    const generateQualityCost = () => {
        let text = 'Active ('
        while (ranks > 0) {
            text = text.concat('[advantage] ')
            ranks--
        }
        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
                case target.includes('[advantage]'):
                    return '<i class="symbol advantage"></i>';
                default:
                    return `${word}`;
            }
        });
        text.concat(')');
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
            <Typography style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: generateQualityCost()}}/>
        </Fragment>
    )
}