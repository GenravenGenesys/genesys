import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CampaignTalentSelectionDialog from "./CampaignTalentSelectionDialog";
import {useFetchCampaignTalents} from "../../../hooks/useFetchCampaignTalents.ts";
import type {Talent} from "../../../api/model";
import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton.tsx";

export default function ViewCampaignTalents() {
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false);
    const headers = ['Name', 'Ranked', 'Activation', 'Tier'];
    const {talents, loading, error} = useFetchCampaignTalents();

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
            <CenteredCardHeaderWithButton title={"Campaign Talent"}
                                          onClick={(): void => setOpenTalentCreationDialog(true)}
                                          buttonText={"Add Talent"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <TableRow key={talent.name}>
                                    <TypographyCenterTableCell value={talent.name}/>
                                    <TypographyCenterTableCell value={talent.ranked ? 'Yes' : 'No'}/>
                                    <TypographyCenterTableCell value={talent.activation}/>
                                    <TypographyCenterTableCell value={talent.tier}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openTalentCreationDialog && <CampaignTalentSelectionDialog open={openTalentCreationDialog}
                                                                        onClose={(): void => setOpenTalentCreationDialog(false)}/>}
        </Card>
    );
}