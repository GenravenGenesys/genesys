import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {Gear} from "../../../../models/equipment/Gear";
import EquipmentService from "../../../../services/EquipmentService";
import GearView from "./GearView";
import GearEdit from "./GearEdit";
import CampaignGear from "./CampaignGear";


function useFetchGear(name: string): Gear {
    const [gear, setGear] = useState<Gear>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const gearData = await EquipmentService.getGear(name)
                if (gearData) {
                    setGear(gearData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setGear])
    return gear as Gear
}

export default function GearWorkflow() {
    const {name} = useParams<{ name?: string }>()
    const gear = useFetchGear(name as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return gear && <GearView gear={gear}/>
        } else if (pathname.endsWith('/edit')) {
            return gear && <GearEdit gea={gear}/>
        } else {
            return <CampaignGear/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}