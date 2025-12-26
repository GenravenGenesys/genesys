import {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Alert, Button, CircularProgress} from "@mui/material";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import Player from "../../../../../../models/actor/player/Player";
import WeaponBackdrop from "../../../../actor/equipment/WeaponBackdrop";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {useFetchAllWeapons} from "../../../../../../hooks/useFetchAllWeapons.ts";
import {ActorWeaponSlot, type Weapon} from "../../../../../../api/model";

interface RowProps {
    weapon: Weapon
    player: Player
}

function WeaponNameRow(props: RowProps) {
    const {weapon, player} = props;
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    const addWeapon = async () => {
        player.weapons.push({slot: ActorWeaponSlot.None, ...weapon})
        await PlayerService.updatePlayer(player)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenWeaponBackDrop(true)}>{weapon.name}</Button>
                {openWeaponBackDrop &&
                    <WeaponBackdrop open={openWeaponBackDrop} onClose={(): void => setOpenWeaponBackDrop(false)}
                                    weapon={weapon!}/>}
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
    const {player} = props;
    const headers = ['Name', 'Add'];
    const {weapons, loading, error} = useFetchAllWeapons();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

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