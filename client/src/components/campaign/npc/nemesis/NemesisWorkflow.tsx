import {Fragment} from "react";
import {useLocation} from "react-router";
import CampaignNemeses from "./CampaignNemeses";
import {ActorPath} from "../../../../services/RootPath";
import NemesisPage from "./NemesisPage";

export default function NemesisWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Nemesis) ? <CampaignNemeses/> : <NemesisPage/>}
        </Fragment>
    )
}