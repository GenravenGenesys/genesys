import * as React from "react";
import {Fragment} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Grid, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {SkillType} from "../../../../models/actor/Skill";
import {GenesysDicePoolCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderSkillName} from "../../../common/table/TableRenders";

interface RowProps {
    skill: PlayerSkill
    player: Player
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, player} = props;

    return (
        <Fragment>
            <TableRow>
                {renderSkillName(skill)}
                <GenesysDicePoolCenterTableCell actor={player} skill={skill}/>
            </TableRow>
        </Fragment>
    )
}

interface GroupProps {
    player: Player
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type} = props

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>{type}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(player.skills || []).filter((skill) => skill.type === type).map((skill: PlayerSkill) => (
                        <SkillRow key={skill.name} skill={skill} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    )
}

interface TableProps {
    player: Player
}

export default function ViewPlayerSkillTable(props: TableProps) {
    const {player} = props
    return (
        <Fragment>
            <Typography>{'Skills'}</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                <SkillTypeGroup player={player} type={SkillType.General}/>
                                <SkillTypeGroup player={player} type={SkillType.Magic}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                <SkillTypeGroup player={player} type={SkillType.Combat}/>
                                <SkillTypeGroup player={player} type={SkillType.Social}/>
                                <SkillTypeGroup player={player} type={SkillType.Knowledge}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Fragment>
    )
}