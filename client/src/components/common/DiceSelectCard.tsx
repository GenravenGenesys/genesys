import {Card, CardActions, Grid} from "@mui/material";
import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import GenesysCenteredCardHeader from "./card/GenesysCenteredCardHeader";
import {DieType} from "../../models/Roll";

interface Props {
    defaultValue: number
    type: DieType
    onChange: (value: number) => void
}

export default function DiceSelectCard(props: Props) {
    const { defaultValue, type, onChange } = props
    console.log(type + ' ' + String(defaultValue))

    return (
        <Grid item xs>
            <Card>
                <GenesysCenteredCardHeader type={type}/>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defaultValue} min={0} max={6} onCommit={onChange}/>
                </CardActions>
            </Card>
        </Grid>
    )
}