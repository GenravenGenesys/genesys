import Player, {PlayerSkill} from "../../../../../models/actor/player/Player";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {SkillType} from "../../../../../models/actor/Skill";
import * as React from "react";
import {renderDoubleRowTableHeader, renderSkillName} from "../../../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {
    GenesysDicePoolCenterTableCellButton,
    TypographyCenterTableCell
} from "../../../../common/table/TypographyTableCell";
import BooleanTableCell from "../../../../common/table/BooleanTableCell";

interface Props {
    player: Player
}

export default function PlayerSkillCard(props: Props) {
    const {player} = props;
    let headers = ['Skill', 'Career', 'Ranks', 'Dice Pool'];

    const renderSkillGroupTable = (type: SkillType) => {
        return (
            <Table>
                {renderDoubleRowTableHeader(headers, type, headers.length)}
                <TableBody>
                    {(player.skills || []).filter((skill) => skill.type === type).map((skill: PlayerSkill) => (
                        <TableRow key={skill.name}>
                            {renderSkillName(skill)}
                            <BooleanTableCell bool={skill.career}/>
                            <TypographyCenterTableCell value={String(skill.ranks)}/>
                            <GenesysDicePoolCenterTableCellButton actor={player} skill={skill}/>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <Grid container>
                    <Grid xs={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {renderSkillGroupTable(SkillType.General)}
                                    {renderSkillGroupTable(SkillType.Magic)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {renderSkillGroupTable(SkillType.Combat)}
                                    {renderSkillGroupTable(SkillType.Social)}
                                    {renderSkillGroupTable(SkillType.Knowledge)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}