import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {RootPath} from "../../../services/RootPath";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import ArchetypeDialog from "./ArchetypeDialog";
import {useFetchAllArchetypes} from "../../../hooks/useFetchAllArchetypes.ts";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton.tsx";
import type {Archetype} from "../../../api/model";

export default function CampaignArchetypes() {
    const [openArchetypeCreationDialog, setOpenArchetypeCreationDialog] = useState(false);
    const headers = ['Name', 'View'];
    const {archetypes, loading, error} = useFetchAllArchetypes();

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
            <CenteredCardHeaderWithButton title={"Campaign Archetypes"}
                                          onClick={(): void => setOpenArchetypeCreationDialog(true)}
                                          buttonText={"Create Archetype"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {archetypes.map((archetype: Archetype) => (
                                <TableRow key={archetype.name}>
                                    <TypographyCenterTableCell value={archetype.name}/>
                                    <ActionsTableCell name={archetype.id} path={RootPath.Archetype}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openArchetypeCreationDialog && <ArchetypeDialog open={openArchetypeCreationDialog}
                                                             onClose={(): void => setOpenArchetypeCreationDialog(false)}/>}
        </Card>
    )
}