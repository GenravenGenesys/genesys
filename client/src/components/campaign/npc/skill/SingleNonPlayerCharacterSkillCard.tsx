import {Card, CardContent, Grid} from "@mui/material";
import {useLocation} from "react-router-dom";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {SkillType} from "../../../../models/actor/Skill";
import * as React from "react";
import {renderDoubleRowTableHeader, renderSkillName} from "../../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {GenesysDicePoolCenterTableCellButton} from "../../../common/table/TypographyTableCell";
import {ActorSkill} from "../../../../models/actor/Actor";
import SkillRanksTextFieldTableCell from "../../../common/table/SkillRanksTextFieldTableCell";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";

interface Props {
    actor: SingleNonPlayerCharacter
    onSkillChange?: (skill: ActorSkill) => void
}

export default function SingleNonPlayerCharacterSkillCard(props: Props) {
    const {actor, onSkillChange} = props;
    let headers = onSkillChange ? ['Skill', 'Ranks', 'Dice Pool'] : ['Skill', 'Dice Pool'];
    const pathname = useLocation().pathname;

    const renderSkillGroupTable = (type: SkillType) => {
        return (
            <Table>
                {renderDoubleRowTableHeader(headers, type, headers.length)}
                <TableBody>
                    {(actor.skills || [])
                        .filter((skill) => skill.type === type)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((skill: ActorSkill) => (
                            <TableRow key={skill.name}>
                                {renderSkillName(skill)}
                                {onSkillChange && <SkillRanksTextFieldTableCell onChange={onSkillChange}
                                                                                disabled={!pathname.endsWith(actor.id + '/edit')}
                                                                                skill={skill}/>}
                                <GenesysDicePoolCenterTableCellButton actor={actor} skill={skill}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        );
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