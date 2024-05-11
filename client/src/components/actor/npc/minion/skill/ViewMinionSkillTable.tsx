import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {SkillType} from "../../../../../models/actor/Skill";
import {setSkillName} from "../../../../../models/actor/Actor";
import Minion, {GroupSkill} from "../../../../../models/actor/npc/Minion";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";

interface GroupProps {
    minion: Minion,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {minion, type} = props
    const headers = ['Name', 'Group Skill']

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type, headers.length)}
            <TableBody>
                {(minion?.skills!! || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: GroupSkill) => (
                        <TableRow key={actorSkill.name}>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            <TypographyCenterTableCell value={actorSkill.group ? 'Yes' : 'No'}/>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    minion: Minion
}

export default function ViewMinionSkillTable(props: TableProps) {
    const {minion} = props

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <SkillTypeGroup minion={minion} type={SkillType.General}/>
                    <SkillTypeGroup minion={minion} type={SkillType.Magic}/>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <SkillTypeGroup minion={minion} type={SkillType.Combat}/>
                    <SkillTypeGroup minion={minion} type={SkillType.Social}/>
                    <SkillTypeGroup minion={minion} type={SkillType.Knowledge}/>
                </TableContainer>
            </Grid>
        </Grid>
    )
}