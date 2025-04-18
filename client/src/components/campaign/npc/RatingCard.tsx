import {Card, CardContent, Grid, TextField} from "@mui/material";
import * as React from "react";
import {RatingType} from "../../../models/actor/npc/NonPlayerActor";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";

interface Props {
    type: RatingType
    value: number
    onChange: (value: number, type: RatingType) => void
    disabled: boolean
}

export default function RatingCard(props: Props) {
    const {type, value, onChange, disabled} = props;

    return (
        <Grid xs>
            <Card>
                <CenteredCardHeader title={type}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={value}
                        label={type}
                        fullWidth
                        onChange={(e) => onChange(Number(e.target.value), type)}
                        inputProps={{min: 1, max: 20}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}