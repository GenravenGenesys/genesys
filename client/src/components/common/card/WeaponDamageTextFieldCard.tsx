import {Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import {useLocation} from "react-router-dom";

interface Props {
    damage: number
    brawn: boolean
    onChange: (value: number) => void
    min: number
    max: number
    disabled: boolean
}

export default function WeaponDamageTextFieldCard(props: Props) {
    const {damage, brawn, onChange, min, max, disabled} = props;
    let pathname = useLocation().pathname;

    return (
        <Grid xs>
            <Card>
                <CenteredCardHeader title={"Damage"}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={brawn && pathname.endsWith('/view') ? `Brawn + ${damage}` : damage}
                        label={"Damage"}
                        fullWidth
                        onChange={(e) => onChange(Number(e.target.value))}
                        inputProps={{min: min, max: max}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}