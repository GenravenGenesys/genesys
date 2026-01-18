import {
    Box, Typography, Autocomplete, TextField, Stack,
    IconButton, Slider, Paper, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type {AdversarySkill} from "../../../../../api/model";
import {useParams} from "react-router-dom";
import {useGetSkills} from "../../../../../api/generated/skills/skills.ts";
import SelectSkillField from "../SelectSkillField.tsx";

interface Props {
    npcSkills: AdversarySkill[]
    onUpdate: (skills: AdversarySkill[]) => void;
    isMinion: boolean;
}

export default function AdversarySkillManager(props: Props) {
    const {npcSkills, onUpdate, isMinion} = props;
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

    const handleAddSkill = (skill: AdversarySkill) => {
        if (!skill || npcSkills.find(s => s.id === skill.id)) return;

        const newSkill: AdversarySkill = {
            id: skill.id,
            name: skill.name,
            characteristic: skill.characteristic,
            initiative: skill.initiative,
            type: skill.type,
            ranks: isMinion ? 0 : 1,
            group: isMinion
        };

        onUpdate([...npcSkills, newSkill]);
    };

    const handleUpdateRank = (index: number, newRank: number) => {
        const updated = npcSkills.map((skill, i) =>
            i === index ? {...skill, ranks: newRank} : skill
        );
        onUpdate(updated);
    };

    return (
        <Box sx={{mt: 2}}>
            <Typography variant="overline" color="primary" sx={{fontWeight: 'bold'}}>
                Skills
            </Typography>

            {/* 1. SEARCH & ADD */}
            <Autocomplete
                options={skills}
                getOptionLabel={(option) => option.name}
                onChange={(_, val) => {
                    if (val) handleAddSkill(val);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Search Skills..." size="small" sx={{mb: 2}}/>
                )}
            />

            {/* 2. ACTIVE SKILL LIST */}
            <Stack spacing={1}>
                {npcSkills.map((s, index) => (
                    <Paper key={s.id} variant="outlined" sx={{p: 1.5, bgcolor: 'rgba(255,255,255,0.02)'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Typography variant="body2" sx={{fontWeight: 'bold'}}>{s.name}</Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                {!isMinion && (
                                    <>
                                        <Slider
                                            value={s.ranks}
                                            min={1} max={5} step={1}
                                            marks size="small"
                                            sx={{width: 100}}
                                            onChange={(_, val) => handleUpdateRank(index, val as number)}
                                        />
                                        <Typography variant="caption" sx={{minWidth: 20}}>{s.ranks}</Typography>
                                    </>
                                )}

                                <IconButton size="small" color="error"
                                            onClick={() => onUpdate(npcSkills.filter((_, i) => i !== index))}>
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </Stack>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
}