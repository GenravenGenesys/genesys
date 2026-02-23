import {TextField} from "@mui/material";
import * as React from "react";
import {type InputHTMLAttributes} from "react";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography.tsx";

interface Props {
    value: number;
    label: string;
    onChange: (value: number) => void;
    disabled?: boolean;
    fullwidth?: boolean;
    max?: number;
    step?: number;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const GenesysDiceField: React.FC<Props> = ({
                                                 value,
                                                 label,
                                                 onChange,
                                                 disabled,
                                                 fullwidth,
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
        label={<GenesysDescriptionTypography text={label}/>}
        onChange={handleChange}
        slotProps={{
            htmlInput: {
                min: 0,
                max: 5,
                step: 1,
                autoFocus: true,
                ...inputProps
            }
        }}
    />;
};

export default GenesysNumberField;
