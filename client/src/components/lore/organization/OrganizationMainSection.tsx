import {Organization} from "../../../models/lore/Organization";
import React from "react";
import {Card} from "@mui/material";
import LoreTextBoxField from "../common/LoreTextBoxField";

type Props = {
    organization: Organization;
    updateOrganization: (organization: Organization) => void;
    disabled: boolean;
};

const OrganizationMainPage: React.FC<Props> = ({organization, updateOrganization, disabled}) => {

    const handleDescriptionChange = async (value: string) => {
        if (organization) {
            updateOrganization({...organization, description: value});
        }
    };

    return (
        <Card>
            <LoreTextBoxField value={organization.description} label={'Description'} onChange={handleDescriptionChange} disabled={disabled}/>
        </Card>
    )
};

export default OrganizationMainPage;