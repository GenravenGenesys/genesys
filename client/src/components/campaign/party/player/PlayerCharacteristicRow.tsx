import {CharacteristicType} from "../../../../models/actor/Characteristic";
import * as React from "react";
import ViewFieldCard from "../../../common/ViewFieldCard";
import GridContainer from "../../../common/grid/GridContainer";
import Player from "../../../../models/actor/player/Player";

type Props = {
    player: Player;
};

const PlayerCharacteristicRow: React.FC<Props> = ({player}) => {
    return (
        <GridContainer spacing={2}>
            <ViewFieldCard name={CharacteristicType.Brawn} value={String(player.brawn.current)}/>
            <ViewFieldCard name={CharacteristicType.Agility} value={String(player.agility.current)}/>
            <ViewFieldCard name={CharacteristicType.Intellect} value={String(player.intellect.current)}/>
            <ViewFieldCard name={CharacteristicType.Cunning} value={String(player.cunning.current)}/>
            <ViewFieldCard name={CharacteristicType.Willpower} value={String(player.willpower.current)}/>
            <ViewFieldCard name={CharacteristicType.Presence} value={String(player.presence.current)}/>
        </GridContainer>
    );
};

export default PlayerCharacteristicRow;