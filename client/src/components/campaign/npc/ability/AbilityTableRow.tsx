import React, { Fragment } from "react";
import {
    TableRow,
    TableCell,
    Collapse,
    Table,
    TableBody,
    Box,
} from "@mui/material";
import Ability from "../../../../models/Ability";
import { TypographyLeftTableCell, TypographyCenterTableCell, GenesysDescriptionTypographyCenterTableCell } from "../../../common/table/TypographyTableCell";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";

type Props = {
    ability: Ability;
    columns: number;
    isOpen: boolean;
    onToggle: () => void;
};

const AbilityTableRow: React.FC<Props> = ({ ability, columns, isOpen, onToggle, }) => {
    return (
        <Fragment>
            <TableRow onClick={onToggle}>
                <TypographyLeftTableCell value={ability.name} />
                <TypographyCenterTableCell value={ability.activation} />
                <GenesysDescriptionTypographyCenterTableCell value={ability.description} />
            </TableRow>
            <TableRow>
                <TableCell colSpan={columns} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={columns}>
                                            <GenesysDescriptionTypography text={ability.description} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

export default AbilityTableRow;
