import {Button, Card, CardContent, Dialog, DialogActions, DialogContent} from "@mui/material";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import {renderPrice, renderQualities} from "../../../../../models/equipment/EquipmentHelper";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {Weapon} from "../../../../../models/equipment/Weapon";
import {useEffect, useState} from "react";
import EquipmentService from "../../../../../services/equipment/EquipmentService";

interface Props {
    open: boolean
    addWeapon: (weapon: Weapon) => void
    onClose: () => void
}

export default function WeaponSelectionDialog(props: Props) {
    const {open, addWeapon, onClose} = props;
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Encumbrance', 'Price', 'Rarity', 'Special Qualities', 'Add'];

    useEffect(() => {
        (async (): Promise<void> => {
            setWeapons(await EquipmentService.getWeapons());
        })()
    }, [setWeapons])

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogContent>
                <Card>
                    <CenteredCardHeader title={'Weapons'}/>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table>
                                {renderSingleRowTableHeader(headers)}
                                <TableBody>
                                    {weapons.map((weapon: Weapon) => (
                                        <TableRow key={weapon.name}>
                                            <TypographyCenterTableCell value={weapon.name}/>
                                            <TypographyCenterTableCell value={weapon.skill.name || ''}/>
                                            <TypographyCenterTableCell value={weapon.brawn ? `Brawn + ${weapon.damage}` : String(weapon.damage)}/>
                                            <TypographyCenterTableCell value={String(weapon.critical)}/>
                                            <TypographyCenterTableCell value={weapon.range}/>
                                            <TypographyCenterTableCell value={String(weapon.encumbrance)}/>
                                            <TypographyCenterTableCell value={renderPrice(weapon)}/>
                                            <TypographyCenterTableCell value={String(weapon.rarity)}/>
                                            <TypographyCenterTableCell value={renderQualities(weapon)}/>
                                            <TableCell style={{textAlign: "center"}}>
                                                <Button onClick={() => addWeapon(weapon)}>Add</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}