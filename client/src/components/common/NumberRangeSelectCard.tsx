import {Card, CardActions, Grid} from "@mui/material";
import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import CenteredCardHeader from "./card/header/CenteredCardHeader";

interface Props {
    defaultValue: number
    title: string
    onChange: (value: number) => void
    min: number
    max: number
}

export default function NumberRangeSelectCard(props: Props) {
    const {defaultValue, title, onChange, min, max} = props

    return (
        <Grid xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defaultValue} min={min} max={max} onCommit={onChange}/>
                </CardActions>
            </Card>
        </Grid>
    )
}