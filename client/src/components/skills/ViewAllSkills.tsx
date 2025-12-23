import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import ActionsTableCell from "../common/table/actions/ActionsTableCell";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import CreateSkillDialog from "./CreateSkillDialog";
import {RootPath} from "../../services/RootPath";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton.tsx";
import {useFetchAllSkills} from "../../hooks/useFetchAllSkills.tsx";
import type {Skill} from "../../api/model";

export default function ViewAllSkills() {
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false);
    const headers = ['Name', 'Type', 'Linked Characteristic', 'View'];
    const {skills, loading, error} = useFetchAllSkills();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return (
        <Card>
            <CenteredCardHeaderWithButton title={'View All Skills'}
                                          onClick={(): void => setOpenSkillCreationDialog(true)}
                                          buttonText={'Create Skill'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
                                <TableRow key={skill.id}>
                                    <TypographyCenterTableCell value={skill.name}/>
                                    <TypographyCenterTableCell value={skill.type}/>
                                    <TypographyCenterTableCell value={skill.characteristic}/>
                                    <ActionsTableCell name={skill.id} path={RootPath.Skills}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog}
                                                           onClose={(): void => setOpenSkillCreationDialog(false)}/>}
        </Card>
    )
}