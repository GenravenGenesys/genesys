import {Fragment, useState} from "react";
import {Box, Collapse} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell.tsx";
import {renderPrice, renderSoak} from "../../../../util/EquipmentHelper.ts";
import ActionsTableCell from "../../../common/table/actions/ActionsTableCell.tsx";
import TableCell from "@mui/material/TableCell";
import {EquipmentPath} from "../../../../services/RootPath.ts";
import GenesysDescriptionTypography from "../../../home/common/typography/GenesysDescriptionTypography.tsx";
import type {Armor} from "../../../../api/model";

interface Props {
    armor: Armor
    columns: number
}

export default function ArmorRow(props: Props) {
    const {armor, columns} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={armor.name}/>
                <TypographyCenterTableCell value={String(armor.defense)}/>
                <TypographyCenterTableCell value={renderSoak(armor)}/>
                <TypographyCenterTableCell value={String(armor.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice(armor)}/>
                <TypographyCenterTableCell value={String(armor.rarity)}/>
                <ActionsTableCell name={armor.id} path={EquipmentPath.Armor}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small">
                                <TableBody>
                                    <GenesysDescriptionTypography text={armor?.description!}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}