import * as React from "react";
import {OrgType} from "../../../models/lore/Organization";
import Typography from "@mui/material/Typography";
import GenesysSelectField from "../../common/field/GenesysSelectField";


type Props = {
    value: OrgType;
    onChange: (value: OrgType) => void;
    disabled: boolean;
};

const OrganizationTypeField: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <Typography>Organization Type: {value}</Typography> :
        <GenesysSelectField value={value} label={'Organization Type'} onChange={onChange} options={OrgType}
                            disabled={disabled}/>;
};

export default OrganizationTypeField;
