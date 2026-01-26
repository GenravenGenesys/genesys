import {type PlayerCharacter, SkillCharacteristic} from "../../../../api/model";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import {Alert, Box, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import {CharacteristicBadge} from "./CharacteristicBadge.tsx";

interface Props {
    player: PlayerCharacter;
    // onChange: (data: PlayerCharacter) => void;
}

export default function SpendExperienceStep(props: Props) {
    const {player} = props;

    return (
        <Box sx={{mt: 3}}>
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
                                <CharacteristicBadge value={player.characteristics.brawn.base}
                                                     label={SkillCharacteristic.Brawn}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.agility.base}
                                                     label={SkillCharacteristic.Agility}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.intellect.base}
                                                     label={SkillCharacteristic.Intellect}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.cunning.base}
                                                     label={SkillCharacteristic.Cunning}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.willpower.base}
                                                     label={SkillCharacteristic.Willpower}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.presence.base}
                                                     label={SkillCharacteristic.Presence}/>
                            </Grid>
                        </GridContainer>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}