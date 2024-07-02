import {Button, Card, CardContent, TableFooter} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {useLocation} from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import AddIcon from '@mui/icons-material/Add';
import {Fragment, useState} from "react";
import * as React from "react";
import AddArmorModifierDialog from "./AddArmorModifierDialog";
import {Armor} from "../../../../models/equipment/Armor";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import Modifier from "../../../../models/common/Modifier";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";

interface Props {
    armor: Armor
}

export default function ArmorModifierCard(props: Props) {
    const {armor} = props
    const [openDialog, setOpenDialog] = useState(false)
    const pathname = useLocation().pathname
    const headers = ['Type', 'Ranks']

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Modifier</Button>
                        {openDialog && <AddArmorModifierDialog open={openDialog}
                                                               onClose={(): void => setOpenDialog(false)}
                                                               armor={armor}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    const addRow = () => {
        setOpenDialog(true)
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {(armor.modifiers || []).map((modifier) => (
                                <ModifierRow modifier={modifier}/>
                            ))}
                        </TableBody>
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

interface RowProps {
    modifier: Modifier;
}

function ModifierRow(props: RowProps) {
    const {modifier} = props

    return (
        <TableRow key={modifier.type}>
            <TypographyCenterTableCell value={modifier.type}/>
            <TypographyCenterTableCell value={String(modifier.ranks)}/>
        </TableRow>
    )
}