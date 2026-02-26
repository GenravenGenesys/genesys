import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PlayerWeaponSelectionTable from "./PlayerWeaponSelectionTable";
import type {Player} from "../../../../../../api/model";

interface Props {
    player: Player
    open: boolean
    onClose: () => void
}

export default function PlayerWeaponSelectionDialog(props: Props) {
    const {player, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Weapon'}/>
            <DialogContent>
                <PlayerWeaponSelectionTable player={player}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}