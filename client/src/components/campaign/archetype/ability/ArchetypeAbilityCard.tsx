import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Fragment, useState} from "react";
import {useLocation} from "react-router";
import Archetype from "../../../../models/actor/player/Archetype";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import ArchetypeAbilityTable from "./ArchetypeAbilityTable";
import CreateArchetypeAbilityDialog from "./CreateArchetypeAbilityDialog";

interface Props {
    archetype: Archetype
}

export default function ArchetypeAbilityCard(props: Props) {
    const {archetype} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = () => {
        if (archetype.abilities.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <ArchetypeAbilityTable archetype={archetype}/>
    }

    const renderCreateAbilityButton = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                        Ability</Button>
                    {openCreateAbilityDialog &&
                        <CreateArchetypeAbilityDialog archetype={archetype} open={openCreateAbilityDialog}
                                                      onClose={(): void => setOpenCreateAbilityDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Abilities'}/>
            <CardContent>
                {renderTable()}
                {renderCreateAbilityButton()}
            </CardContent>
        </Card>
    )
}