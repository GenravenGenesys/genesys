import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import {Characteristic, CharacteristicType} from "../../models/actor/Characteristics";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface Props {
    characteristic: Characteristic,
    type: CharacteristicType,
}

export default function CharacteristicBox(props: Props): JSX.Element {
    const { characteristic, type } = props;

    const onChange = async (value: number) => {
        characteristic.current = value
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{characteristic.current}</Typography>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={characteristic.current} min={1} max={6} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}