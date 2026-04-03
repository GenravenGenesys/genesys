import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {Grid} from "@mui/material";
import {type Archetype, CharacteristicType} from "../../../../../api/model";
import {CharacteristicBadge} from "../CharacteristicBadge.tsx";

interface Props {
    archetype: Archetype;
}

export default function ArchetypeCharacteristic(props: Props) {
    const {archetype} = props;

    return (
        <GridContainer spacing={2} centered>
            <Grid sx={{xs: 6, md: 4}}>
                <CharacteristicBadge value={archetype.brawn} label={CharacteristicType.Brawn}/>
            </Grid>
            <Grid sx={{xs: 6, md: 4}}>
                <CharacteristicBadge value={archetype.agility}
                                     label={CharacteristicType.Agility}/>
            </Grid>
            <Grid sx={{xs: 6, md: 4}}>
                <CharacteristicBadge value={archetype.intellect}
                                     label={CharacteristicType.Intellect}/>
            </Grid>
            <Grid sx={{xs: 6, md: 4}}>
                <CharacteristicBadge value={archetype.cunning}
                                     label={CharacteristicType.Cunning}/>
            </Grid>
            <Grid sx={{xs: 6, md: 4}}>
                <CharacteristicBadge value={archetype.willpower}
                                     label={CharacteristicType.Willpower}/>
            </Grid>
            <Grid sx={{xs: 6, md: 4}}>
                <CharacteristicBadge value={archetype.presence}
                                     label={CharacteristicType.Presence}/>
            </Grid>
        </GridContainer>
    );
}