import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Player from '../../../../models/actor/player/Player';
import ActionsTableCell from '../../../common/table/actions/ActionsTableCell';
import {ActorPath} from "../../../../services/RootPath";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {Card, CardContent} from "@mui/material";
import CreateActorDialog from "../../actor/common/CreateActorDialog";
import {ActorType} from "../../../../models/actor/Actor";
import {useFetchCurrentCampaign} from "../../CampaignWorkflow";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton";
import PlayerService from "../../../../services/actor/PlayerService";

export default function ViewAllPlayers() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false);
    const headers = ['Name', 'View'];
    const campaign = useFetchCurrentCampaign();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setPlayers(await PlayerService.getPlayers(campaign.id));
        })()
    }, [campaign])

    return (
        <Card>
            <CenteredCardHeaderWithButton title={'View All Players'}
                                          onClick={(): void => setOpenActorCreationDialog(true)}
                                          buttonText={'Create Player'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {players.map((player: Player) => (
                                <TableRow key={player.name}>
                                    <TypographyCenterTableCell value={player.name}/>
                                    <ActionsTableCell name={player.id} path={ActorPath.Player}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog}
                                                           onClose={(): void => setOpenActorCreationDialog(false)}
                                                           actorType={ActorType.Player}/>}
        </Card>
    );
}