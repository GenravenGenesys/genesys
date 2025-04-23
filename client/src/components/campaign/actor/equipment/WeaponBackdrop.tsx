import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Weapon} from "../../../../models/equipment/Weapon";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {Card, CardContent} from "@mui/material";
import ViewFieldCard from "../../../common/ViewFieldCard";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderDamage, renderPrice, renderQualities} from "../../../../models/equipment/EquipmentHelper";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    weapon: Weapon;
    open: boolean;
    onClose: () => void;
}

const WeaponBackdrop: React.FC<Props> = ({weapon, open, onClose})=> {
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities'];

    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={weapon.name}/>
                <CardContent>
                    <GridContainer centered>
                        <GridContainer>
                            <ViewFieldCard name={'Description'} value={weapon.description}/>
                        </GridContainer>
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
                    </GridContainer>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default WeaponBackdrop;