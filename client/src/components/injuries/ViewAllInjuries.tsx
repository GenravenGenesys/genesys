import {Fragment, useState} from "react";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {GenesysDifficultyCenterTableCell, TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import ActionsTableCell from "../common/table/actions/ActionsTableCell";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import CreateInjuryDialog from "./CreateInjuryDialog";
import {RootPath} from "../../services/RootPath";
import type {CriticalInjury} from "../../api/model";
import {useFetchAllInjuries} from "../../hooks/injuries/useFetchAllInjuries.ts";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton.tsx";

interface Props {
    injury: CriticalInjury
    columns: number
}

function Row(props: Props) {
    const {injury, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={injury.name}/>
                <TypographyCenterTableCell value={String(injury.min) + '-' + String(injury.max)}/>
                <GenesysDifficultyCenterTableCell difficulty={injury.severity}/>
                <ActionsTableCell name={injury.id} path={RootPath.Injury}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={injury.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllInjuries() {
    const [openInjuryCreationDialog, setOpenInjuryCreationDialog] = useState(false);
    const headers = ['Name', 'Min-Max', 'Severity', 'View'];
    const {injuries, loading, error} = useFetchAllInjuries();

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
            <CenteredCardHeaderWithButton title={'View All Critical Injuries'}
                                          onClick={(): void => setOpenInjuryCreationDialog(true)}
                                          buttonText={"Create Critical Injury"}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {injuries.map((injury: CriticalInjury) => (
                                <Row key={injury.name} injury={injury} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openInjuryCreationDialog && <CreateInjuryDialog open={openInjuryCreationDialog}
                                                             onClose={(): void => setOpenInjuryCreationDialog(false)}/>}
        </Card>
    );
}