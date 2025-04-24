import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Talent from '../../models/Talent';
import TalentService from '../../services/TalentService';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../common/table/actions/ActionsTableCell";

import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {Button, Card, CardContent, CardHeader} from "@mui/material";

import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {RootPath} from "../../services/RootPath";
import TalentDialog from "./CreateTalentDialog";
import BooleanTableCell from "../common/table/BooleanTableCell";

interface Props {
    talent: Talent
    columns: number
}

function Row(props: Props) {
    const {talent, columns} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={talent.name}/>
                <BooleanTableCell bool={talent.ranked}/>
                <TypographyCenterTableCell value={talent.activation}/>
                <TypographyCenterTableCell value={talent.tier}/>
                <ActionsTableCell name={talent.id} path={RootPath.Talent}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={talent.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllTalents() {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false);
    const headers = ['Name', 'Ranked', 'Activation', 'Tier', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await TalentService.getTalents());
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Talents'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenTalentCreationDialog(true)}>Create Talent</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <Row key={talent.name} talent={talent} columns={headers.length}/>
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
