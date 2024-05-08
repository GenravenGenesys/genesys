import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import GenesysSkillDiceTypography from "../../../../common/typography/GenesysSkillDiceTypography";
import {SkillType} from "../../../../../models/actor/Skill";
import {ActorSkill, getCharacteristicRanks, setSkillName} from "../../../../../models/actor/Actor";
import {GenesysDicePoolCenterTableCell, TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";
import Rival from "../../../../../models/actor/npc/Rival";

interface GroupProps {
    rival: Rival,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {rival, type} = props
    const headers = ['Name', 'Dice Pool']

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type, 2)}
            <TableBody>
                {(rival.skills || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: ActorSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            <GenesysDicePoolCenterTableCell actor={rival} skill={actorSkill}/>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    rival: Rival
}

export default function ViewRivalSkillTable(props: TableProps) {
    const {rival} = props

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup rival={rival} type={SkillType.General}/>
                            <SkillTypeGroup rival={rival} type={SkillType.Magic}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup rival={rival} type={SkillType.Combat}/>
                            <SkillTypeGroup rival={rival} type={SkillType.Social}/>
                            <SkillTypeGroup rival={rival} type={SkillType.Knowledge}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}