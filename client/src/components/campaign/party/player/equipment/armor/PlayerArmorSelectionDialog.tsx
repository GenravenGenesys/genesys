import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PlayerArmorSelectionTable from "./PlayerArmorSelectionTable";
import type {Player} from "../../../../../../api/model";

interface Props {
    player: Player
    open: boolean
    onClose: () => void
}

export default function PlayerArmorSelectionDialog(props: Props) {
    const {player, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Armor'}/>
            <DialogContent>
                <PlayerArmorSelectionTable player={player}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}