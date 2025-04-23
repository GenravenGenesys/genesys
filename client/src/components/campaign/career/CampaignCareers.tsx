import {Fragment, useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import {RootPath} from "../../../services/RootPath";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import * as React from "react";
import Career from "../../../models/actor/player/Career";
import CareerService from "../../../services/CareerService";
import CareerDialog from "./CareerDialog";
import { renderSkillNames } from "../../common/skill/SkillRenders";

interface Props {
    career: Career
    columns: number
}

function Row(props: Props) {
    const {career, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={career.name}/>
                <ActionsTableCell name={career.id} path={RootPath.Career}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, textAlign: 'center' }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {renderSkillNames(career.skills)}
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function CampaignCareers() {
    const [careers, setCareers] = useState<Career[]>([])
    const [openCareerCreationDialog, setOpenCareerCreationDialog] = useState(false)
    const headers = ['Name', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setCareers(await CareerService.getCareers())
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Careers'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenCareerCreationDialog(true)}>Create Career</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {careers.map((career: Career) => (
                                <Row key={career.name} career={career} columns={headers.length}/>
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