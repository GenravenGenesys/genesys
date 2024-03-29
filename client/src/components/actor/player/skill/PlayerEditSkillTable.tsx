import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Box, Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {SkillType} from "../../../../models/actor/Skill";
import PlayerEditSkillDialog from "./PlayerEditSkillDialog";
import {GenesysDicePoolCenterTableCell, TypographyLeftTableCell} from "../../../common/table/TypographyTableCell";
import {renderSingleRowTableHeader, renderSkillName} from "../../../common/table/TableRenders";

interface RowProps {
    skill: PlayerSkill
    player: Player
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, player} = props
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false)

    return (
        <Fragment>
            <TableRow>
                {renderSkillName(skill)}
                <TypographyLeftTableCell value={String(skill?.ranks!!)}/>
                <GenesysDicePoolCenterTableCell actor={player} skill={skill}/>
                <TableCell>
                    <Button onClick={(): void => setOpenEditSkillDialog(true)}>Edit</Button>
                </TableCell>
            </TableRow>
            {openEditSkillDialog &&
                <PlayerEditSkillDialog open={openEditSkillDialog} onClose={(): void => setOpenEditSkillDialog(false)}
                                       playerSkill={skill} player={player}/>}
        </Fragment>
    )
}

interface GroupProps {
    player: Player
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type} = props
    const [open, setOpen] = useState(false)
    const headers = ['Name', 'Ranks', 'Dice Pool', 'View']

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TableCell style={{textAlign: 'center'}}>{type}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table>
                                {renderSingleRowTableHeader(headers)}
                                <TableBody>
                                    {(player?.skills!! || []).filter((skill) => skill.type === type).map((skill: PlayerSkill) => (
                                        <SkillRow key={skill.name} skill={skill} player={player}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

interface TableProps {
    player: Player
}

export default function PlayerEditSkillTable(props: TableProps) {
    const {player} = props
    const headers = ['Skills']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    <SkillTypeGroup player={player!!} type={SkillType.General}/>
                    <SkillTypeGroup player={player!!} type={SkillType.Magic}/>
                    <SkillTypeGroup player={player!!} type={SkillType.Combat}/>
                    <SkillTypeGroup player={player!!} type={SkillType.Social}/>
                    <SkillTypeGroup player={player!!} type={SkillType.Knowledge}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}