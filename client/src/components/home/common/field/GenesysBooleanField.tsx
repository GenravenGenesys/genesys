import {MenuItem, TextField} from "@mui/material";
import * as React from "react";

interface Props {
    value: boolean;
    onChange: (value: boolean) => void;
    label?: string;
}

const GenesysBooleanField: React.FC<Props> = ({value, onChange, label}) => {
    return (
        <TextField
            value={value ? 'Yes' : 'No'}
            select
            onChange={(e) => onChange(e.target.value === 'Yes')}
            fullWidth
            label={label}
        >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
        </TextField>
    );
}

export default GenesysBooleanField;