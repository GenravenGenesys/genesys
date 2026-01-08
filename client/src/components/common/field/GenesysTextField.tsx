import {TextField} from "@mui/material";
import * as React from "react";

interface Props {
    text: string;
    label: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    fullwidth?: boolean;
    rows?: number;
}

const GenesysTextField: React.FC<Props> = ({text, label, onChange, disabled, fullwidth, rows}) => {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return <TextField value={text} fullWidth={fullwidth} multiline={rows !== 1} rows={rows ? rows : 1}
                      disabled={disabled} label={label} onChange={handleChange}/>;
};

export default GenesysTextField;
