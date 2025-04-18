import Actor from "../../../../models/actor/Actor";
import {Grid} from "@mui/material";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import * as React from "react";
import {useLocation} from "react-router-dom";
import CharacteristicCard from "../../../common/card/CharacteristicCard";
import ViewFieldCard from "../../../common/ViewFieldCard";

interface Props {
    actor: Actor;
    handleCharacteristicChange?: (characteristic: CharacteristicType, value: number) => void;
}

const CharacteristicRow: React.FC<Props> = ({actor, handleCharacteristicChange}) => {
    const isViewMode = useLocation().pathname.endsWith('/view');

    const renderField = (type: CharacteristicType, value: number) => {
        return isViewMode ? <ViewFieldCard name={type} value={String(value)}/> :
            <CharacteristicCard type={type} value={value} handleCharacteristicChange={handleCharacteristicChange!}
                                disabled={isViewMode}/>;
    };

    return (
        <Grid container spacing={2}>
            {renderField(CharacteristicType.Brawn, actor.brawn.current)}
            {renderField(CharacteristicType.Agility, actor.agility.current)}
            {renderField(CharacteristicType.Intellect, actor.intellect.current)}
            {renderField(CharacteristicType.Cunning, actor.cunning.current)}
            {renderField(CharacteristicType.Willpower, actor.willpower.current)}
            {renderField(CharacteristicType.Presence, actor.presence.current)}
        </Grid>
    );
};

export default CharacteristicRow;
