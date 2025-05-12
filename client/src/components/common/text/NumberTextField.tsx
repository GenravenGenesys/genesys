import React from "react";
import {TextField} from "@mui/material";

type Props = {
    title: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    disabled?: boolean;
    steps?: number;
};

const NumberTextField: React.FC<Props> =  ({title, value, onChange, min, max, disabled, steps}) => {
    return <TextField
        type="number"
        value={value}
        label={title}
        fullWidth
        onChange={(e) => onChange(Number(e.target.value))}
        slotProps={{htmlInput: {min: min, max: max, step: steps}}}
        disabled={disabled}
    />;
};

export default NumberTextField;