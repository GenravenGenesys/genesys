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
    const [state, setState] = useState({
        brawn: player.characteristics.brawn.base,
        agility: player.characteristics.agility.base,
        intellect: player.characteristics.intellect.base,
        cunning: player.characteristics.cunning.base,
        willpower: player.characteristics.willpower.base,
        presence: player.characteristics.presence.base,
    });

    const onCharacteristicChange = (label: SkillCharacteristic, newValue: number) => {
        const experienceCost = newValue * 10;
        onCharacteristicSpend(experienceCost);
        setState((prev) => ({
            ...prev,
            [label.toLowerCase()]: newValue
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
                        <Grid sx={{xs: 6, md: 4}}>
                            <CharacteristicBadge value={state.brawn} label={SkillCharacteristic.Brawn}
                                                 onChange={(value) => onCharacteristicChange(SkillCharacteristic.Brawn, value)}
                                                 editable/>
                        </Grid>
                        <Grid sx={{xs: 6, md: 4}}>
                            <CharacteristicBadge value={state.agility} label={SkillCharacteristic.Agility}
                                                 onChange={(value) => onCharacteristicChange(SkillCharacteristic.Agility, value)}
                                                 editable/>
                        </Grid>
                        <Grid sx={{xs: 6, md: 4}}>
                            <CharacteristicBadge value={state.intellect} label={SkillCharacteristic.Intellect}
                                                 onChange={(value) => onCharacteristicChange(SkillCharacteristic.Intellect, value)}
                                                 editable/>
                        </Grid>
                        <Grid sx={{xs: 6, md: 4}}>
                            <CharacteristicBadge value={state.cunning} label={SkillCharacteristic.Cunning}
                                                 onChange={(value) => onCharacteristicChange(SkillCharacteristic.Cunning, value)}
                                                 editable/>
                        </Grid>
                        <Grid sx={{xs: 6, md: 4}}>
                            <CharacteristicBadge value={state.willpower} label={SkillCharacteristic.Willpower}
                                                 onChange={(value) => onCharacteristicChange(SkillCharacteristic.Willpower, value)}
                                                 editable/>
                        </Grid>
                        <Grid sx={{xs: 6, md: 4}}>
                            <CharacteristicBadge value={state.presence} label={SkillCharacteristic.Presence}
                                                 onChange={(value) => onCharacteristicChange(SkillCharacteristic.Presence, value)}
                                                 editable/>
                        </Grid>
                    </GridContainer>
                </Stack>
            </CardContent>
        </Card>
    );
}