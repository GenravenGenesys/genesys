import {useState} from 'react';
import {
    Box, Typography, Paper, TextField, InputAdornment,
    Table, TableBody, TableContainer,
    TableRow, Button, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import {useParams} from "react-router-dom";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import {emptyTalent} from "../../../../models/Talent.ts";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders.tsx";
import BooleanTableCell from "../../../common/table/BooleanTableCell.tsx";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../common/table/common/CustomTableCell.tsx";
import {useCreateTalent, useUpdateTalent} from "../../../../api/generated/talents/talents.ts";
import type {Talent} from "../../../../api/model";
import TalentDrawer from "./TalentDrawer.tsx";

interface Props {
    talent: Talent;
    onEdit: (talent: Talent) => void;
}

function TalentRow(props: Props) {
    const {talent, onEdit} = props;

    const onEditClick = () => {
        onEdit(talent);
    }

    return (
        <TableRow>
            {/*{renderTalentNameTableCell(talent)}*/}
            {/*<TypographyCenterTableCell value={talent.type}/>*/}
            {/*<BooleanTableCell bool={talent.initiative}/>*/}
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumTalents() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [talent, setTalent] = useState<Talent>(emptyTalent);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Type", "Initiative", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {data: campaign, isLoading} = useCampaignLive(id);
    const createTalentMutation = useCreateTalent();
    const updateTalentMutation = useUpdateTalent();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredTalents = campaign.compendium.talents.filter((talent: Talent) =>
        talent.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (newTalent: Talent) => {
        setTalent(newTalent);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedTalent: Talent) => {
        if (isNew) {
            await createTalentMutation.mutateAsync({
                campaignId: campaign.id,
                data: updatedTalent
            });
        } else {
            await updateTalentMutation.mutateAsync({
                campaignId: campaign.id,
                talentId: updatedTalent.id,
                data: updatedTalent
            });
        }

        setTalent(emptyTalent);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Talent Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Talent
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search talents by name..."
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
                <Table aria-label="talent table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
                    <TableBody>
                        {filteredTalents.map((talent: Talent) => (
                            <TalentRow key={talent.id} talent={talent} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TalentDrawer open={Boolean(openDrawer)} talent={talent} onClose={() => setOpenDrawer(false)}
                         onSave={handleSave} isNew={isNew}/>
        </Box>
    );
}