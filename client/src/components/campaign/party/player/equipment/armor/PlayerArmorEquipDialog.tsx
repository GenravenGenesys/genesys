import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {TypographyLeftTableCell} from "../../../../../common/table/TypographyTableCell";
import Player from "../../../../../../models/actor/player/Player";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {ArmorSlotTableCell} from "../../../../../common/table/EquipmentSlotTableCell.tsx";
import {type ActorArmor, ActorArmorSlot} from "../../../../../../api/model";

interface Props {
    open: boolean;
    onClose: () => void;
    player: Player
}

export default function PlayerArmorEquipDialog(props: Props) {
    const {open, onClose, player} = props;
    const headers = ['Name', 'Armor Slot']

    const onChange = async (value: ActorArmor) => {
        if (value.slot === ActorArmorSlot.None) {
            player.armors.forEach((armor) => {
                if (armor.name === value.name) {
                    armor.slot = value.slot
                }
            })
        } else {
            player.armors.forEach((armor) => {
                if (armor.name === value.name) {
                    armor.slot = value.slot
                } else {
                    armor.slot = ActorArmorSlot.None
                }
            })
        }
        await PlayerService.updatePlayer(player)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {player.armors.map((armor: ActorArmor) => (
                                <ArmorRow armor={armor} onChange={onChange}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}

interface RowProps {
    armor: ActorArmor
    onChange: (armor: ActorArmor) => void
}

function ArmorRow(props: RowProps) {
    const {armor, onChange} = props

    return (
        <TableRow key={armor.name}>
            <TypographyLeftTableCell value={armor.name}/>
            <ArmorSlotTableCell armor={armor} onChange={onChange}/>
        </TableRow>
    )
}