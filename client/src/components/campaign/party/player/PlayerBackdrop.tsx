import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Player from "../../../../models/actor/player/Player";
import PlayerView from "./PlayerView";

interface Props {
    player: Player;
    open: boolean;
    onClose: () => void;
}

const PlayerBackdrop: React.FC<Props> = ({player, open, onClose})=> {
    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <PlayerView player={player}/>
        </Backdrop>
    );
};

export default PlayerBackdrop;