import {type Archetype, SkillCharacteristic} from "../../../../../api/model";
import {Autocomplete, Box, Card, CardContent, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import {CharacteristicBadge} from "../CharacteristicBadge.tsx";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader.tsx";
import {emptyArchetype} from "../../../../../models/Template.ts";

interface Props {
    archetype: Archetype;
    archetypes: Archetype[];
    onSave: (archetype: Archetype) => void;
}

export default function ArchetypeSelectionStep(props: Props) {
    const {archetype, archetypes, onSave} = props;
    const [selectedArchetype, setSelectedArchetype] = useState(archetype);

    const onChangeArchetype = (newArchetype: Archetype) => {
        setSelectedArchetype(newArchetype);
        onSave(newArchetype);
    };

    return (
        <Box sx={{mt: 3}}>
            <Paper sx={{p: 2, mb: 3, gap: 2, alignItems: 'center'}}>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{fontWeight: 'bold'}}>
                    SELECT Archetype
                </Typography>
                <Autocomplete
                    sx={{mb: 2}}
                    options={archetypes}
                    getOptionLabel={(option) => option.name  || ""}
                    value={selectedArchetype}
                    onChange={(_, newValue) => onChangeArchetype(newValue as Archetype)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Campaign Library..." size="small"
                                   placeholder="Select a archetype..." fullWidth/>)}
                />
            </Paper>
            {selectedArchetype !== emptyArchetype && <Card>
                <CenteredCardHeader title={selectedArchetype.name}/>
                <CardContent>
                    <Stack spacing={3}>
                        <GridContainer spacing={2} centered>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={selectedArchetype.brawn} label={SkillCharacteristic.Brawn}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={selectedArchetype.agility}
                                                     label={SkillCharacteristic.Agility}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={selectedArchetype.intellect}
                                                     label={SkillCharacteristic.Intellect}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={selectedArchetype.cunning}
                                                     label={SkillCharacteristic.Cunning}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={selectedArchetype.willpower}
                                                     label={SkillCharacteristic.Willpower}/>
                            </Grid>
                            <Grid sx={{xs: 6, md: 4}}>
                                <CharacteristicBadge value={selectedArchetype.presence}
                                                     label={SkillCharacteristic.Presence}/>
                            </Grid>
                        </GridContainer>
                        <GridContainer spacing={3} centered>
                            <Paper sx={{p: 2, textAlign: "center"}}>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {selectedArchetype.wounds}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Wound Threshold
                                </Typography>
                            </Paper>
                            <Paper sx={{p: 2, textAlign: "center"}}>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {selectedArchetype.strain}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Strain Threshold
                                </Typography>
                            </Paper>
                            <Paper sx={{p: 2, textAlign: "center"}}>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {100}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Starting XP
                                </Typography>
                            </Paper>
                        </GridContainer>
                        <GridContainer spacing={3} centered>
                            <Typography sx={{mt: 4}}>Starting Skill(s) would go here...</Typography>
                        </GridContainer>
                        <GridContainer spacing={3} centered>
                            <Typography sx={{mt: 4}}>Abilities would go here...</Typography>
                        </GridContainer>
                    </Stack>
                </CardContent>
            </Card>}
        </Box>
    );
}