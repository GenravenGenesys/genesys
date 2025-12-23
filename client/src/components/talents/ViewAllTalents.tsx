import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import TalentDialog from "./CreateTalentDialog";
import {useFetchAllTalents} from "../../hooks/useFetchAllTalents.ts";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton.tsx";
import type {Talent} from "../../api/model";
import TalentRow from "./TalentRow.tsx";

export default function ViewAllTalents() {
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false);
    const headers = ['Name', 'Ranked', 'Activation', 'Tier', 'View'];
    const {talents, loading, error} = useFetchAllTalents();

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
            <CenteredCardHeaderWithButton title={"View All Talents"}
                                          onClick={(): void => setOpenTalentCreationDialog(true)}
                                          buttonText={"Create Talent"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <TalentRow talent={talent} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog}
                                                       onClose={(): void => setOpenTalentCreationDialog(false)}/>}
        </Card>
    );
}
