import { Button, Card, CardContent, TableFooter } from "@mui/material";
import { Fragment, useState } from "react";
import { useLocation } from "react-router";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import TableRow from "@mui/material/TableRow";
import Talent, { ActorTalent } from "../../../../models/Talent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import { renderSingleRowTableHeader } from "../../../common/table/TableRenders";
import CharacterTalentSelectionDialog from "./CharacterTalentSelectionDialog";

interface Props {
    talents: ActorTalent[]
    updateTalents: (talents: ActorTalent[]) => void
    refetch: () => void;
}

export default function SingleNonPlayerCharacterTalentCard(props: Props) {
    const { talents, updateTalents, refetch } = props;
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false);
    const headers = ['Name', 'Activation', 'Summary'];
    const pathname = useLocation().pathname;

    const addTalent = (talent: Talent) => {
        updateTalents([...talents, { ...talent, ranks: 1 }]);
    };

    const handleCloseDialog = () => {
        setOpenSelectTalentDialog(false);
        refetch();
    };

    const renderTableBody = () => {
        return (
            <TableBody>
                {(talents).map((talent: ActorTalent) => (
                    <TableRow>
                        <TypographyCenterTableCell value={talent.name} />
                        <TypographyCenterTableCell value={talent.activation} />
                        <GenesysDescriptionTypographyCenterTableCell value={talent.summary} />
                    </TableRow>
                ))}
            </TableBody>
        )
    };

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button color='primary' variant='contained'
                            onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                        {openSelectTalentDialog &&
                            <CharacterTalentSelectionDialog open={openSelectTalentDialog}
                                onClose={handleCloseDialog}
                                addTalent={addTalent} />}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment />
        }
    };

    return (
        <Card sx={{ "width": 1 }}>
            <CenteredCardHeader title={'Talents'} />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        {renderTableBody()}
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}