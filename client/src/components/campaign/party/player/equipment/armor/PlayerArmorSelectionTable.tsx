import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {Armor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import Player from "../../../../../../models/actor/player/Player";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import ArmorBackdrop from "../../../../actor/equipment/ArmorBackdrop";
import PlayerService from "../../../../../../services/actor/PlayerService";
import ArmorService from "../../../../../../services/equipment/ArmorService";

interface RowProps {
    armor: Armor
    player: Player
}

function ArmorNameRow(props: RowProps): JSX.Element {
    const {armor, player} = props;
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    const addArmor = async () => {
        player.armors.push({slot: ArmorSlot.None, ...armor})
        await PlayerService.updatePlayer(player)
    }

    return (
        <TableRow key={armor.name}>
            <TableCell>
                <Button onClick={(): void => setOpenArmorBackDrop(true)}>{armor.name}</Button>
                {openArmorBackDrop && <ArmorBackdrop open={openArmorBackDrop} onClose={(): void => setOpenArmorBackDrop(false)} armor={armor}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addArmor}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    player: Player
}

export default function PlayerArmorSelectionTable(props: TableProps) {
    const {player} = props
    const [armors, setArmors] = useState<Armor[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const armorList = await ArmorService.getArmors()
            if (!armorList) { return }
            setArmors(armorList)
        })()
    }, [setArmors])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {armors.map((armor: Armor) => (
                        <ArmorNameRow armor={armor} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}