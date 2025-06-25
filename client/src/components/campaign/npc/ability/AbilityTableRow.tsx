import { FC, Fragment, useState } from "react";
import Ability from "../../../../models/Ability"
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import { Collapse, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { TypographyLeftTableCell, TypographyCenterTableCell, GenesysDescriptionTypographyCenterTableCell } from "../../../common/table/TypographyTableCell";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";

type Props = {
    ability: Ability;
    npc: SingleNonPlayerCharacter;
    columns: number;
};

const AbilityTableRow: FC<Props> = ({ ability, npc, columns }) => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow key={ability.name} onClick={() => setOpen(!open)}>
                <TypographyLeftTableCell value={ability.name} />
                <TypographyCenterTableCell value={ability.activation} />
                <GenesysDescriptionTypographyCenterTableCell value={ability.description} />
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{ margin: 1 }}>
                            <TableBody>
                                <GenesysDescriptionTypography text={ability.description} />
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
            {/* <CardContent>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Table sx={{ margin: 1 }}>
                        <TableBody>
                            <GenesysDescriptionTypography text={ability.description} />
                        </TableBody>
                    </Table>
                </Collapse>
            </CardContent> */}
        </Fragment>
    );
};

export default AbilityTableRow;
