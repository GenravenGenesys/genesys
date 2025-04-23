import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Armor} from "../../../../models/equipment/Armor";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {Card, CardContent, Divider, Grid} from "@mui/material";
import ViewFieldCard from "../../../common/ViewFieldCard";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderPrice, renderSoak} from "../../../../models/equipment/EquipmentHelper";

interface Props {
    armor: Armor
    open: boolean
    onClose: () => void
}

export default function ArmorBackdrop(props: Props) {
    const {armor, open, onClose} = props;
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity'];

    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={armor?.name!!}/>
                <CardContent>
                    <Grid container sx={{
                        justifyContent: 'center'
                    }}>
                        <Grid container spacing={10}>
                            <ViewFieldCard name={'Description'} value={armor?.description!!}/>
                        </Grid>
                        <Divider/>
                        <TableContainer component={Paper}>
                            <Table>
                                {renderSingleRowTableHeader(headers)}
                                <TableBody>
                                    <TableRow>
                                        <TypographyCenterTableCell value={armor?.name!!}/>
                                        <TypographyCenterTableCell value={String(armor?.defense!!)}/>
                                        <TypographyCenterTableCell value={renderSoak(armor)}/>
                                        <TypographyCenterTableCell value={String(armor?.encumbrance!!)}/>
                                        <TypographyCenterTableCell value={renderPrice(armor)}/>
                                        <TypographyCenterTableCell value={String(armor?.rarity!!)}/>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </CardContent>
            </Card>
        </Backdrop>
    );
}
