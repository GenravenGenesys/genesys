import {type Archetype, type ArchetypeSkill, type Skill} from "../../../../../api/model";
import {Autocomplete, Box, Card, CardContent, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import GridContainer from "../../../../common/grid/GridContainer.tsx";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader.tsx";
import {emptyArchetype} from "../../../../../models/Template.ts";
import ArchetypeCharacteristic from "./ArchetypeCharacteristic.tsx";
import ArchetypeStats from "./ArchetypeStats.tsx";
import ArchetypeSkills from "./ArchetypeSkills.tsx";

interface Props {
    archetype: Archetype;
    archetypes: Archetype[];
    skills: Skill[];
    onSave: (archetype: Archetype) => void;
}

export default function ArchetypeSelectionStep(props: Props) {
    const {archetype, archetypes, skills, onSave} = props;
    const [selectedArchetype, setSelectedArchetype] = useState(archetype);

    const onChangeArchetype = (newArchetype: Archetype) => {
        setSelectedArchetype(newArchetype);
        onSave(newArchetype);
    };

    const handleSkillUpdate = (archetypeSkills: ArchetypeSkill[]) => {
        setSelectedArchetype(prev => prev ? {...prev, skills: archetypeSkills} : prev);
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
                    getOptionLabel={(option) => option.name || ""}
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
                        <ArchetypeCharacteristic archetype={selectedArchetype}/>
                        <ArchetypeStats archetype={selectedArchetype}/>
                        <ArchetypeSkills archetype={selectedArchetype} skills={skills}
                                         updateArchetypeSkills={handleSkillUpdate}/>
                        <GridContainer spacing={3} centered>
                            <Typography sx={{mt: 4}}>Abilities would go here...</Typography>
                        </GridContainer>
                    </Stack>
                </CardContent>
            </Card>}
        </Box>
    );
}