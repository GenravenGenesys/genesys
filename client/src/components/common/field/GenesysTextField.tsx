import {TextField} from "@mui/material";
import * as React from "react";

type Props = {
    text: string;
    label: string;
    disabled: boolean;
    onChange: (value: string) => void;
    fullwidth?: boolean;
    rows?: number;
};

const GenesysTextField: React.FC<Props> = ({text, label, disabled, onChange, fullwidth, rows}) => {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return <TextField value={text} fullWidth={fullwidth} multiline={rows !== 1} rows={rows ? rows : 1}
                      disabled={disabled} label={label} onChange={handleChange}/>;
};

export default GenesysTextField;
