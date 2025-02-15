import { Card, CardContent } from "@mui/material";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import { ActorTalent } from "../../../../../models/Talent";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { renderSingleRowTableHeader } from "../../../../common/table/TableRenders";
import * as React from "react";
import TalentActivationTableCell from "../../../../common/table/TalentActivationTableCell";
import Player from "../../../../../models/actor/player/Player";

interface Props {
    player: Player;
    talents: ActorTalent[];
}

const PlayerTalentCard: React.FC<Props> = ({ player, talents }) => {
    const headers = ['Name', 'Summary', 'Activate'];

    return (
        <Card sx={{ "width": 1 }}>
            <CenteredCardHeader title={'Talents'} />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: ActorTalent, index) => (
                                <TableRow key={index}>
                                    <TypographyCenterTableCell value={talent.name} />
                                    <GenesysDescriptionTypographyCenterTableCell value={talent.summary} />
                                    <TalentActivationTableCell talent={talent} actor={player} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
};

export default PlayerTalentCard;
