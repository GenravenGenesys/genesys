import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";
import ArmorView from "./ArmorView";
import ArmorEdit from "./ArmorEdit";
import ViewAllArmor from "./ViewAllArmor";

function useFetchArmor(id: string): Armor {
    const [armor, setArmor] = useState<Armor>()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setArmor(await EquipmentService.getArmor(id))
        })()
    }, [id, setArmor])
    return armor as Armor
}

export default function ArmorWorkflow() {
    const {armor_id} = useParams<{ armor_id: string }>()
    const armor = useFetchArmor(armor_id!)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return armor && <ArmorView armor={armor}/>
        } else if (pathname.endsWith('/edit')) {
            return armor && <ArmorEdit ar={armor}/>
        } else {
            return <ViewAllArmor/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}