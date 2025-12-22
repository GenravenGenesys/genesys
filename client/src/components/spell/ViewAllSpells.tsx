import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import CreateSpellDialog from "./CreateSpellDialog";
import {useFetchAllSpells} from "../../hooks/useFetchAllSpells.ts";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton.tsx";
import SpellRow from "./SpellRow.tsx";
import type {Spell} from "../../api/model";

export default function ViewAllSpells() {
    const [openSpellCreationDialog, setOpenSpellCreationDialog] = useState(false);
    const headers = ['Name', 'Base Difficulty', 'View'];
    const {spells, loading, error} = useFetchAllSpells();

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
            <CenteredCardHeaderWithButton title={'View All Spells'}
                                          onClick={(): void => setOpenSpellCreationDialog(true)}
                                          buttonText={"Create Spell"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {spells.map((spell: Spell) => (
                                <SpellRow spell={spell} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSpellCreationDialog && <CreateSpellDialog open={openSpellCreationDialog}
                                                           onClose={(): void => setOpenSpellCreationDialog(false)}/>}
        </Card>
    );
}