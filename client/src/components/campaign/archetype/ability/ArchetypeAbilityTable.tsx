import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Archetype from "../../../../models/actor/player/Archetype";
import Ability from "../../../../models/Ability";
import {
    CostTableCell,
    GenesysDescriptionTypographyCenterTableCell, LimitTableCell, TypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../../common/table/TypographyTableCell";
import {renderDoubleRowTableHeader} from "../../../common/table/TableRenders";

interface Props {
    ability: Ability
}

function Row(props: Props): JSX.Element {
    const {ability} = props

    return (
        <TableRow key={ability.name}>
            <TypographyLeftTableCell value={ability.name}/>
            <LimitTableCell limit={ability.limiter}/>
            <CostTableCell cost={ability.cost}/>
            <TypographyCenterTableCell value={ability.activation}/>
            <GenesysDescriptionTypographyCenterTableCell value={ability.description}/>
        </TableRow>
    )
}

interface TableProps {
    archetype: Archetype
}

export default function ArchetypeAbilityTable(props: TableProps) {
    const {archetype} = props
    const headers = ['Name', 'Limit', 'Cost', 'Activation', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Abilities', 1)}
                <TableBody>
                    {(archetype?.abilities! || []).map((ability: Ability) => (
                        <Row ability={ability}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}