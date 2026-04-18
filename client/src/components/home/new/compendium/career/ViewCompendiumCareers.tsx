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
import type {Career} from "../../../../../api/model";
import CareerDrawer from "./CareerDrawer.tsx";
import {useCreateCareer, useUpdateCareer} from "../../../../../api/generated/careers/careers.ts";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders.tsx";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../../common/table/common/CustomTableCell.tsx";
import {emptyCareer} from "../../../../../models/Template.ts";

interface Props {
    career: Career;
    onEdit: (career: Career) => void;
}

function CareerRow(props: Props) {
    const {career, onEdit} = props;

    const onEditClick = () => {
        onEdit(career);
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={career.name} />
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumCareers() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [career, setCareer] = useState<Career>(emptyCareer);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createCareerMutation = useCreateCareer();
    const updateCareerMutation = useUpdateCareer();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredCareers = campaign.compendium.careers.filter((career: Career) =>
        career.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setCareer(emptyCareer);
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (career: Career) => {
        setCareer(career);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedCareer: Career) => {
        if (isNew) {
            await createCareerMutation.mutateAsync({
                campaignId: campaign.id,
                data: updatedCareer
            });
        } else {
            await updateCareerMutation.mutateAsync({
                campaignId: campaign.id,
                careerId: updatedCareer.id,
                data: updatedCareer
            });
        }

        setCareer(emptyCareer);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Career Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Career
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search careers by name..."
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
                <Table aria-label="career table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
                    <TableBody>
                        {filteredCareers.map((career: Career) => (
                            <CareerRow key={career.id} career={career} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CareerDrawer open={Boolean(openDrawer)} career={career} onClose={() => setOpenDrawer(false)}
                             onSave={handleSave} isNew={isNew}/>
        </Box>
    );
}