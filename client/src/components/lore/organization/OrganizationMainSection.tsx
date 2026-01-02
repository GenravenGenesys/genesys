import React from "react";
import {Card} from "@mui/material";
import LoreTextBoxField from "../common/LoreTextBoxField";
import type {Organization} from "../../../api/model";

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