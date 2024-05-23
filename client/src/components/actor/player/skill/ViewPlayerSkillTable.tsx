import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {SkillType} from "../../../../models/actor/Skill";
import {GenesysDicePoolCenterTableCell} from "../../../common/table/TypographyTableCell";
import {
    renderDoubleRowTableHeader,
    renderSkillName
} from "../../../common/table/TableRenders";

interface RowProps {
    skill: PlayerSkill
    player: Player
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, player} = props;

    return (
        <TableRow key={skill.name}>
            {renderSkillName(skill)}
            <GenesysDicePoolCenterTableCell actor={player} skill={skill}/>
        </TableRow>
    )
}

interface GroupProps {
    player: Player
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type} = props
    const headers = ['Name', 'Dice Pool']

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type, 2)}
            <TableBody>
                {(player.skills || []).filter((skill) => skill.type === type).map((skill: PlayerSkill) => (
                    <SkillRow key={skill.name} skill={skill} player={player}/>
                ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    player: Player
}

export default function ViewPlayerSkillTable(props: TableProps) {
    const {player} = props
    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup player={player} type={SkillType.General}/>
                            <SkillTypeGroup player={player} type={SkillType.Magic}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup player={player} type={SkillType.Combat}/>
                            <SkillTypeGroup player={player} type={SkillType.Social}/>
                            <SkillTypeGroup player={player} type={SkillType.Knowledge}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}