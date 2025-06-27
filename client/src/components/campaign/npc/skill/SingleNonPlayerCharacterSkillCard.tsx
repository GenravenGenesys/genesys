import { Card, CardContent } from "@mui/material";
import { useLocation } from "react-router";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { SkillType } from "../../../../models/actor/Skill";
import { renderDoubleRowTableHeader, renderSkillName } from "../../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import { GenesysDicePoolCenterTableCellButton } from "../../../common/table/TypographyTableCell";
import { ActorSkill } from "../../../../models/actor/Actor";
import SkillRanksTextFieldTableCell from "../../../common/table/SkillRanksTextFieldTableCell";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import GridContainer from "../../../common/grid/GridContainer";
import GridItem from "../../../common/grid/GridItem";

interface Props {
    actor: SingleNonPlayerCharacter
    onSkillChange?: (skill: ActorSkill) => void
}

export default function SingleNonPlayerCharacterSkillCard(props: Props) {
    const { actor, onSkillChange } = props;
    let headers = onSkillChange ? ['Skill', 'Ranks', 'Dice Pool'] : ['Skill', 'Dice Pool'];
    const pathname = useLocation().pathname;

    const renderSkillGroupTable = (type: SkillType) => (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
                {renderDoubleRowTableHeader(headers, type, headers.length)}
                <TableBody>
                    {actor.skills
                        ?.filter((skill) => skill.type === type)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((skill) => (
                            <TableRow key={skill.name}>
                                {renderSkillName(skill)}
                                {onSkillChange && (
                                    <SkillRanksTextFieldTableCell
                                        onChange={onSkillChange}
                                        disabled={!pathname.endsWith(actor.id + "/edit")}
                                        skill={skill}
                                    />
                                )}
                                <GenesysDicePoolCenterTableCellButton actor={actor} skill={skill} />
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );


    return (
        <Card sx={{ "width": 1 }}>
            <CenteredCardHeader title={'Skills'} />
            <CardContent>
                <GridContainer centered>
                    <GridItem width={0.5}>
                        {renderSkillGroupTable(SkillType.General)}
                        {renderSkillGroupTable(SkillType.Magic)}
                    </GridItem>
                    <GridItem width={.5}>
                        {renderSkillGroupTable(SkillType.Combat)}
                        {renderSkillGroupTable(SkillType.Social)}
                        {renderSkillGroupTable(SkillType.Knowledge)}
                    </GridItem>
                </GridContainer>
            </CardContent>
        </Card>
    );
}