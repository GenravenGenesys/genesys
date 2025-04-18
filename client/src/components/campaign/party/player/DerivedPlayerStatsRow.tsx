import Player from "../../../../models/actor/player/Player";
import {StatsType} from "../../../../models/actor/Stats";
import {Grid} from "@mui/material";
import ViewFieldCard from "../../../common/ViewFieldCard";
import {DefenseType} from "../../../../models/actor/Defense";
import React from "react";

interface Props {
    player: Player;
}

const DerivedPlayerStatsRow: React.FC<Props> = ({player}) => {
    return (
        <Grid container spacing={2}>
            <ViewFieldCard name={'Soak'} value={String(player.soak)}/>
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(player.wounds.threshold)}/>
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(player.strain.threshold)}/>
            <ViewFieldCard name={DefenseType.Melee} value={String(player.melee)}/>
            <ViewFieldCard name={DefenseType.Ranged} value={String(player.ranged)}/>
        </Grid>
    );
};

export default DerivedPlayerStatsRow;