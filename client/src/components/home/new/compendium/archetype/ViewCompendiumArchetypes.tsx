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
import type {Archetype} from "../../../../../api/model";
import {useCreateArchetype, useUpdateArchetype} from "../../../../../api/generated/archetypes/archetypes.ts";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders.tsx";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../../common/table/common/CustomTableCell.tsx";
import {emptyArchetype} from "../../../../../models/Template.ts";
import ArchetypeDialog from "./ArchetypeDialog.tsx";

interface Props {
    archetype: Archetype;
    onEdit: (archetype: Archetype) => void;
}

function ArchetypeRow(props: Props) {
    const {archetype, onEdit} = props;

    const onEditClick = () => {
        onEdit(archetype);
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={archetype.name}/>
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumArchetypes() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [archetype, setArchetype] = useState<Archetype>(emptyArchetype);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createArchetypeMutation = useCreateArchetype();
    const updateArchetypeMutation = useUpdateArchetype();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredArchetypes = campaign.compendium.archetypes.filter((archetype: Archetype) =>
        archetype.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (archetype: Archetype) => {
        setArchetype(archetype);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedArchetype: Archetype) => {
        console.log("Saving archetype:", updatedArchetype);
        if (isNew) {
            await createArchetypeMutation.mutateAsync({
                campaignId: campaign.id,
                data: updatedArchetype
            });
        } else {
            await updateArchetypeMutation.mutateAsync({
                campaignId: campaign.id,
                archetypeId: updatedArchetype.id,
                data: updatedArchetype
            });
        }

        setArchetype(emptyArchetype);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Archetype Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Archetype
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search archetypes by name..."
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
                <Table aria-label="archetype table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
                    <TableBody>
                        {filteredArchetypes.map((archetype: Archetype) => (
                            <ArchetypeRow key={archetype.id} archetype={archetype} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ArchetypeDialog open={Boolean(openDrawer)} archetype={archetype} onClose={() => setOpenDrawer(false)}
                             onSave={handleSave} isNew={isNew}/>
        </Box>
    );
}