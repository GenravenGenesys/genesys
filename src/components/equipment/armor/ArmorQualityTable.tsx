import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {EquipmentQuality} from "../../../models/Quality";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../common/table/TypographyTableCell";
import {renderDoubleRowTableHeader} from "../../common/table/TableRenders";
import {Armor} from "../../../models/equipment/Armor";

interface Props {
    quality: EquipmentQuality
}

function Row(props: Props) {
    const {quality} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={quality.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={String(quality.ranks)}/>
        </TableRow>
    )
}

interface TableProps {
    armor: Armor
}

export default function ArmorQualityTable(props: TableProps) {
    const {armor} = props
    const headers = ['Name', 'Ranks']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Armor Special Qualities')}
                <TableBody>
                    {(armor.qualities || []).map((quality: EquipmentQuality) => (
                        <Row key={quality.name} quality={quality}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}