import NonPlayerActor from "../../../../models/actor/npc/NonPlayerActor";
import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import NonPlayerCharacterAbilityTable from "./NonPlayerCharacterAbilityTable";
import {Fragment, useState} from "react";
import CreateAbilityDialog from "./CreateAbilityDialog";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {useLocation} from "react-router-dom";

interface Props {
    npc: NonPlayerActor
}

export default function NonPlayerCharacterAbilityCard(props: Props): JSX.Element {
    const {npc} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (npc?.abilities!!.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <NonPlayerCharacterAbilityTable npc={npc}/>
    }

    const renderCreateAbilityButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                        Ability</Button>
                    {openCreateAbilityDialog && <CreateAbilityDialog actor={npc} open={openCreateAbilityDialog}
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