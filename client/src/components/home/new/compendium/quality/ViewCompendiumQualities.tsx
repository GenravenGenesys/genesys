import type {Quality} from "../../../../../api/model";
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
import {emptyQuality} from "../../../../../models/Template.ts";
import {useCreateQuality, useUpdateQuality} from "../../../../../api/generated/qualities/qualities.ts";
import QualityDialog from "./QualityDialog.tsx";

interface Props {
    quality: Quality;
    onEdit: (talent: Quality) => void;
}

function QualityRow(props: Props) {
    const {quality, onEdit} = props;

    const onEditClick = () => {
        onEdit(quality);
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={quality.name}/>
            <TypographyCenterTableCell value={quality.cost > 0 ? "Yes" : "No"}/>
            <TypographyCenterTableCell value={quality.weapon ? "Yes" : "No"}/>
            <TypographyCenterTableCell value={quality.armor ? "Yes" : "No"}/>
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumQualities() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [quality, setQuality] = useState<Quality>(emptyQuality);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Active", "Weapons", "Armor", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createQuality = useCreateQuality();
    const updateQuality = useUpdateQuality();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredQualities = campaign.compendium.qualities.filter((quality: Quality) =>
        quality.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (newQuality: Quality) => {
        setQuality(newQuality);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedQuality: Quality) => {
        if (isNew) {
            await createQuality.mutateAsync({
                campaignId: campaign.id,
                data: updatedQuality
            });
        } else {
            await updateQuality.mutateAsync({
                campaignId: campaign.id,
                qualityId: updatedQuality.id,
                data: updatedQuality
            });
        }

        setQuality(emptyQuality);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Quality Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Quality
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search qualities by name..."
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
                        {filteredQualities.map((quality) => (
                            <QualityRow key={quality.id} quality={quality} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <QualityDialog open={Boolean(openDrawer)} quality={quality} onClose={() => setOpenDrawer(false)}
                           onSave={handleSave} isNew={isNew}/>
        </Box>
    );
}