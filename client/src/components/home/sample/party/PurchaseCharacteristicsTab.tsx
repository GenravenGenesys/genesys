import {type Archetype, SkillCharacteristic} from "../../../../api/model";
import {Alert, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import {CharacteristicBadge} from "./CharacteristicBadge.tsx";

interface Props {
    archetype: Archetype;
    characteristics: Record<SkillCharacteristic, number>;
    onCharacteristicSpend: (experience: number, characteristics: Record<SkillCharacteristic, number>) => void;
    experience: number;
}

export default function PurchaseCharacteristicsTab(props: Props) {
    const {archetype, characteristics, onCharacteristicSpend, experience} = props;


    const getMinimumFromArchetype = (label: SkillCharacteristic): number => {
        switch (label) {
            case SkillCharacteristic.Brawn:
                return archetype.brawn;
            case SkillCharacteristic.Agility:
                return archetype.agility;
            case SkillCharacteristic.Intellect:
                return archetype.intellect;
            case SkillCharacteristic.Cunning:
                return archetype.cunning;
            case SkillCharacteristic.Willpower:
                return archetype.willpower;
            case SkillCharacteristic.Presence:
                return archetype.presence;
            default:
                return 1;
        }
    }

    const onCharacteristicChange = (label: SkillCharacteristic, newValue: number) => {
        const experienceCost = newValue * 10;
        if (newValue < characteristics[label]) {
            onCharacteristicSpend(-experienceCost, {
                ...characteristics,
                [label]: newValue,
            });
        } else {
            onCharacteristicSpend(experienceCost, {
                ...characteristics,
                [label]: newValue,
            });
        }
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
                                                     experience={experience}
                                />
                            </Grid>
                        ))}
                    </GridContainer>
                </Stack>
            </CardContent>
        </Card>
    );
}