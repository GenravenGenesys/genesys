import {Fragment} from "react";
import {useLocation} from "react-router";
import CampaignWeapon from "./CampaignWeapon";
import {EquipmentPath} from "../../../../services/RootPath";
import WeaponPage from "./WeaponPage";

export default function WeaponWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(EquipmentPath.Weapon) ? <CampaignWeapon/> : <WeaponPage/>}
        </Fragment>
    )
}