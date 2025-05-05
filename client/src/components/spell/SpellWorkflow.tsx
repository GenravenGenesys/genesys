import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import SpellService from "../../services/SpellService";
import Spell from "../../models/spell/Spell";
import SpellEdit from "./SpellEdit";
import SpellView from "./SpellView";
import ViewAllSpells from "./ViewAllSpells";

function useFetchSpell(name: string): Spell {
    const [spell, setSpell] = useState<Spell>()

    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const spellData = await SpellService.getSpell(name)
                if (spellData) {
                    setSpell(spellData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setSpell])
    return spell as Spell
}

export default function SpellWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const spell = useFetchSpell(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return spell && <SpellView spell={spell}/>
        } else if (pathname.endsWith('/edit')) {
            return spell && <SpellEdit sp={spell}/>
        } else {
            return <ViewAllSpells/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}