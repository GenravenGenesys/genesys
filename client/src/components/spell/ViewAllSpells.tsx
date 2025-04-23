import {Fragment, useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import {GenesysDifficultyCenterTableCell, TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import ActionsTableCell from "../common/table/actions/ActionsTableCell";

import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import * as React from "react";
import Spell from "../../models/spell/Spell";
import SpellService from "../../services/SpellService";
import CreateSpellDialog from "./CreateSpellDialog";
import {RootPath} from "../../services/RootPath";

interface Props {
    spell: Spell
    columns: number
}

function Row(props: Props) {
    const {spell, columns} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={spell.name}/>
                <GenesysDifficultyCenterTableCell difficulty={spell.difficulty}/>
                <ActionsTableCell name={spell.id} path={RootPath.Spell}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={spell.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllSpells() {
    const [spells, setSpells] = useState<Spell[]>([])
    const [openSpellCreationDialog, setOpenSpellCreationDialog] = useState(false)
    const headers = ['Name', 'Base Difficulty', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setSpells(await SpellService.getSpells())
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Spells'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenSpellCreationDialog(true)}>Create Spell</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {spells.map((spell: Spell) => (
                                <Row key={spell.name} spell={spell} columns={headers.length}/>
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