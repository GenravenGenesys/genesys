import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import QualityDialog from "./CreateQualityDialog";
import type {Quality} from "../../api/model";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton.tsx";
import {useFetchAllQualities} from "../../hooks/useFetchAllQualities.ts";
import QualityRow from "./QualityRow.tsx";

export default function ViewAllQualities() {
    const [openQualityCreationDialog, setOpenQualityCreationDialog] = useState(false);
    const headers = ['Name', 'Activation', 'Usable On', 'View'];
    const {qualities, loading, error} = useFetchAllQualities();

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
            <CenteredCardHeaderWithButton title={'View All Qualities'}
                                          onClick={(): void => setOpenQualityCreationDialog(true)}
                                          buttonText={"Create Quality"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {qualities.map((quality: Quality) => (
                                <QualityRow quality={quality} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openQualityCreationDialog && <QualityDialog open={openQualityCreationDialog}
                                                         onClose={(): void => setOpenQualityCreationDialog(false)}/>}
        </Card>
    );
}
