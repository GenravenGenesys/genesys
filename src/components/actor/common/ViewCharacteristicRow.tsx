import Actor from "../../../models/actor/Actor";
import {Grid} from "@mui/material";
import ViewCharacteristicCard from "../ViewCharacteristicCard";
import {CharacteristicType} from "../../../models/actor/Characteristics";
import * as React from "react";

interface Props {
    actor: Actor
}

export default function ViewCharacteristicRow(props: Props): JSX.Element {
    const {actor} = props

    return (
        <Grid container spacing={2}>
            <ViewCharacteristicCard characteristic={actor?.brawn!!} type={CharacteristicType.Brawn} />
            <ViewCharacteristicCard characteristic={actor?.agility!!} type={CharacteristicType.Agility}/>
            <ViewCharacteristicCard characteristic={actor?.intellect!!} type={CharacteristicType.Intellect}/>
            <ViewCharacteristicCard characteristic={actor?.cunning!!} type={CharacteristicType.Cunning}/>
            <ViewCharacteristicCard characteristic={actor?.willpower!!} type={CharacteristicType.Willpower}/>
            <ViewCharacteristicCard characteristic={actor?.presence!!} type={CharacteristicType.Presence}/>
        </Grid>
    )
}