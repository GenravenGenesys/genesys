import {Typography} from '@mui/material';
import {convertGenesysText} from "../../../../util/GenesysTextHelper.ts";

interface Props {
    text: string;
    variant?: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline';
    color?: string
    sx?: object;
}

export default function GenesysDescriptionTypography(props: Props) {
    const {text, variant, color, sx} = props;

    return <Typography variant={variant} color={color} component="div" sx={sx} style={{wordWrap: 'break-word', textAlign: 'center'}}
                       dangerouslySetInnerHTML={{__html: convertGenesysText(text)}}/>;
}