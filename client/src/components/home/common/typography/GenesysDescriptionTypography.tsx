import {Typography} from '@mui/material';
import {convertGenesysText} from "../../../../util/GenesysTextHelper.ts";
import DOMPurify from 'dompurify';

interface Props {
    text: string;
    variant?: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline';
    color?: string
    sx?: object;
}

export default function GenesysDescriptionTypography(props: Props) {
    const {text, variant, color, sx} = props;

    const sanitizedHtml = DOMPurify.sanitize(convertGenesysText(text), {
        ALLOWED_TAGS: ['i', 'b'],
        ALLOWED_ATTR: ['class']
    });

    return <Typography variant={variant} color={color} component="div" sx={sx} style={{wordWrap: 'break-word', textAlign: 'center'}}
                       dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>;
}