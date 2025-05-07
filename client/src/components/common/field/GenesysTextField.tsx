import {TextField} from "@mui/material";
import * as React from "react";

type Props = {
    text: string;
    label: string;
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fullwidth?: boolean;
    rows?: number;
};

const GenesysTextField: React.FC<Props> = ({text, label, disabled, onChange, fullwidth, rows}) => {
    return <TextField value={text} variant="outlined" fullWidth={fullwidth} multiline={rows !== 1}
                      rows={rows ? rows : 4} disabled={disabled} label={label} onChange={onChange}/>;
};

export default GenesysTextField;
