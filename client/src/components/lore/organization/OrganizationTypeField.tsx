import {MenuItem, TextField} from "@mui/material";
import * as React from "react";
import {OrgType} from "../../../models/lore/Organization";
import Typography from "@mui/material/Typography";


type Props = {
    value: OrgType;
    onChange: (value: OrgType) => void;
    disabled: boolean;
};

const OrganizationTypeField: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <Typography>Organization Type: {value}</Typography> : <TextField
        value={value}
        select
        onChange={(e) => onChange(e.target.value as OrgType)}
        disabled={disabled}
        fullWidth
        label={'Organization Type'}
    >
        {Object.values(OrgType).map(option => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>;
};

export default OrganizationTypeField;
