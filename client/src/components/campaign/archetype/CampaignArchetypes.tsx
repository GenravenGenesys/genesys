import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
import Archetype from "../../../models/actor/player/Archetype";
import {RootPath} from "../../../services/RootPath";
import ArchetypeService from "../../../services/ArchetypeService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import ArchetypeDialog from "./ArchetypeDialog";

export default function CampaignArchetypes() {
    const [archetypes, setArchetypes] = useState<Archetype[]>([]);
    const [openArchetypeCreationDialog, setOpenArchetypeCreationDialog] = useState(false);
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setArchetypes(await ArchetypeService.getArchetypes())
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Archetypes'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenArchetypeCreationDialog(true)}>Create Archetype</Button>}>
            </CardHeader>
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