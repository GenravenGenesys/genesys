import {Card, CardContent} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import Player from "../../../models/actor/player/Player";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {ActorPath} from "../../../services/RootPath";
import Party from "../../../models/campaign/Party";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";

interface Props {
    party: Party
}

export default function PartyCard(props: Props) {
    const {party} = props;
    const headers = ['Name', 'View'];

    const renderTable = () => {
        if (party.players.length === undefined || party.players.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        else {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {party.players.map((player: Player) => (
                                <TableRow key={player.name}>
                                    <TypographyCenterTableCell value={player.name}/>
                                    <ActionsTableCell name={player.id} path={ActorPath.Player}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    return (
        <Card sx={{ width: 1 }}>
            <CenteredCardHeader title={'Party'}/>
            <CardContent>
                {renderTable()}
            </CardContent>
        </Card>
    )
}