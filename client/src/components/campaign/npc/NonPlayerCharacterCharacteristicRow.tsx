import * as React from "react";
import {useLocation} from "react-router";
import NonPlayerActor from "../../../models/actor/npc/NonPlayerActor";
import { CharacteristicType } from "../../../models/actor/Characteristic";
import GridContainer from "../../common/grid/GridContainer";
import ViewFieldCard from "../../common/ViewFieldCard";
import CharacteristicCard from "../../common/card/CharacteristicCard";

type Props = {
    npc: NonPlayerActor;
    handleCharacteristicChange: (characteristic: CharacteristicType, value: number) => void;
};

const NonPlayerCharacterCharacteristicRow: React.FC<Props> = ({npc, handleCharacteristicChange}) => {
    const isViewMode = useLocation().pathname.endsWith('/view');

    const renderField = (type: CharacteristicType, value: number) => {
        return isViewMode ? <ViewFieldCard name={type} value={String(value)}/> :
            <CharacteristicCard type={type} value={value} handleCharacteristicChange={handleCharacteristicChange}
                                disabled={isViewMode}/>;
    };

    return (
        <GridContainer spacing={2}>
            {renderField(CharacteristicType.Brawn, npc.brawn.current)}
            {renderField(CharacteristicType.Agility, npc.agility.current)}
            {renderField(CharacteristicType.Intellect, npc.intellect.current)}
            {renderField(CharacteristicType.Cunning, npc.cunning.current)}
            {renderField(CharacteristicType.Willpower, npc.willpower.current)}
            {renderField(CharacteristicType.Presence, npc.presence.current)}
        </GridContainer>
    );
};

export default NonPlayerCharacterCharacteristicRow;