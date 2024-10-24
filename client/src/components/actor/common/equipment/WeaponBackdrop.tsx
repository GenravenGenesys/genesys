import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Weapon} from "../../../../models/equipment/Weapon";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {Card, CardContent, Grid} from "@mui/material";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderDamage, renderPrice, renderQualities} from "../../../../models/equipment/EquipmentHelper";

interface Props {
    weapon: Weapon
    open: boolean
    onClose: () => void
}

export default function WeaponBackdrop(props: Props) {
    const {weapon, open, onClose} = props;
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities'];

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={weapon.name}/>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container spacing={10}>
                            <ViewFieldCard name={'Description'} value={weapon.description}/>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                {renderSingleRowTableHeader(headers)}
                                <TableBody>
                                    <TableRow>
                                        <TypographyCenterTableCell value={weapon.name}/>
                                        <TypographyCenterTableCell value={weapon?.skill?.name!!}/>
                                        <TypographyCenterTableCell value={renderDamage(weapon)}/>
                                        <TypographyCenterTableCell value={String(weapon?.critical!!)}/>
                                        <TypographyCenterTableCell value={weapon?.range!!}/>
                                        <TypographyCenterTableCell value={renderPrice(weapon)}/>
                                        <TypographyCenterTableCell value={renderQualities(weapon)}/>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </CardContent>
            </Card>
        </Backdrop>
    )
}
