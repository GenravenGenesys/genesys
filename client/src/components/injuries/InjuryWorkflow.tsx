import {Fragment} from "react";
import {useLocation} from "react-router";
import ViewAllInjuries from "./ViewAllInjuries";
import {RootPath} from "../../services/RootPath";
import InjuryPage from "./InjuryPage";

export default function InjuryWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Injury) ? <ViewAllInjuries/> : <InjuryPage/>}
        </Fragment>
    )
}