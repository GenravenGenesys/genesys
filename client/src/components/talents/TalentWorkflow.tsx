import React, {Fragment} from "react";
import {useLocation} from "react-router";
import ViewAllTalents from "./ViewAllTalents";
import TalentPage from "./TalentPage";
import {RootPath} from "../../services/RootPath";


const TalentWorkflow: React.FC = () => {
    return <Fragment>{useLocation().pathname.endsWith(RootPath.Talent) ? <ViewAllTalents/> : <TalentPage/>}</Fragment>;
};

export default TalentWorkflow;