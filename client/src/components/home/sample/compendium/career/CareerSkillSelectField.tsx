import {renderBasicSkillName} from "../../../../common/skill/SkillRenders.tsx";
import type {Career, Skill} from "../../../../../api/model";
import {Autocomplete, Box, CircularProgress, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetSkills} from "../../../../../api/generated/skills/skills.ts";

interface Props {
    skill: Skill;
    formData: Career
    onChange: (index: number, value: Skill) => void;
    index: number;
}

export default function CareerSkillSelectField(props: Props) {
    const {skill, formData, onChange, index} = props;
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {data: skills, isLoading} = useGetSkills(id);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!skills || skills.data.length === 0) {
        return <Typography variant="h6" color="error">Skills Not Found</Typography>;
    }

    const filteredSkills = skills.data.filter(s => !formData.skills.some(selectedSkill => selectedSkill.id === s.id) || s.id === skill.id);

    return (

        <Box sx={{mt: 3}}>
            <Typography variant="subtitle2" color="primary" gutterBottom sx={{fontWeight: 'bold'}}>
                SELECT SKILL {index + 1}
            </Typography>

            <Autocomplete
                sx={{mb: 2}}
                options={filteredSkills}
                getOptionLabel={(option) => renderBasicSkillName(option)}
                value={skill}
                onChange={(_, newValue) => onChange(index, newValue as Skill)}
                renderInput={(params) => (
                    <TextField {...params} label="Search Campaign Library..." size="small"
                               placeholder="Select a skill..." fullWidth/>)}
            />
        </Box>
    )
}