import type {AdversaryTemplate, Talent} from "../../../../../api/model";
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    Paper, Table, TableBody,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../../common/table/common/CustomTableCell.tsx";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useCampaignLive} from "../../../../../hooks/campaign/useCampaginLive.ts";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders.tsx";
import TalentDialog from "../talent/TalentDialog.tsx";
import {emptyAdversary} from "../../../../../models/Template.ts";
import {useCreateAdversary, useUpdateAdversary} from "../../../../../api/generated/adversaries/adversaries.ts";
import AdversaryDialog from "./AdversaryDialog.tsx";

interface Props {
    adversary: AdversaryTemplate;
    onEdit: (talent: AdversaryTemplate) => void;
}

function AdversaryRow(props: Props) {
    const {adversary, onEdit} = props;

    const onEditClick = () => {
        onEdit(adversary);
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={adversary.name}/>
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

export default function ViewCompendiumAdversaries() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [adversary, setAdversary] = useState<AdversaryTemplate>(emptyAdversary);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Type", "Initiative", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {data: campaign, isLoading} = useCampaignLive(id);
    const createAdversary = useCreateAdversary();
    const updateAdversary = useUpdateAdversary();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredAdversaries = campaign.compendium.adversaries.filter((adversary: AdversaryTemplate) =>
        adversary.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (newAdversary: AdversaryTemplate) => {
        setAdversary(newAdversary);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedAdversary: AdversaryTemplate) => {
        if (isNew) {
            await createAdversary.mutateAsync({
                campaignId: campaign.id,
                data: updatedAdversary
            });
        } else {
            await updateAdversary.mutateAsync({
                campaignId: campaign.id,
                adversaryId: updatedAdversary.id,
                data: updatedAdversary
            });
        }

        setAdversary(emptyAdversary);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Adversary Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Adversary
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search adversaries by name..."
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
                        {filteredAdversaries.map((adversary) => (
                            <AdversaryRow key={adversary.id} adversary={adversary} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AdversaryDialog open={Boolean(openDrawer)} adversary={adversary} onClose={() => setOpenDrawer(false)}
                             onSave={handleSave} isNew={isNew}/>
        </Box>
    );
}