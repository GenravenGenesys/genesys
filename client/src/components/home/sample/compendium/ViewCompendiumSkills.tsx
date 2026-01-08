import {useState} from 'react';
import {
    Box, Typography, Paper, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, IconButton, Chip, Stack, Button, CircularProgress
} from '@mui/material';

// Standard MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import BoltIcon from '@mui/icons-material/Bolt'; // Active
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useParams} from "react-router-dom";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import type {Skill} from "../../../../api/model";
import {renderSkillName} from "../../../common/skill/SkillRenders.tsx";
import SkillDrawer from "./SkillDrawer.tsx";
import {emptySkill} from "../../../../models/Skill.ts"; // Passive

interface Props {
    skill: Skill;
    onEdit: (skill: Skill) => void;
}

// 1. Talent Row Component with Detail Collapse
function SkillRow(props: Props) {
    const {skill, onEdit} = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}, cursor: 'pointer'}} onClick={() => setOpen(!open)}>
                <TableCell width="40">
                    <IconButton size="small">
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography fontWeight="bold">{renderSkillName(skill)}</Typography>
                </TableCell>
                {/*<TableCell align="center">*/}
                {/*    <Chip label={`Tier ${skill.tier}`} size="small" variant="outlined" color="primary"/>*/}
                {/*</TableCell>*/}
                {/*<TableCell align="center">*/}
                {/*    <Chip*/}
                {/*        icon={skill.activation === 'Active' ? <BoltIcon fontSize="small"/> :*/}
                {/*            <VisibilityIcon fontSize="small"/>}*/}
                {/*        label={talent.activation}*/}
                {/*        size="small"*/}
                {/*    />*/}
                {/*</TableCell>*/}
                <TableCell align="center">
                    {skill.initiative ? <Chip label="Yes" size="small" color="primary"/> :
                        <Chip label="No" size="small" color="secondary"/>}
                </TableCell>
                <Button size="small" variant="text" onClick={() => onEdit}>Edit</Button>
            </TableRow>
        </>
    );
}

export default function ViewCompendiumSkills() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [skill, setSkill] = useState<Skill>(emptySkill);
    const [isNew, setIsNew] = useState(false);

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {data: campaign, isLoading} = useCampaignLive(id);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const skills = campaign.compendium.skills;

    const filteredSkills = skills.filter((skill: Skill) =>
        skill.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (skill: Skill) => {
        setSkill(skill);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedSkill: Skill) => {
        if (isNew) {
            // Backend Call: await fetch('/api/equipment', { method: 'POST', body: newItem });
        } else {
            // Backend Call: await fetch(`/api/equipment/${itemData.id}`, { method: 'PATCH', body: itemData });
        }

        setSkill(emptySkill);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>

            {/* Page Header */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">Skill Compendium</Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>New Skill</Button>
            </Box>

            {/* 3. Search & Filter Bar */}
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search skills by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }
                    }}
                />
                <Stack direction="row" spacing={1}>
                    <Chip label="All Tiers" onClick={() => {
                    }} color="primary"/>
                    <Chip label="Ranked Only" onClick={() => {
                    }} variant="outlined"/>
                </Stack>
            </Paper>

            {/* 4. The Talent Table */}
            <TableContainer component={Paper} sx={{borderRadius: 4}}>
                <Table aria-label="skill table">
                    <TableHead sx={{bgcolor: 'rgba(255,255,255,0.05)'}}>
                        <TableRow>
                            <TableCell width="40"/>
                            <TableCell><Typography variant="subtitle2" fontWeight="bold">Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2"
                                                                  fontWeight="bold">Tier</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2"
                                                                  fontWeight="bold">Activation</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2"
                                                                  fontWeight="bold">Type</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSkills.map((skill: Skill) => (
                            <SkillRow key={skill.id} skill={skill} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SkillDrawer open={Boolean(openDrawer)} skill={skill} onClose={() => setOpenDrawer(false)}
                         onSave={handleSave} isNew={isNew}/>
        </Box>
    );
}