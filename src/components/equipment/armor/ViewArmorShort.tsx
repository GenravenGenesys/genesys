import {Card, CardContent, Divider, Grid} from '@mui/material';
import * as React from 'react';
import {Armor} from "../../../models/equipment/Armor";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {renderPrice, renderSoak} from "../../../models/equipment/EquipmentHelper";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";

interface Props {
    armor: Armor
}

export default function ArmorViewShort(props: Props) {
    const {armor} = props
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity']

    return (
        <Card>
            <CenteredCardHeader title={armor.name}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={armor.description}/>
                    </Grid>
                    <Divider/>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                <TableRow>
                                    <TypographyCenterTableCell value={armor.name}/>
                                    <TypographyCenterTableCell value={String(armor.defense)}/>
                                    <TypographyCenterTableCell value={renderSoak(armor)}/>
                                    <TypographyCenterTableCell value={String(armor.encumbrance)}/>
                                    <TypographyCenterTableCell value={renderPrice(armor)}/>
                                    <TypographyCenterTableCell value={String(armor.rarity)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    )
}
