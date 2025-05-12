import {Organization, OrgType} from "../../../models/lore/Organization";
import React, {Fragment} from "react";
import Typography from "@mui/material/Typography";
import {Card, CardContent} from "@mui/material";
import LoreSelectField from "../common/LoreSelectField";
import LoreTextField from "../common/LoreTextField";

type Props = {
    organization: Organization;
    updateOrganization: (organization: Organization) => void;
    disabled: boolean;
};

const OrganizationSidebar: React.FC<Props> = ({organization, updateOrganization, disabled}) => {

    const handleOrgTypeChange = async (value: OrgType) => {
        if (organization) {
            updateOrganization({...organization, orgType: value});
        }
    };

    const handleNickNameChange = async (value: string) => {
        if (organization) {
            updateOrganization({...organization, nickname: value});
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
                <LoreSelectField value={organization.orgType} label={'Organization Type'} onChange={handleOrgTypeChange}
                                 disabled={disabled} options={OrgType}/>
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