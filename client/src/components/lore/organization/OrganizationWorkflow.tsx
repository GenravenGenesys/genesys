import {useLocation, useParams} from "react-router";
import {LorePath} from "../../../services/RootPath";
import {Organization} from "../../../models/lore/Organization";
import {Fragment, useEffect, useState} from "react";
import OrganizationView from "./OrganizationView";
import OrganizationEdit from "./OrganizationEdit";
import {ViewAllOrganizations} from "./ViewAllOrganization";
import OrganizationService from "../../../services/lore/OrganizationService";

function useFetchOrganization(name: string, path: LorePath): Organization {
    const [organization, setOrganization] = useState<Organization>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                setOrganization(await OrganizationService.getOrganization(name))
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setOrganization, path])
    return organization as Organization
}

export default function OrganizationWorkflow() {
    const {name} = useParams<{ name: string }>()
    const path = LorePath.Organization
    const organization = useFetchOrganization(name as string, path)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return organization && <OrganizationView organization={organization}/>
        } else if (pathname.endsWith('/edit')) {
            return organization && <OrganizationEdit org={organization}/>
        } else {
            return <ViewAllOrganizations/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}