import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CareerDialog from "./CareerDialog";
import {useFetchAllCareers} from "../../../hooks/useFetchAllCareers.ts";
import CareerRow from "./CareerRow.tsx";
import type {Career} from "../../../api/model";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton.tsx";

export default function CampaignCareers() {
    const [openCareerCreationDialog, setOpenCareerCreationDialog] = useState(false);
    const headers = ['Name', 'View'];
    const {careers, loading, error} = useFetchAllCareers();

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
            <CenteredCardHeaderWithButton title={"Campaign Careers"}
                                          onClick={(): void => setOpenCareerCreationDialog(true)}
                                          buttonText={"Create Career"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {careers.map((career: Career) => (
                                <CareerRow career={career} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openCareerCreationDialog && <CareerDialog open={openCareerCreationDialog}
                                                       onClose={(): void => setOpenCareerCreationDialog(false)}/>}
        </Card>
    );
}