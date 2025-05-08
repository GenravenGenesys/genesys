import {useLocation} from "react-router";
import {LorePath} from "../../../services/RootPath";
import {Fragment} from "react";
import ViewAllOrganizations from "./ViewAllOrganization";
import OrganizationPage from "./OrganizationPage";

const OrganizationWorkflow = ()=> {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(LorePath.Organization) ? <ViewAllOrganizations/> : <OrganizationPage/>}
        </Fragment>
    );
};

export default OrganizationWorkflow;