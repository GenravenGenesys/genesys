import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import ActionsTableCell from '../../../common/table/actions/ActionsTableCell';
import {ActorPath} from "../../../../services/RootPath";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import CreateActorDialog from "../../actor/common/CreateActorDialog";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton";
import {useFetchAllPlayers} from "../../../../hooks/useFetchAllPlayers.ts";
import {ActorType, type Player} from "../../../../api/model";

export default function ViewAllPlayers() {
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false);
    const headers = ['Name', 'View'];
    const {players, loading, error} = useFetchAllPlayers();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

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