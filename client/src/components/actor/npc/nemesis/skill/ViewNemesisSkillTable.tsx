import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";
import {SkillType} from "../../../../../models/actor/Skill";
import {ActorSkill, setSkillName} from "../../../../../models/actor/Actor";
import {GenesysDicePoolCenterTableCell, TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";

interface GroupProps {
    nemesis: Nemesis,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {nemesis, type} = props
    const headers = ['Name', 'Dice Pool']

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type, 2)}
            <TableBody>
                {(nemesis.skills || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: ActorSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            <GenesysDicePoolCenterTableCell actor={nemesis} skill={actorSkill}/>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    nemesis: Nemesis
}

export default function ViewNemesisSkillTable(props: TableProps) {
    const {nemesis} = props

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.General}/>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Magic}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Combat}/>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Social}/>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Knowledge}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}