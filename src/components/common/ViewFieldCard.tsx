import {Card, CardActions, CardHeader, Divider, Grid} from "@mui/material";
import GenesysDescriptionTypography from "./GenesysDescriptionTypography";
import InlineTextField from "../input/InlineTextField";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface ViewProps {
    name: string
    value: string
}

export function ViewFieldCard(props: ViewProps): JSX.Element {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={name} style={{ textAlign: 'center' }} />
                <Divider />
                <GenesysDescriptionTypography text={value}/>
            </Card>
        </Grid>
    )
}

interface EditStringProps {
    defaultValue: string,
    onCommit: (value: string) => void,
    title: string,
    errorText?: string,
}

export function EditStringFieldCard(props: EditStringProps): JSX.Element {
    const { defaultValue, onCommit, title, errorText } = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit} helperText={defaultValue} placeholder={defaultValue} errorText={errorText} />
            </Card>
        </Grid>
    )
}

interface EditNumberProps {
    value: number,
    title: string,
    onChange: (value: number) => void
    min: number
    max: number
}

export function EditNumberFieldCard(props: EditNumberProps): JSX.Element {
    const { value, title, onChange, min, max } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={value} min={min} max={max} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}