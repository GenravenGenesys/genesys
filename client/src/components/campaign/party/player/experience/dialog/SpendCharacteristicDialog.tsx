import {Button, Dialog, DialogActions, DialogContent, IconButton} from "@mui/material";
import type {Characteristic} from "../../../../../../models/actor/Characteristic";
import Typography from "@mui/material/Typography";
import {Add} from "@mui/icons-material";
import {useEffect, useState} from "react";
import type Player from "../../../../../../models/actor/player/Player";
import PlayerService from "../../../../../../services/actor/PlayerService";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";
import GridContainer from "../../../../../common/grid/GridContainer";
import GridItem from "../../../../../common/grid/GridItem";

interface Props {
    open: boolean;
    onClose: () => void;
    currentPlayer: Player;
}

const SpendCharacteristicDialog: React.FC<Props> = (props: Props)=> {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleIncreaseLevel = async (characteristic: Characteristic) => {
        const updatedCharacteristic = {...characteristic, current: characteristic.current + 1} as Characteristic;
        setPlayer(await PlayerService.purchaseCharacteristicUpgrade(player.id, updatedCharacteristic));
    };

    const characteristics: Characteristic[] = [
        {type: player.brawn.type, current: player.brawn.current},
        {type: player.agility.type, current: player.agility.current},
        {type: player.intellect.type, current: player.intellect.current},
        {type: player.cunning.type, current: player.cunning.current},
        {type: player.willpower.type, current: player.willpower.current},
        {type: player.presence.type, current: player.presence.current},
    ];

    const handleCancel = async () => {
        await PlayerService.updatePlayer(currentPlayer);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Spend Experience on Characteristic'}/>
            <DialogContent>
                <GridContainer>
                    {characteristics.map((characteristic, index) => (
                        <GridItem width={1} key={index}>
                            <Typography variant="h6">{characteristic.type} (Value {characteristic.current})</Typography>
                            <IconButton
                                onClick={() => handleIncreaseLevel(characteristic)}
                                color="primary">
                                <Add/>
                            </IconButton>
                        </GridItem>
                    ))}
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpendCharacteristicDialog;
