import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import {Alert, Button, Card, CardContent, CardHeader, CircularProgress} from "@mui/material";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CampaignSkillSelectionDialog from "./CampaignSkillSelectionDialog";
import {useFetchCampaignSkills} from "../../../hooks/useFetchCampaignSkills.ts";
import type {Skill} from "../../../api/model";

export default function ViewCampaignSkills() {
    const [openSkillAdditionDialog, setOpenSkillAdditionDialog] = useState(false);
    const headers = ['Name', 'Characteristic', 'Type'];
    const {skills, loading, error} = useFetchCampaignSkills();

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
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Skills'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenSkillAdditionDialog(true)}>Add Skill</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
                                <TableRow key={skill.name}>
                                    <TypographyCenterTableCell value={skill.name}/>
                                    <TypographyCenterTableCell value={skill.characteristic}/>
                                    <TypographyCenterTableCell value={skill.type}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSkillAdditionDialog && <CampaignSkillSelectionDialog open={openSkillAdditionDialog}
                                                                      onClose={(): void => setOpenSkillAdditionDialog(false)}/>}
        </Card>
    );
}