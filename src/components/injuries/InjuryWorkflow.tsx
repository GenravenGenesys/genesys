import Injury from "../../models/Injury";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import InjuryEdit from "./InjuryEdit";
import InjuryView from "./InjuryView";
import ViewAllInjuries from "./ViewAllInjuries";

function useFetchInjury(id: string): Injury {
    const [injury, setInjury] = useState<Injury>()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            try {
                await fetch(`/injuries/${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setInjury(data as Injury)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, setInjury])
    return injury as Injury
}

export default function InjuryWorkflow() {
    const {injury_id} = useParams<{ injury_id?: string }>()
    const injury = useFetchInjury(injury_id!!)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return injury && <InjuryView injury={injury}/>
        } else if (pathname.endsWith('/edit')) {
            return injury && <InjuryEdit crit={injury}/>
        } else {
            return <ViewAllInjuries/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}