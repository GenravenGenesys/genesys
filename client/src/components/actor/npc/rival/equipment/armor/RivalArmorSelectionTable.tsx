import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {Armor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import EquipmentService from "../../../../../../services/EquipmentService";
import ActorService from "../../../../../../services/ActorService";
import Rival from "../../../../../../models/actor/npc/Rival";
import ArmorBackdrop from "../../../../common/equipment/ArmorBackdrop";

interface RowProps {
    armor: Armor
    rival: Rival
}

function ArmorNameRow(props: RowProps) {
    const {armor, rival} = props;
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    const addArmor = async () => {
        rival.armors.push({slot: ArmorSlot.None, ...armor})
        await ActorService.updateRival(rival)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenArmorBackDrop(true)}>{armor?.name!!}</Button>
                {openArmorBackDrop &&
                    <ArmorBackdrop open={openArmorBackDrop} onClose={(): void => setOpenArmorBackDrop(false)}
                                   armor={armor!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addArmor}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    rival: Rival
}

export default function RivalArmorSelectionTable(props: TableProps) {
    const {rival} = props
    const [armors, setArmors] = useState<Armor[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            setArmors(await EquipmentService.getArmors())
        })()
    }, [setArmors])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {armors.map((armor: Armor) => (
                        <ArmorNameRow armor={armor} rival={rival}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}