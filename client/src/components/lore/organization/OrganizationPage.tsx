import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import {LorePath} from "../../../services/RootPath";
import GridContainer from "../../common/grid/GridContainer";
import GridItem from "../../common/grid/GridItem";
import OrganizationSidebar from "./OrganizationSidebar";
import OrganizationMainPage from "./OrganizationMainSection";
import type {Organization} from "../../../api/model";
import {getOrganizationController} from "../../../api/generated/organization-controller/organization-controller.ts";

const OrganizationPage = () => {
    const {id} = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const disabled = useLocation().pathname.endsWith('/view');

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getOrganizationController().getOrganization(id);
                setOrganization(response);
            } catch (err) {
                setError('Failed to load injury.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    if (!organization || !id) {
        return <Fragment/>;
    }

    const updateOrganization = async (updatedOrganization: Organization) => {
        setOrganization(await getOrganizationController().updateOrganization(id, updatedOrganization));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={organization.name} path={LorePath.Organization + organization.id}/>
            <CardContent>
                <GridContainer centered>
                    <GridItem width={.75}>
                        <OrganizationMainPage organization={organization} updateOrganization={updateOrganization}
                                              disabled={disabled}/>
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