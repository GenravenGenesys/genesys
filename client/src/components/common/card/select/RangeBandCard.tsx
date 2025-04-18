import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import {RangeBand} from "../../../../models/common/RangeBand";

interface Props {
    value: RangeBand
    onChange: (value: RangeBand) => void
    disabled: boolean
}

export default function RangeBandCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid xs>
            <Card>
                <CenteredCardHeader title={'Range Band'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as RangeBand)}
                        disabled={disabled}
                        fullWidth
                        label={'Range Band'}
                    >
                        {Object.values(RangeBand).map(option => (
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