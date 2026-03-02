import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {WeaponSlotTableCell} from "../../../../common/table/EquipmentSlotTableCell";
import {type ActorWeapon, ActorWeaponSlot} from "../../../../../api/model";

interface Props {
    weapons: ActorWeapon[]
    open: boolean;
    updateWeapons: (weapons: ActorWeapon[]) => void
    onClose: () => void;
}

export default function WeaponEquipDialog(props: Props) {
    const {weapons, open, updateWeapons, onClose} = props;
    const headers = ['Name', 'Weapon Slot'];

    const onChange = async (value: ActorWeapon) => {
        switch (value.slot) {
            case ActorWeaponSlot.Main_Hand:
                weapons.forEach((weapon) => {
                    if (weapon.name === value.name) {
                        weapon.slot = value.slot;
                    } else {
                        if (weapon.slot !== ActorWeaponSlot.Off_Hand) {
                            weapon.slot = ActorWeaponSlot.None;
                        }
                    }
                })
                break;
            case ActorWeaponSlot.Off_Hand:
                weapons.forEach((weapon) => {
                    if (weapon.name === value.name) {
                        weapon.slot = value.slot;
                    } else {
                        if (weapon.slot !== ActorWeaponSlot.Main_Hand) {
                            weapon.slot = ActorWeaponSlot.None;
                        }
                    }
                })
                break;
            case ActorWeaponSlot.Both_Hands:
                weapons.forEach((weapon) => {
                    weapon.slot = weapon.name === value.name ? value.slot : ActorWeaponSlot.None;
                })
                break;
            default:
                weapons.forEach((armor) => {
                    if (armor.name === value.name) {
                        armor.slot = value.slot
                    }
                })
                break;
        }
        updateWeapons(weapons);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {weapons.map((weapon: ActorWeapon) => (
                                <TableRow key={weapon.name}>
                                    <TypographyLeftTableCell value={weapon.name}/>
                                    <WeaponSlotTableCell weapon={weapon} onChange={onChange}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    );
}