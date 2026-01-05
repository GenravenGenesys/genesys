import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {TypographyLeftTableCell} from "../../../../../common/table/TypographyTableCell";
import {type ActorWeapon, ActorWeaponSlot, type Player} from "../../../../../../api/model";
import {WeaponSlotTableCell} from "../../../../../common/table/EquipmentSlotTableCell.tsx";
import {getPlayerController} from "../../../../../../api/generated/player-controller/player-controller.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    player: Player;
}

export default function PlayerWeaponEquipDialog(props: Props) {
    const {open, onClose, player} = props;
    const headers = ['Name', 'Weapon Slot'];

    const onChange = async (value: ActorWeapon) => {
        if (value.slot === ActorWeaponSlot.None) {
            player.weapons.forEach((weapon: ActorWeapon) => {
                if (weapon.name === value.name) {
                    weapon.slot = value.slot;
                }
            })
        } else {
            player.weapons.forEach((weapon: ActorWeapon) => {
                if (weapon.name === value.name) {
                    weapon.slot = value.slot;
                } else {
                    weapon.slot = ActorWeaponSlot.None;
                }
            })
        }
        await getPlayerController().updatePlayer(player.id, player);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {player.weapons.map((weapon) => (
                                <WeaponRow weapon={weapon} onChange={onChange}/>
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

interface RowProps {
    weapon: ActorWeapon;
    onChange: (armor: ActorWeapon) => void;
}

function WeaponRow(props: RowProps) {
    const {weapon, onChange} = props;

    return (
        <TableRow key={weapon.name}>
            <TypographyLeftTableCell value={weapon.name}/>
            <WeaponSlotTableCell weapon={weapon} onChange={onChange}/>
        </TableRow>
    );
}