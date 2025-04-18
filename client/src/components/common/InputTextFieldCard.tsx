import {Card, CardHeader, Divider, Grid} from "@mui/material"
import InlineTextField from "./InlineTextField"

interface TextProps {
    defaultValue: string
    onCommit: (value: string) => void
    title: string
    helperText: string
    placeholder: string
    errorText?: string
}

export function InputTextFieldCard(props: TextProps) {
    const {defaultValue, onCommit, title, helperText, placeholder, errorText} = props;
    return (
        <Grid xs>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}}/>
                <Divider/>
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit} helperText={helperText}
                                 placeholder={placeholder} errorText={errorText}/>
            </Card>
        </Grid>
    )
}