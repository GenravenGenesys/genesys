import type Player from "../../../../../../models/actor/player/Player";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import PlayerService from "../../../../../../services/actor/PlayerService";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";
import TalentDialogCard from "./TalentDialogCard";
import GridContainer from "../../../../../common/grid/GridContainer";
import GridItem from "../../../../../common/grid/GridItem";
import {TalentTier} from "../../../../../../api/model";

interface Props {
    open: boolean;
    onClose: () => void;
    currentPlayer: Player;
}

const SpendTalentDialog: React.FC<Props> = ({open, onClose, currentPlayer}) => {
    const [player, setPlayer] = useState(currentPlayer);

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const updatePlayer = async (player: Player) => {
        setPlayer(player);
    };

    const handleCancel = async () => {
        setPlayer(await PlayerService.updatePlayer(currentPlayer));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={'Spend Experience on Talent'}/>
            <DialogContent>
                <GridContainer spacing={2} columns={5}>
                    <GridItem>
                        <TalentDialogCard player={player} size={0} tier={TalentTier.First} updatePlayer={updatePlayer}/>
                    </GridItem>
                    <GridItem>
                        <TalentDialogCard player={player} size={1} tier={TalentTier.Second} updatePlayer={updatePlayer}/>
                    </GridItem>
                    <GridItem>
                        <TalentDialogCard player={player} size={2} tier={TalentTier.Third} updatePlayer={updatePlayer}/>
                    </GridItem>
                    <GridItem>
                        <TalentDialogCard player={player} size={3} tier={TalentTier.Fourth} updatePlayer={updatePlayer}/>
                    </GridItem>
                    <GridItem>
                        <TalentDialogCard player={player} size={4} tier={TalentTier.Fifth} updatePlayer={updatePlayer}/>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpendTalentDialog;