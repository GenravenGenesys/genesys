import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import PlayerView from "./PlayerView";
import type {Player} from "../../../../api/model";

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