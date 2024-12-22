import Player from "../../../../../../models/actor/player/Player";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {ActorTalent, Tier} from "../../../../../../models/Talent";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../../../common/typography/GenesysDescriptionTypography";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
}

export default function SpendTalentDialog(props: Props) {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);
    const firstTalents = player.talents.filter(talent => talent.tier === Tier.First);
    const secondTalents = player.talents.filter(talent => talent.tier === Tier.Second);
    const thirdTalents = player.talents.filter(talent => talent.tier === Tier.Third);
    const fourthTalents = player.talents.filter(talent => talent.tier === Tier.Fourth);
    const fifthTalents = player.talents.filter(talent => talent.tier === Tier.Fifth);


    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleCancel = async () => {
        setPlayer(await PlayerService.updatePlayer(currentPlayer));
        onClose();
    };

    const renderTalentPaper = (talents: ActorTalent[]) => {
        return (
            <Grid container direction="column" spacing={2}>
                {talents.map((talent) => (
                    <Grid item key={talent.id}>
                        <Card>
                            <CenteredCardHeader title={talent.name}/>
                            <CardContent>
                                <GenesysDescriptionTypography text={talent.summary}/>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>);
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle style={{textAlign: "center"}}>Spend Experience on Talent</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={1}>
                        {renderTalentPaper(firstTalents)}
                    </Grid>
                    <Grid item xs={1}>
                        {renderTalentPaper(secondTalents)}
                    </Grid>
                    <Grid item xs={1}>
                        {renderTalentPaper(thirdTalents)}
                    </Grid>
                    <Grid item xs={1}>
                        {renderTalentPaper(fourthTalents)}
                    </Grid>
                    <Grid item xs={1}>
                        {renderTalentPaper(fifthTalents)}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}