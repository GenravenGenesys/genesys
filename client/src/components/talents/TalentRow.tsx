import {Fragment, useState} from "react";
import {Collapse, Table} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell.tsx";
import BooleanTableCell from "../common/table/BooleanTableCell.tsx";
import ActionsTableCell from "../common/table/actions/ActionsTableCell.tsx";
import {RootPath} from "../../services/RootPath.ts";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography.tsx";
import type {Talent} from "../../api/model";

interface Props {
    talent: Talent;
    columns: number;
}

export default function TalentRow(props: Props) {
    const {talent, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={talent.name}/>
                <BooleanTableCell bool={talent.ranked}/>
                <TypographyCenterTableCell value={talent.activation}/>
                <TypographyCenterTableCell value={talent.tier}/>
                <ActionsTableCell name={talent.id} path={RootPath.Talent}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={talent.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}