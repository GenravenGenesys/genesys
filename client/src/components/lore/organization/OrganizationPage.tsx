import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import {Organization} from "../../../models/lore/Organization";
import OrganizationService from "../../../services/lore/OrganizationService";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import {LorePath} from "../../../services/RootPath";
import GridContainer from "../../common/grid/GridContainer";
import GridItem from "../../common/grid/GridItem";
import OrganizationSidebar from "./OrganizationSidebar";

const OrganizationPage = () => {
    const {id} = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    let disabled = useLocation().pathname.endsWith('/view');

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setOrganization(await OrganizationService.getOrganization(id))
        })()
    }, [id, setOrganization])

    if (!organization) {
        return <Fragment/>;
    }

    const updateOrganization = async (updatedOrganization: Organization) => {
        setOrganization(await OrganizationService.updateOrganization(updatedOrganization));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={organization.name} path={LorePath.Organization + organization.id}/>
            <CardContent>
                <GridContainer centered>
                    <GridItem width={.75}>

                    </GridItem>
                    <GridItem width={.25}>
                        <OrganizationSidebar organization={organization} updateOrganization={updateOrganization}
                                             disabled={disabled}/>
                    </GridItem>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default OrganizationPage;