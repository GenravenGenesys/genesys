import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Card, CardContent} from "@mui/material";
import {SkillType} from "../../../../../models/actor/Skill";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {renderDoubleRowTableHeader,} from "../../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import Minion, {GroupSkill} from "../../../../../models/actor/npc/Minion";
import EditableBooleanTableCell from "../../../../common/table/EditableBooleanTableCell";
import {useLocation} from "react-router-dom";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import GridContainer from "../../../../common/grid/GridContainer";
import GridItem from "../../../../common/grid/GridItem";

interface TableProps {
    minion: Minion
    onGroupSkillChange: (groupSkill: GroupSkill) => void
}

export default function MinionSkillCard(props: TableProps) {
    const {minion, onGroupSkillChange} = props;
    const headers = ['Name', 'Group'];
    let pathname = useLocation().pathname;

    const renderSkillGroupTable = (type: SkillType) => {
        return (
            <Table>
                {renderDoubleRowTableHeader(headers, type, headers.length)}
                <TableBody>
                    {(minion.skills || [])
                        .filter((skill) => skill.type === type)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((skill: GroupSkill) => (
                            <TableRow key={skill.name}>
                                <TypographyCenterTableCell value={skill.name}/>
                                <EditableBooleanTableCell bool={skill.group}
                                                          disabled={!pathname.endsWith(minion.id + '/edit')}
                                                          onChange={(value: boolean) => {
                                                              skill.group = value
                                                              onGroupSkillChange(skill)
                                                          }}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        );
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <GridContainer>
                    <GridItem width={.5}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {renderSkillGroupTable(SkillType.General)}
                                    {renderSkillGroupTable(SkillType.Magic)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GridItem>
                    <GridItem width={.5}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {renderSkillGroupTable(SkillType.Combat)}
                                    {renderSkillGroupTable(SkillType.Social)}
                                    {renderSkillGroupTable(SkillType.Knowledge)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GridItem>
                </GridContainer>
            </CardContent>
        </Card>
    )
}