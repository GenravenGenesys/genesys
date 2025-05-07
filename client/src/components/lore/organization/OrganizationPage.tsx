import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import {Organization} from "../../../models/lore/Organization";
import OrganizationService from "../../../services/lore/OrganizationService";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import {LorePath} from "../../../services/RootPath";
import GridContainer from "../../common/grid/GridContainer";

const OrganizationPage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    let pathname = useLocation().pathname;

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

    return (
        <Card>
            <CenteredCardHeaderWithAction title={organization.name} path={LorePath.Organization + organization.id}/>
            <CardContent>
                <GridContainer centered>

                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default OrganizationPage;