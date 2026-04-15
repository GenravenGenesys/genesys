import {useParams} from "react-router-dom";
import {Autocomplete, CircularProgress, TextField, Typography} from "@mui/material";
import {useGetSkills} from "../../../api/generated/skills/skills.ts";
import type {Skill, SkillType} from "../../../api/model";

interface Props {
    skill: Skill;
    updateSkill: (skill: Skill) => void;
    filterByType?: SkillType;
}

export default function SelectSkillField(props: Props) {
    const {skill, updateSkill, filterByType} = props;
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

    const filteredSkills = filterByType
        ? skills.data.filter(skill => skill.type === filterByType)
        : skills.data;

    const handleSelect = (skill: Skill | null) => {
        if (!skill) return;
        updateSkill(skill);
    };

    return (
        <Autocomplete options={filteredSkills} getOptionLabel={(option) => option.name}
                      onChange={(_, newValue) => handleSelect(newValue)}
                      value={skill || null}
                      renderInput={(params) => (
                          <TextField {...params} label="Select a skill" fullWidth/>)}/>
    );
}