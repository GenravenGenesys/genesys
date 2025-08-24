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
import Nemesis from "../../../../models/actor/npc/Nemesis";
import ActionsTableCell from "../../../common/table/actions/ActionsTableCell";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {ActorType} from "../../../../models/actor/Actor";
import {ActorPath} from "../../../../services/RootPath";
import CreateActorDialog from "../../actor/common/CreateActorDialog";
import {useFetchCurrentCampaign} from "../../CampaignWorkflow";
import NemesisService from "../../../../services/actor/NemesisService";

interface Props {
    nemesis: Nemesis
}

function Row(props: Props) {
    const {nemesis} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={nemesis.name}/>
                <ActionsTableCell name={nemesis.id} path={ActorPath.Nemesis}/>
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

export default function CampaignNemeses() {
    const [nemeses, setNemeses] = useState<Nemesis[]>([]);
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false);
    const campaign = useFetchCurrentCampaign();
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setNemeses(await NemesisService.getNemeses(campaign.id));
        })()
    }, [campaign]);

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Nemeses'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenActorCreationDialog(true)}>Create Nemesis</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {nemeses.map((nemesis: Nemesis) => (
                                <Row key={nemesis.name} nemesis={nemesis}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog}
                                                           onClose={(): void => setOpenActorCreationDialog(false)}
                                                           actorType={ActorType.Nemesis}/>}
        </Card>
    )
}