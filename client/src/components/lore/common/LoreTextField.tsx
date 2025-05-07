import React from "react";
import GenesysTextField from "../../common/field/GenesysTextField";
import Typography from "@mui/material/Typography";

type Props = {
    value: string;
    label: string;
    onChange: (value: string) => void;
    disabled: boolean;
};

const LoreTextField: React.FC<Props> = ({value, label, onChange, disabled}) => {
    return disabled ? (<Typography>{label}: {value}</Typography>) : (
        <GenesysTextField text={value} label={label} disabled={disabled} onChange={onChange} rows={1} fullwidth/>);
};

export default LoreTextField;