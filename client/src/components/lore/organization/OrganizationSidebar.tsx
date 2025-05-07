import {Organization, OrgType} from "../../../models/lore/Organization";
import React, {Fragment} from "react";
import Typography from "@mui/material/Typography";
import {Card, CardContent} from "@mui/material";
import OrganizationTypeField from "./OrganizationTypeField";

type Props = {
    organization: Organization;
    updateOrganization: (organization: Organization) => void;
    disabled: boolean;
};

const OrganizationSidebar: React.FC<Props> = ({organization, updateOrganization, disabled})=> {

    const handleOrgTypeChange = async (value: OrgType) => {
        if (organization) {
            updateOrganization({...organization, orgType: value});
        }
    };

    const renderFragment = (name: string, value: any) => {
        return (
            <Fragment>
                <Typography>{name}</Typography>
                <Typography>{value}</Typography>
            </Fragment>
        )
    }

    return (
        <Card>
            <CardContent>
                <OrganizationTypeField value={organization.orgType} onChange={handleOrgTypeChange} disabled={disabled}/>
            </CardContent>
            {/*{organization.founded && renderFragment('Founding Date', organization.founded)}*/}
            {/*{organization.disbanded && renderFragment('Disbanded', organization.disbanded)}*/}
            {organization.nickname && renderFragment('Alternative Name', organization.nickname)}
            <Typography>{'Members are referred to as ' + organization.membersName}</Typography>
        </Card>
    )
}

export default OrganizationSidebar;