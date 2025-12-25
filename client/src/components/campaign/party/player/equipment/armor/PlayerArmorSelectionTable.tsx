import {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Alert, Button, CircularProgress} from "@mui/material";
import Player from "../../../../../../models/actor/player/Player";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import ArmorBackdrop from "../../../../actor/equipment/ArmorBackdrop";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {ActorArmorSlot, type Armor} from "../../../../../../api/model";
import {useFetchAllArmor} from "../../../../../../hooks/useFetchAllArmor.ts";

interface RowProps {
    armor: Armor
    player: Player
}

function ArmorNameRow(props: RowProps) {
    const {armor, player} = props;
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    const addArmor = async () => {
        player.armors.push({slot: ActorArmorSlot.None, ...armor})
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
    player: Player;
}

export default function PlayerArmorSelectionTable(props: TableProps) {
    const {player} = props;
    const headers = ['Name', 'Add'];
    const {armors, loading, error} = useFetchAllArmor();

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
                    {armors.map((armor: Armor) => (
                        <ArmorNameRow armor={armor} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}