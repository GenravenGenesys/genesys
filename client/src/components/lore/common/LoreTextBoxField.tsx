import React from "react";
import GenesysTextField from "../../common/field/GenesysTextField";

type Props = {
    value: string;
    label: string;
    onChange: (value: string) => void;
    disabled: boolean;
};

const LoreTextBoxField: React.FC<Props> = ({value, label, onChange, disabled}) => {
    return <GenesysTextField text={value} label={label} disabled={disabled} onChange={onChange} fullwidth/>
};

export default LoreTextBoxField;