import type {Spell} from "../../api/model";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import {GenesysDifficultyCenterTableCell, TypographyCenterTableCell} from "../common/table/TypographyTableCell.tsx";
import ActionsTableCell from "../common/table/actions/ActionsTableCell.tsx";
import {RootPath} from "../../services/RootPath.ts";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography.tsx";

interface Props {
    spell: Spell;
    columns: number;
}

export default function SpellRow(props: Props) {
    const {spell, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={spell.name!}/>
                <GenesysDifficultyCenterTableCell difficulty={spell.difficulty!}/>
                <ActionsTableCell name={spell.id!} path={RootPath.Spell}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={spell.description!}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}