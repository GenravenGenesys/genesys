import {useState} from 'react';
import {
    Box, Typography, Paper, TextField, InputAdornment,
    Table, TableBody, TableContainer,
    TableRow, Button, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import {useParams} from "react-router-dom";
import {useCampaignLive} from "../../../../../hooks/campaign/useCampaginLive.ts";
import type {Skill} from "../../../../../api/model";
import SkillDrawer from "./SkillDrawer.tsx";
import {useCreateSkill, useUpdateSkill} from "../../../../../api/generated/skills/skills.ts";
import {renderSingleRowTableHeader, renderSkillNameTableCell} from "../../../../common/table/TableRenders.tsx";
import BooleanTableCell from "../../../../common/table/BooleanTableCell.tsx";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../../common/table/common/CustomTableCell.tsx";
import {emptySkill} from "../../../../../models/Template.ts";

interface Props {
    skill: Skill;
    onEdit: (skill: Skill) => void;
}

function SkillRow(props: Props) {
    const {skill, onEdit} = props;

    const onEditClick = () => {
        onEdit(skill);
    }

    return (
        <TableRow>
            {renderSkillNameTableCell(skill)}
            <TypographyCenterTableCell value={skill.type}/>
            <BooleanTableCell bool={skill.initiative}/>
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumSkills() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [skill, setSkill] = useState<Skill>(emptySkill);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Type", "Initiative", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createSkillMutation = useCreateSkill();
    const updateSkillMutation = useUpdateSkill();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredSkills = campaign.compendium.skills.filter((skill: Skill) =>
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
            await createSkillMutation.mutateAsync({
                campaignId: campaign.id,
                data: updatedSkill
            });
        } else {
            await updateSkillMutation.mutateAsync({
                campaignId: campaign.id,
                skillId: updatedSkill.id,
                data: updatedSkill
            });
        }

        setSkill(emptySkill);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Skill Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Skill
                </Button>
            </Box>
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
            </Paper>
            <TableContainer component={Paper} sx={{borderRadius: 4}}>
                <Table aria-label="skill table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
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