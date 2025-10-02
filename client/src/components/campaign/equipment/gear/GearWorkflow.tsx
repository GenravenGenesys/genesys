import {type FC, Fragment} from "react";
import {useLocation} from "react-router";
import CampaignGear from "./CampaignGear";
import {EquipmentPath} from "../../../../services/RootPath.ts";
import GearPage from "./GearPage.tsx";

const GearWorkflow: FC = () => {
    return <Fragment>{useLocation().pathname.endsWith(EquipmentPath.Gear) ? <CampaignGear/> : <GearPage/>}</Fragment>;
};

export default GearWorkflow;