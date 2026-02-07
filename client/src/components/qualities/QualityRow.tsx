import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell.tsx";
import TableCell from "@mui/material/TableCell";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography.tsx";
import GenesysQualityTypography from "../common/typography/GenesysQualityTypography.tsx";
import {renderUsable} from "../../util/EquipmentHelper.ts";
import ActionsTableCell from "../common/table/actions/ActionsTableCell.tsx";
import {RootPath} from "../../app/RootPath.ts";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Fragment, useState} from "react";
import type {Quality} from "../../api/model";

interface Props {
    quality: Quality;
    columns: number;
}

export default function QualityRow(props: Props)  {
    const {quality, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={quality.name!}/>
                <TableCell style={{textAlign: 'center'}}>
                    {quality.cost === 0 ? <GenesysDescriptionTypography text={'Passive'}/> :
                        <GenesysQualityTypography ranks={quality.cost!}/>}
                </TableCell>
                <TypographyCenterTableCell value={renderUsable(quality)}/>
                <ActionsTableCell name={quality.id!} path={RootPath.Qualities}/>
            </TableRow>
            <TableRow>
                <TableCell  style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={quality.description!}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}