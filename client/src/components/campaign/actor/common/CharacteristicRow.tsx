import Actor from "../../../../models/actor/Actor";
import {Grid} from "@mui/material";
import {CharacteristicType} from "../../../../models/character/Characteristic";
import * as React from "react";
import {useLocation} from "react-router-dom";
import CharacteristicCard from "../../../common/card/CharacteristicCard";
import {ViewFieldCard} from "../../../common/ViewFieldCard";

interface Props {
    actor: Actor
}

export default function CharacteristicRow(props: Props) {
    const {actor} = props

    return (
        <Grid container spacing={2}>
            <ViewFieldCard name={CharacteristicType.Brawn} value={String(actor.brawn)}/>
            <ViewFieldCard name={CharacteristicType.Agility} value={String(actor.agility)}/>
            <ViewFieldCard name={CharacteristicType.Intellect} value={String(actor.intellect)}/>
            <ViewFieldCard name={CharacteristicType.Cunning} value={String(actor.cunning)}/>
            <ViewFieldCard name={CharacteristicType.Willpower} value={String(actor.willpower)}/>
            <ViewFieldCard name={CharacteristicType.Presence} value={String(actor.presence)}/>
        </Grid>
    )
}

interface PlayerProps {
    actor: Actor
    handleCharacteristicChange: (characteristic: CharacteristicType, value: number) => void
}

export function ActorCharacteristicRow(props: PlayerProps) {
    const {actor, handleCharacteristicChange} = props;
    let pathname = useLocation().pathname;

    return (
        <Grid container spacing={2}>
            <CharacteristicCard type={CharacteristicType.Brawn} value={actor.brawn}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Agility} value={actor.agility}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Intellect} value={actor.intellect}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Cunning} value={actor.cunning}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Willpower} value={actor.willpower}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Presence} value={actor.presence}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
        </Grid>
    )
}