import {TextField} from "@mui/material";
import * as React from "react";
import {type InputHTMLAttributes} from "react";

interface Props {
    value: number;
    label: string;
    onChange: (value: number) => void;
    disabled?: boolean;
    fullwidth?: boolean;
    min?: number;
    max?: number;
    step?: number;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const GenesysNumberField: React.FC<Props> = ({
                                                 value,
                                                 label,
                                                 onChange,
                                                 disabled,
                                                 fullwidth,
                                                 min,
                                                 max,
                                                 step,
                                                 inputProps
                                             }) => {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    return <TextField
        type="number"
        value={value}
        fullWidth={fullwidth}
        disabled={disabled}
        label={label}
        onChange={handleChange}
        slotProps={{
            htmlInput: {
                min,
                max,
                step: step ?? 1,
                autoFocus: true,
                ...inputProps
            }
        }}
    />;
};

export default GenesysNumberField;
