import Actor from "../../../../models/actor/Actor";
import { CharacteristicType } from "../../../../models/actor/Characteristic";
import * as React from "react";
import { useLocation } from "react-router";
import CharacteristicCard from "../../../common/card/CharacteristicCard";
import ViewFieldCard from "../../../common/ViewFieldCard";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    actor: Actor;
    handleCharacteristicChange?: (characteristic: CharacteristicType, value: number) => void;
}

const CharacteristicRow: React.FC<Props> = ({ actor, handleCharacteristicChange }) => {
    const isViewMode = useLocation().pathname.endsWith('/view');

    const renderField = (type: CharacteristicType, value: number | undefined) => {
        console.log(`[renderField] ${type}:`, value);

        if (value === undefined) {
            console.warn(`⚠️ Characteristic "${type}" is undefined.`);
            return null;
        }

        return isViewMode
            ? <ViewFieldCard name={type} value={String(value)} />
            : <CharacteristicCard
                type={type}
                value={value}
                handleCharacteristicChange={handleCharacteristicChange!}
                disabled={isViewMode}
            />;
    };

    return (
        <GridContainer spacing={2}>
            {actor?.brawn?.current !== undefined && renderField(CharacteristicType.Brawn, actor.brawn.current)}
            {actor?.agility?.current !== undefined && renderField(CharacteristicType.Agility, actor.agility.current)}
            {actor?.intellect?.current !== undefined && renderField(CharacteristicType.Intellect, actor.intellect.current)}
            {actor?.cunning?.current !== undefined && renderField(CharacteristicType.Cunning, actor.cunning.current)}
            {actor?.willpower?.current !== undefined && renderField(CharacteristicType.Willpower, actor.willpower.current)}
            {actor?.presence?.current !== undefined && renderField(CharacteristicType.Presence, actor.presence.current)}
        </GridContainer>
    );
};

export default CharacteristicRow;
