import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import GenesysTalentTypography from "../../../common/typography/GenesysTalentTypography";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import {renderDoubleRowTableHeader} from "../../../common/table/TableRenders";
import {ActorTalent} from "../../../../models/Talent";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";

interface Props {
    talent: ActorTalent
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {talent, skillRanks} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={talent.name}/>
            <TableCell>
                <GenesysTalentTypography text={talent.summary} ranks={talent.ranks} secondRanks={skillRanks}/>
            </TableCell>
        </TableRow>
    );
}

interface TableProps {
    npc: SingleNonPlayerCharacter
}

export default function NonPlayerCharacterTalentTable(props: TableProps) {
    const {npc} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Talents', headers.length)}
                <TableBody>
                    {(npc.talents || []).map((talent: ActorTalent) => (
                        <Row key={talent.name} talent={talent}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}