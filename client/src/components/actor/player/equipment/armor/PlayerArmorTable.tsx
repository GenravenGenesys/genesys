import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {ActorArmor, ArmorSlot} from "../../../../../models/equipment/Armor";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {renderQualities, renderSoak} from "../../../../../models/equipment/EquipmentHelper";

interface Props {
    armor: ActorArmor[]
}

export default function PlayerArmorTable(props: Props) {
    const {armor} = props
    const headers = ['Name', 'Equipped', 'Defense', 'Soak', 'Special Qualities']

    const renderTableBody = () => {
        if (!armor) {
            return
        } else {
            return armor.map((actorArmor: ActorArmor) => (
                <Row armor={actorArmor}/>
            ))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {renderTableBody()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface RowProps {
    armor: ActorArmor
}

function Row(props: RowProps) {
    const {armor} = props

    const renderEquipped = (): string => {
        return armor.slot === ArmorSlot.Body ? 'True' : 'False';
    }

    return (
        <TableRow key={armor.name}>
            <TypographyLeftTableCell value={armor.name}/>
            <TypographyCenterTableCell value={renderEquipped()}/>
            <TypographyCenterTableCell value={String(armor.defense)}/>
            <TypographyCenterTableCell value={renderSoak(armor)}/>
            <TypographyCenterTableCell value={renderQualities(armor!!)}/>
        </TableRow>
    )
}