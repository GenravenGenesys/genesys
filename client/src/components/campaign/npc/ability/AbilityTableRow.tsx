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
import { TypographyLeftTableCell, TypographyCenterTableCell, GenesysDescriptionTypographyCenterTableCell, GenesysDicePoolCenterTableCellButton, GenesysDifficultyCenterTableCell } from "../../../common/table/TypographyTableCell";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import { getActorSkill } from "../../../common/skill/SkillRenders";

type Props = {
    npc: SingleNonPlayerCharacter;
    ability: Ability;
    columns: number;
    isOpen: boolean;
    onToggle: () => void;
};

const AbilityTableRow: React.FC<Props> = ({ npc, ability, columns, isOpen, onToggle, }) => {
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
                                        <TypographyLeftTableCell value={ability.action.difficulty ? "Skill Check" : "Opposed Skill Check"} />
                                        <TypographyCenterTableCell value={ability.action.rangeBand} />
                                        {ability.action.difficulty && <GenesysDifficultyCenterTableCell difficulty={ability.action.difficulty} />}
                                        {ability.action.opposedSkill && <TypographyCenterTableCell value={ability.action.opposedSkill.name} />}
                                        <GenesysDicePoolCenterTableCellButton actor={npc} skill={getActorSkill(npc, ability.action.skill)} difficulty={ability.action.difficulty}/>
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
