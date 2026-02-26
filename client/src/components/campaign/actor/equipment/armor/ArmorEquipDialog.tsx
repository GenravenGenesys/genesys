import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {ArmorSlotTableCell} from "../../../../common/table/EquipmentSlotTableCell";
import {type ActorArmor, ActorArmorSlot} from "../../../../../api/model";

interface Props {
    armors: ActorArmor[]
    open: boolean;
    updateArmors: (armors: ActorArmor[]) => void
    onClose: () => void;
}

export default function ArmorEquipDialog(props: Props) {
    const {armors, open, updateArmors, onClose} = props;
    const headers = ['Name', 'Armor Slot'];

    const onChange = async (value: ActorArmor) => {
        switch (value.slot) {
            case ActorArmorSlot.Body:
                armors.forEach((armor) => {
                    armor.slot = armor.name === value.name ? value.slot : ActorArmorSlot.None;
                })
                break;
            default:
                armors.forEach((armor) => {
                    if (armor.name === value.name) {
                        armor.slot = value.slot
                    }
                })
                break;
        }
        updateArmors(armors);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {armors.map((armor: ActorArmor) => (
                                <TableRow key={armor.name}>
                                    <TypographyLeftTableCell value={armor.name}/>
                                    <ArmorSlotTableCell armor={armor} onChange={onChange}/>
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