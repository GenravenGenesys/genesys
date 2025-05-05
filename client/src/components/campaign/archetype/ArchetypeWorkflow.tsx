import {useLocation} from "react-router";
import {Fragment} from "react";
import CampaignArchetypes from "./CampaignArchetypes";
import {RootPath} from "../../../services/RootPath";
import ArchetypePage from "./ArchetypePage";

export default function ArchetypeWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Archetype) ? <CampaignArchetypes/> : <ArchetypePage/>}
        </Fragment>
    )
}