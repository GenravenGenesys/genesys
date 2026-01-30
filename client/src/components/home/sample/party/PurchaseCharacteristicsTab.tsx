import {type PlayerCharacter, SkillCharacteristic} from "../../../../api/model";
import {useState} from "react";
import {Alert, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import {CharacteristicBadge} from "./CharacteristicBadge.tsx";

interface Props {
    player: PlayerCharacter;
    onCharacteristicSpend: (experience: number) => void;
}

export default function PurchaseCharacteristicsTab(props: Props) {
    const {player, onCharacteristicSpend} = props;
    const [characteristics, setCharacteristics] = useState({
        [SkillCharacteristic.Brawn]: player.characteristics.brawn.base,
        [SkillCharacteristic.Agility]: player.characteristics.agility.base,
        [SkillCharacteristic.Intellect]: player.characteristics.intellect.base,
        [SkillCharacteristic.Cunning]: player.characteristics.cunning.base,
        [SkillCharacteristic.Willpower]: player.characteristics.willpower.base,
        [SkillCharacteristic.Presence]: player.characteristics.presence.base,
    } as Record<SkillCharacteristic, number>);

    const getMinimumFromArchetype = (label: SkillCharacteristic): number => {
        switch (label) {
            case SkillCharacteristic.Brawn:
                return player.archetype.brawn;
            case SkillCharacteristic.Agility:
                return player.archetype.agility;
            case SkillCharacteristic.Intellect:
                return player.archetype.intellect;
            case SkillCharacteristic.Cunning:
                return player.archetype.cunning;
            case SkillCharacteristic.Willpower:
                return player.archetype.willpower;
            case SkillCharacteristic.Presence:
                return player.archetype.presence;
            default:
                return 1;
        }
    }

    const onCharacteristicChange = (label: SkillCharacteristic, newValue: number) => {
        const experienceCost = newValue * 10;
        onCharacteristicSpend(experienceCost);
        setCharacteristics((prev) => ({
            ...prev,
            [label]: newValue
        }));
    };

    return (
        <Card>
            <CenteredCardHeader title={'Increase Characteristics'}
                                subheader={<Alert severity="info" sx={{mb: 3}}>
                                    <Typography variant="body2">
                                        Players can spend experience points to increase their character's
                                        characteristics during Character Creation. Each increase costs (new value *
                                        10) experience points and raises the chosen characteristic by 1 point, up to
                                        a maximum of 5.
                                    </Typography>
                                </Alert>}/>
            <CardContent>
                <Stack spacing={3}>
                    <GridContainer spacing={2} centered>
                        {Object.values(SkillCharacteristic).map((characteristic) => (
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={characteristics[characteristic]}
                                                     label={characteristic}
                                                     min={getMinimumFromArchetype(characteristic)}
                                                     onChange={(value) => onCharacteristicChange(characteristic, value)}
                                                     experience={player.experience.initial}
                                                     />
                            </Grid>
                        ))}
                    </GridContainer>
                </Stack>
            </CardContent>
        </Card>
    );
}