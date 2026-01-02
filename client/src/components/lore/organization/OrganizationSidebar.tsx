import React from "react";
import Typography from "@mui/material/Typography";
import {Card, CardContent} from "@mui/material";
import LoreSelectField from "../common/LoreSelectField";
import LoreTextField from "../common/LoreTextField";
import type {Organization} from "../../../api/model";
import {OrganizationOrgType} from "../../../api/model";

interface Props {
    organization: Organization;
    updateOrganization: (organization: Organization) => void;
    disabled: boolean;
}

const OrganizationSidebar: React.FC<Props> = ({organization, updateOrganization, disabled}) => {

    const handleOrgTypeChange = async (value: OrganizationOrgType) => {
        if (organization) {
            updateOrganization({...organization, orgType: value});
        }
    };

    const handleNickNameChange = async (value: string) => {
        if (organization) {
            updateOrganization({...organization, nickname: value});
        }
    };

    return (
        <Card>
            <CardContent>
                <LoreSelectField value={organization.orgType} label={'Organization Type'} onChange={handleOrgTypeChange}
                                 disabled={disabled} options={OrganizationOrgType}/>
                {/*{organization.founded && renderFragment('Founding Date', organization.founded)}*/}
                {/*{organization.disbanded && renderFragment('Disbanded', organization.disbanded)}*/}
                <LoreTextField value={organization.nickname} label={'Alternative Name'} onChange={handleNickNameChange}
                               disabled={disabled}/>
            </CardContent>
            {/*{organization.nickname && renderFragment('Alternative Name', organization.nickname)}*/}
            <Typography>{'Members are referred to as ' + organization.membersName}</Typography>
        </Card>
    );
};

export default OrganizationSidebar;