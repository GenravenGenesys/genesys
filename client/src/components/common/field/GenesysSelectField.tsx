import React from "react";
import {MenuItem, TextField} from "@mui/material";

type Props<T extends Record<string, string | number>> = {
    value: T[keyof T];
    label: string;
    onChange: (value: T[keyof T]) => void;
    options: T
    disabled?: boolean;
};

const GenesysSelectField = <T extends Record<string, string | number>>({
                                                                           value,
                                                                           label,
                                                                           onChange,
                                                                           options,
                                                                           disabled
                                                                       }: Props<T>) => {
    return (
        <TextField
            value={value}
            select
            onChange={(e) => onChange(e.target.value as T[keyof T])}
            disabled={disabled}
            fullWidth
            label={label}
        >
            {Object.values(options).map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};


export default GenesysSelectField;