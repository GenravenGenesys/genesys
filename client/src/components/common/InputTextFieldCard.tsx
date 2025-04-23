import {Card, CardHeader, Divider} from "@mui/material"
import InlineTextField from "./InlineTextField"
import GridItem from "./grid/GridItem";

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
        <GridItem>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}}/>
                <Divider/>
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit} helperText={helperText}
                                 placeholder={placeholder} errorText={errorText}/>
            </Card>
        </GridItem>
    )
}