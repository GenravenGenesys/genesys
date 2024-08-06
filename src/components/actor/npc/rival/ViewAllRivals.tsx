import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import ActorService from '../../../../services/ActorService'
import Rival from "../../../../models/actor/npc/Rival";
import ActionsTableCell, {ViewActionTableCell} from "../../../common/table/ActionsTableCell";
import {ActorPath} from "../../../../services/RootPath";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import CreateActorDialog from "../CreateActorDialog";
import {ActorType} from "../../../../models/actor/Actor";

interface Props {
    rival: Rival
}

function Row(props: Props) {
    const {rival} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={rival.name}/>
                <ViewActionTableCell id={rival.actor_id} path={ActorPath.Rival}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllRivals() {
    const [rivals, setRivals] = useState<Rival[]>([])
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false)
    const headers = ['Name', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setRivals(await ActorService.getRivals())
        })()
    }, [setRivals])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Rivals'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenActorCreationDialog(true)}>Create Rival</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {rivals.map((rival: Rival) => (
                                <Row key={rival.name} rival={rival}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog}
                                                           onClose={(): void => setOpenActorCreationDialog(false)}
                                                           actorType={ActorType.Rival}/>}
        </Card>
    )
}