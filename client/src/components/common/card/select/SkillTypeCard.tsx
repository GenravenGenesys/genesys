import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {SkillType} from "../../../../models/actor/Skill";
import CenteredCardHeader from "../header/CenteredCardHeader";

interface Props {
    value: SkillType
    onChange: (value: SkillType) => void
    disabled: boolean
}

export default function SkillTypeCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Skill Type'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as SkillType)}
                        disabled={disabled}
                        fullWidth
                        label={'Skill Type'}
                        variant={'standard'}>
                        {Object.values(SkillType).map(option => (
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