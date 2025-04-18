import { useLocation } from "react-router-dom";
import CampaignMinion from "./CampaignMinion";
import { ActorPath } from "../../../../services/RootPath";
import MinionPage from "./MinionPage";
import * as React from "react";

const MinionWorkflow: React.FC = () => {
    return useLocation().pathname.endsWith(ActorPath.Minion) ? <CampaignMinion /> : <MinionPage />;
};

export default MinionWorkflow;
