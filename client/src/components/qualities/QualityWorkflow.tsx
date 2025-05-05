import {Fragment} from "react";
import {useLocation} from "react-router";
import ViewAllQualities from "./ViewAllQualities";
import {RootPath} from "../../services/RootPath";
import QualityPage from "./QualityPage";

export default function QualityWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Qualities) ? <ViewAllQualities/> : <QualityPage/>}
        </Fragment>
    )
}