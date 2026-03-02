import {CharacteristicType, type PlayerCharacter} from "../../../../api/model";
import {Box, Card, CardContent, Grid, Paper, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import {CharacteristicBadge} from "./CharacteristicBadge.tsx";
import {useState} from "react";

interface Props {
    player: PlayerCharacter;
}

export default function ValidatePlayerCharacter(props: Props) {
    const {player} = props;
    const [tabValue, setTabValue] = useState(0);

    return (
        <Box sx={{mt: 3}}>
            <Card>
                <CenteredCardHeader title={player.name}/>
                <CardContent>
                    <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                        <Tab label="Basic Info"/>
                        <Tab label="Characteristics"/>
                        <Tab label="Skills"/>
                        <Tab label="Talents"/>
                        <Tab label="Motivations"/>
                        <Tab label="Gear"/>
                    </Tabs>

                    {tabValue === 0 && <Stack spacing={3} sx={{mt: 3}}>
                        <Typography variant="body2" color="text.primary">
                            {"Background: " + player.background}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {"Archetype: " + player.archetype.name}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {"Career: " + player.career.name}
                        </Typography>
                    </Stack>}

                    {tabValue === 1 && <Stack spacing={3}>
                        <GridContainer spacing={2} centered>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.brawn.current} label={CharacteristicType.Brawn}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.agility.current}
                                                     label={CharacteristicType.Agility}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.intellect.current}
                                                     label={CharacteristicType.Intellect}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.cunning.current}
                                                     label={CharacteristicType.Cunning}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.willpower.current}
                                                     label={CharacteristicType.Willpower}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={player.characteristics.presence.current}
                                                     label={CharacteristicType.Presence}/>
                            </Grid>
                        </GridContainer>
                        <GridContainer spacing={3} centered>
                            <Paper sx={{p: 2, textAlign: "center"}}>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {player.derivedStats.woundThreshold.total}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Wound Threshold
                                </Typography>
                            </Paper>
                            <Paper sx={{p: 2, textAlign: "center"}}>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {player.derivedStats.strainThreshold.total}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Strain Threshold
                                </Typography>
                            </Paper>
                            <Paper sx={{p: 2, textAlign: "center"}}>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {player.experience.available}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    XP
                                </Typography>
                            </Paper>
                        </GridContainer>
                        {/*<GridContainer spacing={3} centered>*/}
                        {/*    <Typography sx={{mt: 4}}>Starting Skill(s) would go here...</Typography>*/}
                        {/*</GridContainer>*/}
                        {/*<GridContainer spacing={3} centered>*/}
                        {/*    <Typography sx={{mt: 4}}>Abilities would go here...</Typography>*/}
                        {/*</GridContainer>*/}
                    </Stack>}
                </CardContent>
            </Card>
        </Box>
    );
}