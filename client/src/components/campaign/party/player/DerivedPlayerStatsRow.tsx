import ViewFieldCard from "../../../common/ViewFieldCard";
import React from "react";
import GridContainer from "../../../common/grid/GridContainer";
import {type Player, StatsType} from "../../../../api/model";

interface Props {
    player: Player;
}

const DerivedPlayerStatsRow: React.FC<Props> = ({player}) => {
    return (
        <GridContainer spacing={2}>
            <ViewFieldCard name={'Soak'} value={String(player.soak)}/>
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(player.wounds.threshold)}/>
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(player.strain.threshold)}/>
            <ViewFieldCard name={DefenseType.Melee} value={String(player.melee)}/>
            <ViewFieldCard name={DefenseType.Ranged} value={String(player.ranged)}/>
        </GridContainer>
    );
};

export default DerivedPlayerStatsRow;