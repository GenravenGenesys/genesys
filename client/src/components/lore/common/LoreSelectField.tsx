import * as React from "react";
import Typography from "@mui/material/Typography";
import GenesysSelectField from "../../common/field/GenesysSelectField";


type Props<T extends Record<string, string | number>> = {
    value: T[keyof T];
    label: string;
    onChange: (value: T[keyof T]) => void;
    options: T;
    disabled: boolean;
};

const LoreSelectField = <T extends Record<string, string | number>>({
                                                                        value,
                                                                        label,
                                                                        onChange,
                                                                        options,
                                                                        disabled,
                                                                    }: Props<T>) => {
    return disabled ? (
        <Typography>{label}: {value}</Typography>
    ) : (
        <GenesysSelectField<T>
            value={value}
            label={label}
            onChange={onChange}
            options={options}
            disabled={disabled}
        />
    );
};

export default LoreSelectField;
