import Player from "../../../../../../models/actor/player/Player";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, Grid} from "@mui/material";
import PlayerService from "../../../../../../services/actor/PlayerService";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";
import TalentDialogCard from "./TalentDialogCard";
import {Tier} from "../../../../../../models/Talent";
import Typography from "@mui/material/Typography";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
}

export default function SpendTalentDialog(props: Props) {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleCancel = async () => {
        setPlayer(await PlayerService.updatePlayer(currentPlayer));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={'Spend Experience on Talent'}/>
            <DialogContent>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={1}>
                        <TalentDialogCard player={player} size={0} tier={Tier.First}/>
                    </Grid>
                    <Grid item xs={1}>
                        <TalentDialogCard player={player} size={1} tier={Tier.Second}/>
                    </Grid>
                    <Grid item xs={1}>
                        <TalentDialogCard player={player} size={2} tier={Tier.Third}/>
                    </Grid>
                    <Grid item xs={1}>
                        <TalentDialogCard player={player} size={3} tier={Tier.Fourth}/>
                    </Grid>
                    <Grid item xs={1}>
                        <TalentDialogCard player={player} size={4} tier={Tier.Fifth}/>
                    </Grid>
                    <Typography>IloveYou</Typography>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}