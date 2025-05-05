import {useLocation} from "react-router";
import {Fragment} from "react";
import CampaignCareers from "./CampaignCareers";
import {RootPath} from "../../../services/RootPath";
import CareerPage from "./CareerPage";

export default function CareerWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Career) ? <CampaignCareers/> : <CareerPage/>}
        </Fragment>
    )
}