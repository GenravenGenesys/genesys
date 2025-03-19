import {Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import * as React from "react";
import ViewFieldCard from "../ViewFieldCard";

interface Props {
    title: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled: boolean;
    steps?: number;
}

const NumberTextFieldCard: React.FC<Props> = ({title, value, onChange, min, max, disabled, steps}) => {
    return disabled ? <ViewFieldCard name={title} value={String(value)}/> :
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={value}
                        label={title}
                        fullWidth
                        onChange={(e) => onChange(Number(e.target.value))}
                        inputProps={{min: min, max: max, step: steps}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>;
};

export default NumberTextFieldCard;