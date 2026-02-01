import {type Career, type Skill} from "../../../../api/model";
import {useEffect, useState} from "react";
import {Alert, Autocomplete, Box, Card, CardContent, Paper, TextField, Typography} from "@mui/material";
import {emptyCareer} from "../../../../models/Template.ts";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import {CareerSkillSelector} from "./CareerSkillSelector.tsx";

interface Props {
    career: Career;
    careers: Career[];
    onSave: (career: Career, skills: Skill[]) => void;
}

export default function CareerSelectionStep(props: Props) {
    const {career, careers, onSave} = props;
    const [selectedCareer, setSelectedCareer] = useState(career);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

    useEffect(() => {
        if (selectedSkills.length === 4) {
            onSave(selectedCareer, selectedSkills);
        }
    }, [selectedSkills, selectedCareer]);

    const onChangeCareer = (newCareer: Career) => {
        setSelectedCareer(newCareer);
    };

    const handleSkillToggle = (skill: Skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((id) => id !== skill)
                : [...prev, skill]
        );
    };

    return (
        <Box sx={{mt: 3}}>
            <Paper sx={{p: 2, mb: 3, gap: 2, alignItems: 'center'}}>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{fontWeight: 'bold'}}>
                    SELECT Career
                </Typography>
                <Autocomplete
                    sx={{mb: 2}}
                    options={careers}
                    getOptionLabel={(option) => option.name || ""}
                    value={selectedCareer}
                    onChange={(_, newValue) => onChangeCareer(newValue as Career)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Campaign Library..." size="small"
                                   placeholder="Select a career..." fullWidth/>)}
                />
            </Paper>
            {selectedCareer !== emptyCareer && <Card>
                <CenteredCardHeader title={selectedCareer.name}/>
                <CardContent>
                    <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                        Career Skill Selection
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                        sx={{mb: 4}}
                    >
                        Choose 4 skills to receive 1 free rank in.
                    </Typography>
                    <Alert severity="info" sx={{mb: 3}}>
                        <Typography variant="body2">
                            <strong>Career Skills:</strong> These skills cost less XP to train
                            (5/10/15/20/25 instead of 10/15/20/25/30)
                        </Typography>
                    </Alert>
                    <CareerSkillSelector
                        careerSkills={selectedCareer.skills}
                        selectedSkills={selectedSkills}
                        onSkillToggle={handleSkillToggle}
                    />
                    <Paper sx={{p: 2, mt: 3}}>
                        <Typography variant="caption" color="text.secondary">
                            Selected Skills:{" "}
                            {selectedSkills.map((skill) => {
                                    return `${skill.name}`;
                                })
                                .join(", ") || "None"}
                        </Typography>
                    </Paper>
                </CardContent>
            </Card>}
        </Box>
    );
}