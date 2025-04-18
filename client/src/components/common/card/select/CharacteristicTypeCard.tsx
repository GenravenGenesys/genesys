import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {CharacteristicType} from "../../../../models/actor/Characteristic";

interface Props {
    value: CharacteristicType
    onChange: (value: CharacteristicType) => void
    disabled: boolean
}

export default function CharacteristicTypeCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid xs>
            <Card>
                <CenteredCardHeader title={'Characteristic Type'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as CharacteristicType)}
                        disabled={disabled}
                        fullWidth
                        label={'Characteristic Type'}
                        variant={"standard"}
                    >
                        {Object.values(CharacteristicType).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </Grid>
    )
}