import {Fragment} from "react";
import {useLocation} from "react-router";
import CampaignArmor from "./CampaignArmor";
import ArmorPage from "./ArmorPage";
import {EquipmentPath} from "../../../../services/RootPath";

export default function ArmorWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(EquipmentPath.Armor) ? <CampaignArmor/> : <ArmorPage/>}
        </Fragment>
    )
}