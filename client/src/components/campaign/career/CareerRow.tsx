import {Fragment, useState} from "react";
import {Collapse} from "@mui/material";
import type {Career} from "../../../api/model";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell.tsx";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell.tsx";
import {RootPath} from "../../../services/RootPath.ts";
import TableCell from "@mui/material/TableCell";
import {renderSkillNames} from "../../common/skill/SkillRenders.tsx";

interface Props {
    career: Career
    columns: number
}

export default function CareerRow(props: Props) {
    const {career, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={career.name}/>
                <ActionsTableCell name={career.id} path={RootPath.Career}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, textAlign: 'center' }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {renderSkillNames(career.skills)}
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}