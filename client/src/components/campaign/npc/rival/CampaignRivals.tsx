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
import RivalService from '../../../../services/actor/RivalService'
import Rival from "../../../../models/actor/npc/Rival";
import ActionsTableCell from "../../../common/table/actions/ActionsTableCell";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {Card, CardContent} from "@mui/material";
import {ActorType} from "../../../../models/actor/Actor";
import {useFetchCurrentCampaign} from "../../CampaignWorkflow";
import {ActorPath} from "../../../../services/RootPath";
import CreateActorDialog from "../../actor/common/CreateActorDialog";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton";

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
                <ActionsTableCell name={rival.id} path={ActorPath.Rival}/>
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

export default function CampaignRivals() {
    const [rivals, setRivals] = useState<Rival[]>([]);
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false);
    let campaign = useFetchCurrentCampaign();
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setRivals(await RivalService.getRivals(campaign.id));
        })()
    }, [campaign]);

    return (
        <Card>
            <CenteredCardHeaderWithButton title={'Campaign Rivals'}
                                          onClick={(): void => setOpenActorCreationDialog(true)}
                                          buttonText={'Create Rival'}/>
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