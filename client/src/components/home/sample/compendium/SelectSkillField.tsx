import type {Skill} from "../../../../api/model";
import {useGetSkills} from "../../../../api/generated/skills/skills.ts";
import {useParams} from "react-router-dom";
import {
    Autocomplete,
    Box,
    CircularProgress,
    TextField,
    Typography
} from "@mui/material";

interface Props {
    currentSkill: Skill;
    handleSkillSelect: (skill: Skill) => void;
}

export default function SelectSkillField(props: Props) {
    const {currentSkill, handleSkillSelect} = props;
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {data: skills, isLoading} = useGetSkills(id);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!skills || skills.length === 0) {
        return <Typography variant="h6" color="error">Skills Not Found</Typography>;
    }

    const handleSelect = (skill: Skill | null) => {
        if (!skill) return;
        handleSkillSelect(skill);
    };

    return (
        <Box sx={{mt: 3}}>
            <Typography variant="subtitle2" color="primary" gutterBottom sx={{fontWeight: 'bold'}}>
                SELECT SKILL
            </Typography>

            <Autocomplete options={skills} getOptionLabel={(option) => option.name}
                          onChange={(_, newValue) => handleSelect(newValue)}
                          value={currentSkill || null}
                          renderInput={(params) => (
                              <TextField {...params} label="Search Campaign Library..." size="small"
                                         placeholder="Select a skill..." fullWidth/>)} sx={{mb: 2}}/>
        </Box>
    );
}