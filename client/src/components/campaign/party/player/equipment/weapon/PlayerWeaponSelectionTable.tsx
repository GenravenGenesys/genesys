import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {Weapon, WeaponSlot} from "../../../../../../models/equipment/Weapon";
import EquipmentService from "../../../../../../services/equipment/EquipmentService";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import Player from "../../../../../../models/actor/player/Player";
import ActorService from "../../../../../../services/actor/ActorService";
import WeaponBackdrop from "../../../../actor/equipment/WeaponBackdrop";
import PlayerService from "../../../../../../services/actor/PlayerService";

interface RowProps {
    weapon: Weapon
    player: Player
}

function WeaponNameRow(props: RowProps): JSX.Element {
    const {weapon, player} = props;
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    const addWeapon = async () => {
        player.weapons.push({slot: WeaponSlot.None, ...weapon})
        await PlayerService.updatePlayer(player)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenWeaponBackDrop(true)}>{weapon.name}</Button>
                {openWeaponBackDrop && <WeaponBackdrop open={openWeaponBackDrop} onClose={(): void => setOpenWeaponBackDrop(false)} weapon={weapon!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addWeapon}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    player: Player
}

export default function PlayerWeaponSelectionTable(props: TableProps) {
    const {player} = props
    const [weapons, setWeapons] = useState<Weapon[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const weaponList = await EquipmentService.getWeapons()
            if (!weaponList) { return }
            setWeapons(weaponList)
        })()
    }, [setWeapons])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {weapons.map((weapon: Weapon) => (
                        <WeaponNameRow weapon={weapon} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}